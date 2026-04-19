import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn()
    }
  }))
}));

// Mock environment variables
process.env.RESEND_API_KEY = 'test_key';
process.env.OWNER_EMAIL = 'owner@test.com';

// Import after mocking
const { Resend } = await import('resend');
const contactNotification = await import('../src/emails/contact-notification.js').then(m => m.default);
const contactConfirmation = await import('../src/emails/contact-confirmation.js').then(m => m.default);

// Mock handler
const mockReq = (body, method = 'POST') => ({
  method,
  body
});

const mockRes = () => {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  };
  return res;
};

describe('Contact API', () => {
  let handler;
  let resendMock;

  beforeEach(async () => {
    vi.resetModules();
    resendMock = {
      emails: {
        send: vi.fn()
      }
    };
    Resend.mockImplementation(() => resendMock);
    
    // Dynamically import handler after reset
    handler = (await import('../api/contact.ts')).default;
  });

  describe('Method validation', () => {
    it('rejects non-POST methods', async () => {
      const req = mockReq({}, 'GET');
      const res = mockRes();
      
      await handler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
    });
  });

  describe('Input validation', () => {
    it('requires all fields', async () => {
      const req = mockReq({ name: 'John' });
      const res = mockRes();
      
      await handler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields' });
    });

    it('validates email format', async () => {
      const req = mockReq({
        name: 'John',
        email: 'invalid-email',
        message: 'Hello'
      });
      const res = mockRes();
      
      await handler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email format' });
    });
  });

  describe('Email sending', () => {
    it('sends both notification and confirmation emails', async () => {
      const req = mockReq({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      });
      const res = mockRes();
      
      resendMock.emails.send
        .mockResolvedValueOnce({ id: 'notif_123' })
        .mockResolvedValueOnce({ id: 'confirm_456' });
      
      await handler(req, res);
      
      expect(resendMock.emails.send).toHaveBeenCalledTimes(2);
      
      // First call: notification to owner
      expect(resendMock.emails.send.mock.calls[0][0]).toMatchObject({
        to: ['owner@test.com'],
        subject: 'New Contact Form Submission from John Doe'
      });
      
      // Second call: confirmation to user
      expect(resendMock.emails.send.mock.calls[1][0]).toMatchObject({
        to: ['john@example.com'],
        subject: 'Thanks for reaching out!'
      });
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Message sent successfully'
      });
    });

    it('handles email sending errors', async () => {
      const req = mockReq({
        name: 'John',
        email: 'john@example.com',
        message: 'Test'
      });
      const res = mockRes();
      
      resendMock.emails.send.mockRejectedValue(new Error('Resend error'));
      
      await handler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to send message. Please try again later.'
      });
    });
  });

  describe('Email templates', () => {
    it('escapes HTML in notification template', () => {
      const html = contactNotification({
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        message: '<img src=x onerror=alert(1)>'
      });
      
      expect(html).toContain('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
      expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
      expect(html).not.toContain('<script>');
    });

    it('escapes HTML in confirmation template', () => {
      const html = contactConfirmation({
        name: '<b>John</b>'
      });
      
      expect(html).toContain('&lt;b&gt;John&lt;/b&gt;');
      expect(html).not.toContain('<b>');
    });

    it('includes proper structure in notification email', () => {
      const html = contactNotification({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello there'
      });
      
      expect(html).toContain('John Doe');
      expect(html).toContain('john@example.com');
      expect(html).toContain('Hello there');
      expect(html).toContain('Portfolio Pro');
      expect(html).toContain('mailto:john@example.com');
    });

    it('includes proper structure in confirmation email', () => {
      const html = contactConfirmation({
        name: 'Jane Smith'
      });
      
      expect(html).toContain('Jane Smith');
      expect(html).toContain('Thanks, Jane Smith!');
      expect(html).toContain('Your message has been received');
    });
  });

  describe('Environment variables', () => {
    it('uses OWNER_EMAIL from env', async () => {
      const req = mockReq({
        name: 'Test',
        email: 'test@example.com',
        message: 'Test'
      });
      const res = mockRes();
      
      resendMock.emails.send.mockResolvedValue({});
      
      await handler(req, res);
      
      expect(resendMock.emails.send.mock.calls[0][0].to).toEqual(['owner@test.com']);
    });

    it('falls back to default if OWNER_EMAIL not set', async () => {
      delete process.env.OWNER_EMAIL;
      
      // Re-import handler to pick up env change
      vi.resetModules();
      handler = (await import('../api/contact.ts')).default;
      
      const req = mockReq({
        name: 'Test',
        email: 'test@example.com',
        message: 'Test'
      });
      const res = mockRes();
      
      resendMock.emails.send.mockResolvedValue({});
      
      await handler(req, res);
      
      expect(resendMock.emails.send.mock.calls[0][0].to).toEqual(['owner@example.com']);
    });
  });
});