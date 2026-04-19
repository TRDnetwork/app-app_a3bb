# Portfolio Pro

A clean, modern personal portfolio website built with React and Vite. Showcases your work with a hero section, about paragraph, interactive project cards, and a secure contact form with email notifications.

## Features

- **Hero Section**: Prominent display of your name and professional title with elegant typography.
- **About Section**: Readable paragraph about your background and expertise with constrained line length for optimal readability.
- **Project Showcase**: Three interactive project cards with hover animations and external links.
- **Contact Form**: Fully validated form with client and server-side validation, honeypot anti-spam field, and toast notifications.
- **Email System**: Serverless email delivery via Resend - sends both owner notification and user confirmation emails.
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop screens.
- **Smooth Animations**: Framer Motion animations for scroll-triggered reveals and interactive hover states.
- **Warm Minimalist Design**: Carefully crafted color palette with beige backgrounds, dark green text, and burnt orange accents.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (via CDN with custom configuration)
- **Animations**: Framer Motion
- **Fonts**: Google Fonts (Fraunces for headings, Satoshi for body)
- **Backend**: Vercel Serverless Functions
- **Email**: Resend API
- **Deployment**: Vercel

## Project Structure

```
portfolio-pro/
├── index.html              # Main HTML template with Tailwind CDN
├── vite.config.ts          # Vite configuration
├── src/
│   ├── main.tsx           # React entry point
│   ├── App.tsx            # Main application component
│   ├── emails/
│   │   ├── contact-notification.js  # Email template for owner
│   │   └── contact-confirmation.js  # Email template for user
│   └── (other React components)
├── api/
│   └── contact.ts         # Vercel serverless function for email
├── db/
│   └── schema.sql         # Database schema (minimal, for future use)
└── EMAIL_SETUP.md         # Email configuration instructions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Resend account for email functionality
- A Vercel account for deployment

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio-pro
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Customization

1. **Personal Information**: Update the following in `src/App.tsx`:
   - `name` and `title` in the hero section
   - `about` paragraph text
   - Project details in the `projects` array

2. **Styling**: Modify the Tailwind configuration in `index.html` to adjust colors, fonts, or animations.

3. **Email Setup**: Follow the instructions in `EMAIL_SETUP.md` to configure Resend email functionality.

## Email Configuration

The contact form requires Resend API setup. Detailed instructions are available in [EMAIL_SETUP.md](EMAIL_SETUP.md). Key steps:

1. Sign up for a Resend account and get an API key
2. Add `RESEND_API_KEY` as an environment variable in Vercel
3. Update the recipient email in `api/contact.ts`
4. Optional: Verify your domain in Resend for custom "from" addresses

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in Vercel dashboard
3. Add environment variables:
   - `RESEND_API_KEY`: Your Resend API key
   - (Optional) `OWNER_EMAIL`: Your email for notifications
4. Deploy!

Vercel will automatically:
- Build the React application
- Deploy the serverless function at `/api/contact`
- Configure the production environment

## API Endpoints

### POST `/api/contact`
Handles contact form submissions and sends emails via Resend.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Emails sent successfully",
  "notificationId": "email-id-1",
  "confirmationId": "email-id-2"
}
```

**Error Responses:**
- `400` - Missing fields or invalid email format
- `405` - Method not allowed
- `500` - Server error or email sending failure

## Security Features

- **Honeypot Field**: Hidden form field to catch spam bots
- **Server-Side Validation**: All input validated in the serverless function
- **Environment Protection**: API keys stored as server-side environment variables
- **Email Sanitization**: Resend API handles email content sanitization
- **Rate Limiting**: (Recommended) Can be added with Upstash Redis

## Performance Optimizations

- Critical CSS inlined in `index.html`
- Fonts preloaded from Google Fonts
- Images optimized (when added)
- Code splitting via Vite
- Lazy loading for animations

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

All rights reserved. This project is for personal portfolio use.

## Acknowledgments

- Design inspired by warm minimalism principles
- Built with modern React best practices
- Email templates designed for readability and professionalism

---

**Need help?** Check the [EMAIL_SETUP.md](EMAIL_SETUP.md) for email configuration or open an issue in the repository.