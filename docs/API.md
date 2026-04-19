# API Documentation

## Overview

Portfolio Pro uses a single serverless function to handle contact form submissions. The function is deployed on Vercel and handles email sending via the Resend API.

## Base URL

In production: `https://your-domain.vercel.app/api`
In development: `http://localhost:3000/api`

## Endpoints

### Contact Form Submission

**POST** `/api/contact`

Sends a contact form submission as two emails:
1. Notification email to the site owner
2. Confirmation email to the person who submitted the form

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email format)",
  "message": "string (required)"
}
```

**Example cURL:**
```bash
curl -X POST https://your-domain.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "Hello, I would like to discuss a potential collaboration."
  }'
```

#### Response

**Success (200 OK):**
```json
{
  "success": true,
  "message": "Emails sent successfully",
  "notificationId": "re_123456789",
  "confirmationId": "re_987654321"
}
```

**Error Responses:**

| Status Code | Body | Description |
|-------------|------|-------------|
| 400 | `{"error": "Missing required fields: name, email, message"}` | One or more required fields are missing |
| 400 | `{"error": "Invalid email format"}` | Email doesn't match valid email pattern |
| 405 | `{"error": "Method not allowed"}` | Request method is not POST |
| 500 | `{"error": "Failed to send email. Please try again later."}` | Server error or Resend API failure |

#### Validation Rules

1. **Name**: Required, any non-empty string
2. **Email**: Required, must match regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
3. **Message**: Required, any non-empty string

#### Email Templates

The API uses two React email templates:

1. **Owner Notification** (`src/emails/contact-notification.js`)
   - Sent to the site owner (configured in `api/contact.ts`)
   - Includes all form data
   - Provides a direct reply link

2. **User Confirmation** (`src/emails/contact-confirmation.js`)
   - Sent to the person who submitted the form
   - Acknowledges receipt of their message
   - Sets expectations for response time

#### Environment Variables

The API requires the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Your Resend API key | Yes |
| `OWNER_EMAIL` | Email address to send notifications to | No (defaults to placeholder) |

#### Security Notes

1. **API Key Protection**: The Resend API key is never exposed to the client
2. **Input Validation**: All inputs are validated server-side
3. **Honeypot Field**: The frontend includes a hidden honeypot field to catch bots
4. **CORS**: The API is configured to accept requests from your domain only when deployed on Vercel

#### Rate Limiting

**Note**: Rate limiting is not implemented in the initial version but is recommended for production. Consider adding:

1. **Upstash Redis**: For IP-based rate limiting
2. **Vercel Edge Middleware**: For request throttling
3. **Resend Limits**: Resend has its own rate limits (typically 100 emails/day on free tier)

#### Testing the API

**Local Development:**
```bash
# Start the development server
npm run dev

# Test with curl
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

**Production Testing:**
```bash
# Replace with your actual domain
curl -X POST https://portfolio-pro.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Production Test","email":"test@example.com","message":"Testing production API"}'
```

#### Error Handling

The API includes comprehensive error handling:

1. **Validation Errors**: Return 400 with specific error messages
2. **Network Errors**: Return 500 with generic error message (to avoid exposing internal details)
3. **Resend Errors**: Logged to console, generic error returned to client

#### Logging

- Successful sends: Email IDs are returned in the response
- Failed sends: Errors are logged to Vercel function logs
- Validation errors: Specific error messages help with debugging

#### Monitoring

For production monitoring, consider:

1. **Vercel Logs**: Monitor function execution and errors
2. **Resend Dashboard**: Track email delivery and open rates
3. **Sentry**: For error tracking and performance monitoring

---

**Next Steps for API Enhancement:**

1. Add rate limiting with Upstash Redis
2. Implement request logging for analytics
3. Add reCAPTCHA verification
4. Create webhook for email delivery status updates
5. Add support for file attachments (if needed)