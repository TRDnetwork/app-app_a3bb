export default function contactConfirmation({ name }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for your message</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #faf8f5; color: #1a2e1a;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e9e5dd; padding-bottom: 20px;">
      <h1 style="font-family: 'Fraunces', Georgia, serif; font-size: 32px; font-weight: 700; color: #1a2e1a; margin: 0 0 10px 0; letter-spacing: -0.05em;">
        Portfolio Pro
      </h1>
      <p style="font-size: 16px; color: #5a6d5a; margin: 0;">
        Message Received
      </p>
    </div>

    <!-- Content -->
    <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); text-align: center;">
      <div style="margin-bottom: 32px;">
        <div style="width: 80px; height: 80px; background-color: #e9e5dd; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#e66000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <h2 style="font-family: 'Fraunces', Georgia, serif; font-size: 28px; font-weight: 600; color: #1a2e1a; margin: 0 0 16px 0; letter-spacing: -0.02em;">
          Thanks, ${name}!
        </h2>
        
        <p style="font-size: 18px; line-height: 1.6; color: #5a6d5a; margin: 0 0 24px 0; max-width: 480px; margin-left: auto; margin-right: auto;">
          Your message has been received. I'll review it and get back to you as soon as possible—usually within 24-48 hours.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #1a2e1a; margin: 0; font-style: italic;">
          In the meantime, feel free to browse my portfolio projects.
        </p>
      </div>
      
      <div style="background-color: #f9f9f7; border-radius: 8px; padding: 20px; margin-top: 32px;">
        <p style="font-size: 14px; color: #5a6d5a; margin: 0 0 10px 0; font-weight: 600;">
          What happens next?
        </p>
        <ul style="font-size: 14px; color: #5a6d5a; margin: 0; padding-left: 20px; text-align: left;">
          <li style="margin-bottom: 8px;">I'll review your message and respond via email</li>
          <li style="margin-bottom: 8px;">You can expect a thoughtful, personalized reply</li>
          <li>If you don't hear back within 48 hours, please check your spam folder</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e9e5dd; color: #5a6d5a; font-size: 14px;">
      <p style="margin: 0 0 10px 0;">
        This is an automated confirmation that your message was received.
      </p>
      <p style="margin: 0; font-size: 13px;">
        © ${new Date().getFullYear()} Portfolio Pro. All rights reserved.
      </p>
      <p style="margin: 10px 0 0 0; font-size: 12px;">
        <a href="#" style="color: #5a6d5a; text-decoration: underline;">Unsubscribe</a> from these notifications
      </p>
    </div>
  </div>
</body>
</html>
  `;
}