```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import contactNotification from '../src/emails/contact-notification';
import contactConfirmation from '../src/emails/contact-confirmation';

// SECURITY FIX: Use environment variable for API key
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields' // SECURITY FIX: Generic error message
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // SECURITY FIX: Use environment variable for recipient email
    const ownerEmail = process.env.OWNER_EMAIL || 'owner@example.com';
    
    // Send notification email to site owner
    const notificationResult = await resend.emails.send({
      from: 'Portfolio Pro <onboarding@resend.dev>',
      to: [ownerEmail],
      subject: `New Contact Form Submission from ${name}`,
      html: contactNotification({ name, email, message }),
    });

    // Send confirmation email to the submitter
    const confirmationResult = await resend.emails.send({
      from: 'Portfolio Pro <onboarding@resend.dev>',
      to: [email],
      subject: 'Thanks for reaching out!',
      html: contactConfirmation({ name }),
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully' // SECURITY FIX: Generic success message
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' // SECURITY FIX: Generic error message
    });
  }
}
```