export default function contactNotification({ name, email, message }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #faf8f5; color: #1a2e1a;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e9e5dd; padding-bottom: 20px;">
      <h1 style="font-family: 'Fraunces', Georgia, serif; font-size: 32px; font-weight: 700; color: #1a2e1a; margin: 0 0 10px 0; letter-spacing: -0.05em;">
        Portfolio Pro
      </h1>
      <p style="font-size: 16px; color: #5a6d5a; margin: 0;">
        New Contact Form Submission
      </p>
    </div>

    <!-- Content -->
    <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
      <h2 style="font-family: 'Fraunces', Georgia, serif; font-size: 24px; font-weight: 600; color: #1a2e1a; margin: 0 0 24px 0; letter-spacing: -0.02em;">
        You have a new message
      </h2>
      
      <div style="margin-bottom: 32px;">
        <div style="margin-bottom: 20px;">
          <p style="font-size: 14px; font-weight: 600; color: #5a6d5a; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.05em;">
            From
          </p>
          <p style="font-size: 18px; color: #1a2e1a; margin: 0; font-weight: 500;">
            ${name}
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="font-size: 14px; font-weight: 600; color: #5a6d5a; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.05em;">
            Email
          </p>
          <p style="font-size: 18px; color: #1a2e1a; margin: 0;">
            <a href="mailto:${email}" style="color: #e66000; text-decoration: none; font-weight: 500;">
              ${email}
            </a>
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="font-size: 14px; font-weight: 600; color: #5a6d5a; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.05em;">
            Message
          </p>
          <div style="background-color: #f9f9f7; border-left: 4px solid #e9e5dd; padding: 20px; border-radius: 0 8px 8px 0;">
            <p style="font-size: 16px; line-height: 1.6; color: #1a2e1a; margin: 0; white-space: pre-wrap;">
              ${message}
            </p>
          </div>
        </div>
      </div>
      
      <div style="text-align: center; padding-top: 24px; border-top: 1px solid #e9e5dd;">
        <a href="mailto:${email}" style="display: inline-block; background-color: #e66000; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; transition: background-color 0.2s;">
          Reply to ${name.split(' ')[0]}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e9e5dd; color: #5a6d5a; font-size: 14px;">
      <p style="margin: 0 0 10px 0;">
        This email was sent from your Portfolio Pro contact form.
      </p>
      <p style="margin: 0; font-size: 13px;">
        © ${new Date().getFullYear()} Portfolio Pro. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}