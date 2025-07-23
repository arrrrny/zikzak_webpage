# ZikZak AI Landing Page

A modern, responsive bilingual landing page for the ZikZak AI mobile app.

## 🔥 Features

- **Bilingual Support**: English and Turkish with dynamic language switching
- **Modern Design**: Clean, contemporary UI with smooth animations
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Download Focused**: Multiple prominent download CTAs throughout the page
- **Interactive Elements**: Animated phone mockup with chat simulation
- **Performance Optimized**: Fast loading with modern web standards
- **Accessibility Ready**: WCAG compliant with keyboard navigation support

## 🛠️ Technologies Used

- HTML5 with semantic markup
- CSS3 with modern features (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Font Awesome icons
- Google Fonts (Inter)
- Mobile-first responsive design

## 📱 Sections

1. **Hero Section**
   - Bilingual headline and description
   - Prominent download buttons (iOS/Android)
   - Animated phone mockup with chat interface
   - Key statistics display
   - Floating background elements

2. **Features Section**
   - 6 key features with icons and descriptions
   - AI-powered chat, barcode scanner, smart filters
   - Responsive grid layout

3. **How It Works**
   - 3-step process explanation
   - Visual step indicators
   - Simple, clear messaging

4. **Download Section**
   - Large download buttons
   - QR code placeholder
   - Final call-to-action

5. **Footer**
   - Legal links (Privacy Policy, Terms of Use, Contact)
   - Social media links
   - Additional download options
   - Company information

## 🌍 Bilingual Content

The page supports both English and Turkish with:
- Dynamic language switching (top-right toggle)
- LocalStorage persistence for language preference
- All text content translated
- SEO-friendly meta tags for both languages

## 📋 Legal Pages Required

The following pages need to be created and linked:
- `/privacy-policy` - Privacy Policy
- `/terms-of-use` - Terms of Use
- `/cookies` - Cookie Policy
- `/help` - Help Center
- `/faq` - Frequently Asked Questions
- `mailto:support@zik-zak.zuzu.dev` - Contact email

## 🚀 Deployment

### Local Development

1. Clone the repository
2. Navigate to the landing-page directory
3. Open `index.html` in a web browser
4. Or serve with a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

### Production Deployment

1. Upload files to your web server
2. Ensure proper MIME types for CSS/JS files
3. Configure SSL certificate for HTTPS
4. Set up proper redirects if needed
5. Test on multiple devices and browsers

### Recommended Hosting Structure

```
/
├── index.html
├── style.css
├── script.js
├── favicon.ico
├── og-image.png
├── app-ads.txt
├── privacy-policy/
├── terms-of-use/
├── cookies/
├── help/
└── faq/
```

## 📊 Analytics Integration

To add Google Analytics:
1. Add Google Analytics script to `<head>` in index.html
2. Update tracking events in script.js
3. Configure goals for download button clicks

Example:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎨 Customization

### Colors
Update CSS custom properties in `:root` to change the color scheme:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #f59e0b;
    --accent-color: #10b981;
}
```

### Content
- Edit text content directly in HTML using `data-en` and `data-tr` attributes
- Update app store links when apps are published
- Replace QR code placeholder with actual QR code

### Images
- Add actual app screenshots to hero section
- Replace favicon.ico with app icon
- Create og-image.png for social sharing (1200x630px)

## 📱 App Store Integration

When the apps are published, update these elements:

1. **iOS App Store Link**:
   ```html
   <a href="https://apps.apple.com/app/zikzak-ai/id123456789">
   ```

2. **Google Play Store Link**:
   ```html
   <a href="https://play.google.com/store/apps/details?id=com.zikzak.app">
   ```

3. **QR Code**: Generate QR code pointing to app store pages

## 🔧 Performance Optimizations

- CSS and JS are minified for production
- Images should be optimized (WebP format recommended)
- Fonts are preloaded for better performance
- Service Worker ready for PWA features
- Lazy loading implemented for images

## 🧪 Testing

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Test Checklist
- [ ] Language switching works correctly
- [ ] All download buttons functional
- [ ] Responsive design on all screen sizes
- [ ] Smooth scrolling navigation
- [ ] Mobile menu functionality
- [ ] Accessibility with keyboard navigation
- [ ] Performance on slow connections

## 📞 Contact & Support

- **Technical Issues**: Create an issue in the repository
- **Content Updates**: Contact the marketing team
- **App Store Links**: Update when apps are published
- **Legal Pages**: Coordinate with legal team for content

## 📄 License

© 2024 ZikZak AI. All rights reserved.

---

**Note**: This landing page is designed to be the primary marketing page for ZikZak AI. Ensure all download links are updated when the mobile apps are published to app stores.