# 🎯 Quick Reference - Modular Portfolio

## File Structure
```
suman-roy/
├── 📄 index.html              Original (backup)
├── 📄 index-modular.html      New modular version
├── 📁 components/             HTML sections (8 files)
├── 📁 assets/css/components/  CSS modules (6 files)
├── 📁 dist/                   Production build
└── 🔧 build.py                Build script
```

## Common Tasks

### Start Development Server
```bash
python3 -m http.server 8000
# Open: http://localhost:8000/index-modular.html
```

### Edit Components
```bash
# HTML
nano components/hero.html

# CSS
nano assets/css/components/hero.css

# JavaScript (unchanged location)
nano assets/js/components/counterAnimation.js
```

### Build for Production
```bash
python3 build.py
# Output: dist/index.html (47.6 KB)
```

## Component Map

| Component | HTML | CSS | JS |
|-----------|------|-----|-----|
| Navigation | navigation.html | navigation.css | navigation.js |
| Hero | hero.html | hero.css | counterAnimation.js, textHighlight.js |
| About | about.html | - | sectionAnimations.js |
| Work | work.html | - | workCardHover.js, sectionAnimations.js |
| Experience | experience.html | timeline.css | timelineAnimation.js |
| Skills | skills.html | skills.css | skillBars.js, techTags.js, cveCharts.js |
| Contact | contact.html | - | sectionAnimations.js |
| Footer | footer.html | - | - |

## Quick Edits

### Change Name/Title
**File:** `components/navigation.html`
```html
<a href="#" class="font-bold text-xl">
  Your Name
</a>
```

### Update Hero Stats
**File:** `components/hero.html`
```html
<span class="counter" data-target="10">0</span>+ Years
```

### Modify Timeline
**File:** `components/experience.html`
- Add/remove timeline items
- Update dates, titles, descriptions

### Adjust Skill Bars
**File:** `components/skills.html`
- Change data-width attribute (0-100)
- Update skill names

### Update CVE Data
**File:** `components/skills.html`
- Modify data-target (count)
- Adjust data-width (percentage)

## Animation Speed

All components use ultra-fast animations (0.3-0.8s):
- Timeline: 0.5s
- Skill bars: 0.6s  
- Tech tags: 0.3s
- CVE charts: 0.5s

To adjust: Edit respective JS files in `assets/js/components/`

## CSS Architecture

```
main-modular.css (imports all)
  ↓
  ├── base.css         (film grain, reset)
  ├── navigation.css   (nav, mobile menu)
  ├── hero.css         (text animations)
  ├── timeline.css     (dots, connectors)
  ├── skills.css       (bars, charts)
  └── animations.css   (scroll effects)
```

## Deployment

### Option 1: Dynamic (Modular)
```bash
# Deploy entire folder structure
rsync -avz . server:/var/www/
```

### Option 2: Static (Built)
```bash
# Build first
python3 build.py

# Deploy only /dist folder
rsync -avz dist/ server:/var/www/
```

## Troubleshooting

**Components not loading?**
- Use local server (not `file://`)
- Check browser console for errors
- Verify component paths

**Styles not applying?**
- Check `main-modular.css` imports
- Verify component CSS files exist
- Clear browser cache

**Animations not working?**
- Check GSAP loaded (network tab)
- Verify app.js initialization
- Check JS console for errors

## Files You'll Edit Most

1. `components/hero.html` - Name, tagline, stats
2. `components/about.html` - Bio, expertise
3. `components/experience.html` - Timeline
4. `components/skills.html` - Skills, CVEs
5. `components/contact.html` - Contact info

## Files You'll Rarely Touch

- `load-components.js` - Works automatically
- `build.py` - Only if changing build process
- `assets/js/app.js` - Main initialization
- Base CSS - Core styles

---

**Quick Start:** `python3 -m http.server 8000` → Edit components → Refresh browser → `python3 build.py` when ready to deploy
