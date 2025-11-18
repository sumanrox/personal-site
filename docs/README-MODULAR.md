# Modular Portfolio - Quick Start Guide

Your portfolio has been refactored into a clean, modular structure! 🎉

## 📁 File Structure

```
suman-roy/
├── index.html                    # Original monolithic version (backup)
├── index-modular.html            # New modular entry point
├── load-components.js            # Component loader script
├── extract-components.py         # Script that created the components
│
├── components/                   # HTML Components
│   ├── navigation.html           # Navigation bar (1.3 KB)
│   ├── hero.html                 # Hero section (1.5 KB)
│   ├── about.html                # About section (3.7 KB)
│   ├── work.html                 # Work/Research section (9.2 KB)
│   ├── experience.html           # Experience timeline (12 KB)
│   ├── skills.html               # Skills & tools section (11 KB)
│   ├── contact.html              # Contact section (3.5 KB)
│   └── footer.html               # Footer (4.8 KB)
│
├── assets/css/
│   ├── main.css                  # Original CSS (backup)
│   ├── main-modular.css          # New modular CSS (imports all components)
│   └── components/               # Component CSS
│       ├── base.css              # Base styles & reset
│       ├── navigation.css        # Navigation styles
│       ├── hero.css              # Hero section styles
│       ├── timeline.css          # Timeline styles
│       ├── skills.css            # Skills & charts styles
│       └── animations.css        # Animation keyframes
│
└── assets/js/
    ├── app.js                    # Main app (unchanged)
    └── components/               # JS modules (unchanged)
        ├── navigation.js
        ├── counterAnimation.js
        ├── timelineAnimation.js
        └── ... (all existing modules)
```

## 🚀 How to Use

### Development

1. **Start a local server** (required for component loading):
   ```bash
   # Option 1: Python
   python3 -m http.server 8000
   
   # Option 2: Node.js
   npx serve
   
   # Option 3: VS Code Live Server extension
   ```

2. **Open in browser**:
   ```
   http://localhost:8000/index-modular.html
   ```

3. **Edit components**:
   - Edit any file in `components/` or `assets/css/components/`
   - Refresh browser to see changes
   - No need to touch the main index file!

### Production

For production, you have two options:

**Option A: Keep Dynamic Loading** (Simplest)
- Rename `index-modular.html` to `index.html`
- Deploy everything as-is
- Components load dynamically (8 extra HTTP requests)

**Option B: Build to Single File** (Recommended)
- Create a build script to inline all components
- See "Build System" section below

## ✏️ Editing Components

### To modify the Hero section:
```bash
# Edit the HTML
nano components/hero.html

# Edit the styles
nano assets/css/components/hero.css

# Edit the JavaScript (if needed)
nano assets/js/components/counterAnimation.js
```

### To modify the Timeline:
```bash
# Edit the HTML
nano components/experience.html

# Edit the styles
nano assets/css/components/timeline.css

# Edit the animations
nano assets/js/components/timelineAnimation.js
```

## 🎨 Customizing Styles

All styles are now separated by component:

- **base.css** - Film grain, scrollbars, typography
- **navigation.css** - Nav bar, hamburger menu
- **hero.css** - Hero text animations, counters
- **timeline.css** - Timeline dots, connectors, cards
- **skills.css** - Skill bars, tech tags, CVE charts
- **animations.css** - Text effects, scroll animations

Edit any file and changes apply instantly!

## 🔧 Build System (Optional)

To combine all components into a single HTML file for production:

### Python Build Script

```python
# build.py
import re

# Read modular index
with open('index-modular.html', 'r') as f:
    html = f.read()

# Replace each placeholder with component content
components = [
    'navigation', 'hero', 'about', 'work',
    'experience', 'skills', 'contact', 'footer'
]

for comp in components:
    with open(f'components/{comp}.html', 'r') as f:
        content = f.read()
    html = html.replace(f'<div id="{comp}-placeholder"></div>', content)

# Remove component loader script
html = re.sub(r'<script src="load-components.js"></script>', '', html)

# Write production file
with open('dist/index.html', 'w') as f:
    f.write(html)

print('✓ Build complete: dist/index.html')
```

Run with:
```bash
mkdir -p dist
python3 build.py
```

## 📦 Benefits

✅ **Maintainability** - Edit sections independently  
✅ **Reusability** - Share components across projects  
✅ **Collaboration** - Multiple people work on different sections  
✅ **Organization** - Each section has its dedicated file  
✅ **Version Control** - Cleaner git diffs  
✅ **Testing** - Test individual components in isolation

## 🔄 Migration Notes

- Original files preserved as backups (`index.html`, `main.css`)
- New modular version in `index-modular.html`
- All JavaScript modules unchanged and working
- All animations working exactly as before

## 📝 Adding New Components

1. Create `components/new-section.html`
2. Create `assets/css/components/new-section.css` (if needed)
3. Add to `load-components.js`:
   ```javascript
   { placeholder: '#new-section-placeholder', path: 'components/new-section.html' }
   ```
4. Import CSS in `main-modular.css`:
   ```css
   @import url('components/new-section.css');
   ```
5. Add placeholder in `index-modular.html`:
   ```html
   <div id="new-section-placeholder"></div>
   ```

## 🎯 Next Steps

1. Test the modular version thoroughly
2. Create a build script for production
3. Update deployment process
4. Enjoy easier maintenance! 🚀

## 💡 Tips

- Keep components focused (single responsibility)
- Use consistent naming conventions
- Document component dependencies
- Test in incognito mode after changes
- Use browser DevTools to verify component loading

---

**Questions?** Check `MODULAR-STRUCTURE.md` for more details.
