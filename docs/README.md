# Suman Roy - Security Researcher Portfolio

A minimal, modern portfolio website for a security researcher specializing in penetration testing and vulnerability research.

## Quick Start

```bash
# Clone or navigate to project directory
cd personal-site

# Start local development server
python3 -m http.server 8000
# Or: npx http-server -p 8000

# Open http://localhost:8000
```

## Project Structure

```
personal-site/
├── index.html                    # Main entry point
├── load-components.js            # Dynamic component loader
├── components/                   # HTML components
│   ├── navigation.html
│   ├── hero.html
│   ├── about.html
│   ├── work.html
│   ├── experience.html
│   ├── projects.html
│   ├── contact.html
│   └── footer.html
├── assets/
│   ├── css/
│   │   ├── main-modular.css     # CSS imports
│   │   └── components/          # Component styles
│   └── js/
│       ├── app.js               # Main initialization
│       └── components/          # Feature modules
├── docs/
│   ├── README.md                # This file
│   ├── SECURITY-AUDIT-REPORT.md # Security documentation
│   └── TURNSTILE-SETUP.md       # Cloudflare Turnstile setup
└── .htaccess / nginx-security.conf  # Server security headers
```

## Key Features

- ✅ **Modular Architecture**: Separate HTML/CSS/JS components
- ✅ **GSAP Animations**: Smooth scroll-triggered effects
- ✅ **Security Hardened**: SRI, rate limiting, Turnstile CAPTCHA
- ✅ **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation
- ✅ **Performance**: Deferred scripts, optimized loading
- ✅ **Responsive**: Mobile-first design

## Technologies

- **HTML5** - Semantic markup with ARIA attributes
- **Tailwind CSS** - Utility-first styling
- **GSAP 3.12.5** - Animation library with ScrollTrigger
- **Cloudflare Turnstile** - Privacy-first CAPTCHA
- **ES6 Modules** - Modern JavaScript architecture

## Configuration

### Security Headers
- Production: Use `.htaccess` (Apache) or `nginx-security.conf` (Nginx)
- See files for complete security header configuration

### Cloudflare Turnstile
1. Get site key from [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Replace `YOUR_TURNSTILE_SITE_KEY` in `components/contact.html`
3. See `docs/TURNSTILE-SETUP.md` for backend verification

### Customization
- **Content**: Edit files in `components/`
- **Styles**: Modify files in `assets/css/components/`
- **Animations**: Adjust timing in `assets/js/components/`

## Documentation

- **README.md** - This file (quick start & overview)
- **SECURITY-AUDIT-REPORT.md** - Complete security audit findings
- **TURNSTILE-SETUP.md** - CAPTCHA configuration guide

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2025 Suman Roy. All rights reserved.
