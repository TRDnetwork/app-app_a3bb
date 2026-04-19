# Email Setup for Portfolio Pro

This portfolio site includes a contact form that sends emails via Resend. Follow these steps to enable email functionality.

## 1. Get a Resend API Key

1. Go to [resend.com](https://resend.com) and sign up for an account
2. Navigate to the API Keys section in your dashboard
3. Click "Create API Key" and copy the generated key

## 2. Set Environment Variables in Vercel

**CRITICAL SECURITY NOTE:** The Resend API key must be set as a server-side environment variable, NOT as a Vite environment variable (VITE_*). Vite environment variables are exposed to the client bundle.

In your Vercel project dashboard:

1. Go to Settings → Environment Variables
2. Add a new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (from step 1)
   - **Environment:** Production (and Preview if desired)

3. **Optional:** Set the owner's email address:
   - **Name:** `OWNER_EMAIL`
   - **Value:** Your email address where contact form submissions should be sent
   - **Environment:** Production (and Preview)

## 3. Update the Contact Form Handler

In `api/contact.ts`, update the recipient email:

```typescript
// Line ~25: Change this to your actual email
to: ['owner@example.com'], // Replace with actual owner email
```

Or use the environment variable if you set `OWNER_EMAIL`:

```typescript
to: [process.env.OWNER_EMAIL || 'owner@example.com'],
```

## 4. Verify Your Domain in Resend (Recommended)

For better deliverability and to use a custom "from" address:

1. In Resend dashboard, go to Domains
2. Click "Add Domain" and follow the verification steps
3. Update the "from" address in `api/contact.ts`:
   ```typescript
   from: 'Portfolio Pro <contact@yourdomain.com>',
   ```

## 5. Frontend Integration

The contact form in your React app should make a POST request to the API endpoint:

```javascript
// Example fetch call from your contact form component
const handleSubmit = async (formData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      // Show success message
      console.log('Email sent successfully');
    } else {
      // Show error message
      console.error('Failed to send email:', result.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};
```

**IMPORTANT:** Never import Resend or email-related code on the client side. All email sending logic stays in the `api/contact.ts` serverless function.

## 6. Testing

1. Deploy to Vercel (environment variables will be loaded)
2. Fill out the contact form on your live site
3. Check:
   - You receive the notification email as the site owner
   - The submitter receives the confirmation email
   - Check Vercel function logs for any errors

## Troubleshooting

### Emails not sending
- Verify `RESEND_API_KEY` is set correctly in Vercel environment variables
- Check Vercel function logs for errors
- Ensure the Resend API key has sending permissions

### 500 Internal Server Error
- Check the Resend API key is valid and not expired
- Verify the email templates are correctly imported in `api/contact.ts`

### 400 Bad Request
- Ensure all required fields (name, email, message) are being sent
- Verify email format is valid

## Security Notes

- The Resend API key is never exposed to the client
- Input validation happens server-side
- Rate limiting should be implemented (consider adding Upstash Redis for production)
- Email content is sanitized by Resend's API

## Next Steps for Production

1. **Add rate limiting** to prevent abuse of the contact form
2. **Implement honeypot field** to catch bots
3. **Add reCAPTCHA** for additional spam protection
4. **Set up email analytics** in Resend dashboard
5. **Configure DMARC/DKIM/SPF** for better deliverability

---

**Need help?** Refer to:
- [Resend Documentation](https://resend.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Serverless Functions on Vercel](https://vercel.com/docs/functions)