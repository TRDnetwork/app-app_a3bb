import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/App';

// Mock fetch for contact form
global.fetch = vi.fn();

describe('Portfolio App', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('Hero Section', () => {
    it('displays name and professional title prominently', () => {
      render(<App />);
      expect(screen.getByText('Alex Morgan')).toBeInTheDocument();
      expect(screen.getByText('Frontend Developer & Designer')).toBeInTheDocument();
    });

    it('has proper typography and styling', () => {
      render(<App />);
      const name = screen.getByText('Alex Morgan');
      expect(name).toHaveClass('font-display');
      expect(name).toHaveClass('text-4xl');
    });
  });

  describe('About Section', () => {
    it('renders about paragraph with readable text', () => {
      render(<App />);
      const about = screen.getByText(/I create beautiful, functional web experiences/);
      expect(about).toBeInTheDocument();
      expect(about).toHaveClass('text-dim');
      expect(about).toHaveClass('leading-relaxed');
    });
  });

  describe('Project Cards', () => {
    it('shows exactly 3 project cards', () => {
      render(<App />);
      const projectTitles = screen.getAllByRole('heading', { level: 3 });
      expect(projectTitles).toHaveLength(3);
      expect(projectTitles[0]).toHaveTextContent('EcoCommerce Platform');
      expect(projectTitles[1]).toHaveTextContent('Mindful Meditation App');
      expect(projectTitles[2]).toHaveTextContent('Urban Garden Planner');
    });

    it('each project card has description and link', () => {
      render(<App />);
      const descriptions = screen.getAllByText(/sustainable e‑commerce|meditation app|urban vegetable gardens/);
      expect(descriptions).toHaveLength(3);
      
      const links = screen.getAllByText('View Project');
      expect(links).toHaveLength(3);
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('project cards have hover animations', () => {
      render(<App />);
      const cards = screen.getAllByRole('article');
      cards.forEach(card => {
        expect(card).toHaveClass('hover:shadow-xl');
        expect(card).toHaveClass('transition-all');
      });
    });
  });

  describe('Contact Form', () => {
    it('validates required fields', async () => {
      render(<App />);
      const submitButton = screen.getByText('Send Message');
      
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Message is required')).toBeInTheDocument();
      });
    });

    it('validates email format', async () => {
      render(<App />);
      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByText('Send Message');
      
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('submits form successfully and shows toast', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Emails sent successfully' })
      });

      render(<App />);
      
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello!' } });
      
      fireEvent.click(screen.getByText('Send Message'));
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Hello!'
          })
        });
      });

      // Toast should appear
      await waitFor(() => {
        expect(screen.getByText("Message sent successfully! I'll get back to you soon.")).toBeInTheDocument();
      });
    });

    it('shows error toast on failed submission', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      render(<App />);
      
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello!' } });
      
      fireEvent.click(screen.getByText('Send Message'));
      
      await waitFor(() => {
        expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument();
      });
    });

    it('has honeypot field for spam protection', () => {
      render(<App />);
      const honeypot = screen.getByLabelText('Website');
      expect(honeypot).toHaveClass('hidden');
      expect(honeypot).toHaveAttribute('tabIndex', '-1');
      expect(honeypot).toHaveAttribute('autoComplete', 'off');
    });
  });

  describe('Mobile Navigation', () => {
    it('has mobile navigation buttons', () => {
      render(<App />);
      const navButtons = screen.getAllByRole('button', { name: /hero|about|projects|contact/i });
      expect(navButtons.length).toBeGreaterThan(0);
    });
  });
});