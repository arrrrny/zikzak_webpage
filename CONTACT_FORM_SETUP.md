# Contact Form Setup for GitHub Pages

## Overview
The ZikZak AI contact form uses Formspree to handle form submissions on GitHub Pages. Formspree is a free service that allows you to handle form submissions without a backend server.

## Setup Instructions

### 1. Create a Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Verify your email address

### 2. Create a New Form
1. In your Formspree dashboard, click "New Form"
2. Enter a form name: "ZikZak AI Contact Form"
3. Add your email address where you want to receive submissions
4. Copy the form endpoint URL (looks like: `https://formspree.io/f/xpzgkdqw`)

### 3. Update the Contact Form
1. Open `contact/index.html`
2. Find this line:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID

### 4. Configure Form Settings (Optional)
In your Formspree dashboard, you can:
- Set up email notifications
- Add spam protection
- Configure auto-reply messages
- Set up webhooks for integrations

### 5. Test the Form
1. Deploy your site to GitHub Pages
2. Fill out the contact form
3. Submit it
4. Check your email for the form submission
5. Confirm the form on Formspree (first submission requires confirmation)

## Form Features

### Included Fields
- **Name**: Required text field
- **Email**: Required email field with validation
- **Subject**: Required dropdown with predefined options:
  - General Inquiry
  - Technical Support
  - Feedback
  - Partnership
  - Bug Report
  - Other
- **Message**: Required textarea

### Built-in Features
- **Form validation**: All fields are required
- **Email validation**: Ensures valid email format
- **Loading states**: Shows spinner while submitting
- **Success/Error messages**: User feedback after submission
- **Bilingual support**: Turkish (default) and English
- **Mobile responsive**: Works on all devices
- **Spam protection**: Formspree includes basic spam filtering

## Customization Options

### Changing Email Recipients
1. Go to your Formspree dashboard
2. Select your form
3. Go to Settings → Email
4. Add/remove email addresses

### Adding New Subject Options
Edit the `<select>` field in `contact/index.html`:
```html
<option value="new-option" data-en="New Option" data-tr="Yeni Seçenek">
    Yeni Seçenek
</option>
```

### Styling Modifications
The form uses the same CSS variables as the main site:
- `--primary-color`: Main brand color
- `--secondary-color`: Secondary brand color
- `--text-color`: Main text color
- `--text-muted`: Muted text color

## Limitations (Free Plan)
- 50 submissions per month
- Formspree branding in emails
- Basic spam protection

## Upgrade Options
For higher volume or advanced features:
- **Basic Plan** ($10/month): 1,000 submissions, custom redirects
- **Pro Plan** ($20/month): 5,000 submissions, webhooks, advanced spam protection

## Alternative Services
If you prefer other form services:
- **Netlify Forms**: If hosting on Netlify
- **EmailJS**: Client-side email sending
- **Getform**: Similar to Formspree
- **Basin**: Another form handling service

## Troubleshooting

### Form Not Submitting
1. Check that the Formspree URL is correct
2. Ensure the form endpoint is confirmed in Formspree
3. Check browser console for JavaScript errors

### Not Receiving Emails
1. Check spam/junk folder
2. Verify email address in Formspree settings
3. Ensure form is confirmed in Formspree dashboard

### Styling Issues
1. Clear browser cache
2. Check CSS file is loading properly
3. Verify CSS variables are defined in main stylesheet

## Security Notes
- Formspree handles form submissions securely via HTTPS
- No sensitive data is stored in the frontend code
- Form includes basic spam protection
- Consider adding reCAPTCHA for additional security if needed

## Contact Information
For support with this contact form setup:
- Email: admin@zuzu.dev
- Form issues: Check Formspree documentation
- Technical issues: Check browser console and network tab