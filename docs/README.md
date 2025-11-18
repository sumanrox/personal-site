# Suman Roy - Security Researcher Portfolio

A minimal, modern portfolio website for a security researcher specializing in penetration testing and vulnerability research.

## Features

- **F-Pattern Layout**: Optimized for natural reading flow and user engagement
- **Character-by-Character Text Animation**: Smooth scroll-triggered text reveal effects
- **Scroll Progress Indicator**: Animated progress bar showing scroll position
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modular Architecture**: Clean, reusable component structure

## Project Structure

```
suman-roy/
├── index.html                          # Main HTML file
├── assets/
│   ├── css/
│   │   └── main.css                   # Main stylesheet
│   └── js/
│       ├── app.js                     # Application entry point
│       └── components/
│           ├── textHighlight.js       # Text animation component
│           ├── scrollProgress.js      # Scroll progress bar
│           ├── linkAnimations.js      # Link hover effects
│           └── sectionAnimations.js   # Section fade-in effects
└── README.md                          # This file
```

## Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework
- **GSAP 3.12.5**: Animation library
- **ScrollTrigger**: Scroll-based animations
- **SplitType**: Text splitting for character animations
- **ES6 Modules**: Modern JavaScript module system

## Components

### Text Highlight (`textHighlight.js`)
Handles character-by-character text reveal animation on scroll with configurable timing and stagger effects.

### Scroll Progress (`scrollProgress.js`)
Creates an animated progress bar at the top of the page that tracks scroll position.

### Link Animations (`linkAnimations.js`)
Adds smooth hover effects to all links throughout the site.

### Section Animations (`sectionAnimations.js`)
Implements fade-in animations for sections as they enter the viewport.

## Development

To run locally:

```bash
# Navigate to project directory
cd /path/to/suman-roy

# Start a local server (Python 3)
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## Customization

### Updating Content
Edit `index.html` to modify:
- Personal information
- Security research findings
- CVEs and bug bounties
- Experience and certifications
- Contact information

### Styling
Modify `assets/css/main.css` to adjust:
- Colors and typography
- Animation speeds
- Layout spacing
- Responsive breakpoints

### Animations
Configure animations in component files:
- Adjust timing in `textHighlight.js`
- Modify progress bar style in `scrollProgress.js`
- Change hover effects in `linkAnimations.js`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2024 Suman Roy. All rights reserved.
