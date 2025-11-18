# Modular Portfolio Structure

This portfolio has been refactored into a modular structure for easier maintenance and customization.

## Directory Structure

```
suman-roy/
├── index.html                          # Main entry point (lightweight shell)
├── load-components.js                  # Component loader script
├── components/                         # HTML component files
│   ├── navigation.html                # Navigation bar
│   ├── hero.html                      # Hero section
│   ├── about.html                     # About section
│   ├── work.html                      # Work/Research section
│   ├── experience.html                # Experience timeline
│   ├── skills.html                    # Skills section
│   ├── contact.html                   # Contact section
│   └── footer.html                    # Footer
├── assets/
│   ├── css/
│   │   ├── main.css                   # Main CSS (imports all components)
│   │   └── components/                # Component-specific CSS
│   │       ├── base.css               # Base styles & reset
│   │       ├── navigation.css         # Navigation styles
│   │       ├── hero.css               # Hero section styles
│   │       ├── timeline.css           # Timeline styles
│   │       ├── skills.css             # Skills & charts styles
│   │       └── animations.css         # Animation keyframes
│   └── js/
│       ├── app.js                     # Main app initializer
│       └── components/                # JS modules
│           ├── navigation.js
│           ├── counterAnimation.js
│           ├── timelineAnimation.js
│           ├── skillBars.js
│           ├── techTags.js
│           ├── cveCharts.js
│           └── ...
```

## How It Works

### Option 1: Component Loader (Dynamic Loading)
The `load-components.js` script dynamically loads HTML components:
- Components load in parallel for performance
- Icons initialize after components load
- App initializes after all components are ready

### Option 2: Build System (Static Generation)
Use a build tool to combine components into a single HTML file:
- Better for production (no extra HTTP requests)
- Can use tools like `gulp`, `webpack`, or simple Node script

## Benefits

✅ **Easy Maintenance** - Edit sections independently  
✅ **Reusable Components** - Use same components across pages  
✅ **Better Organization** - Each section has its own file  
✅ **CSS Modularity** - Component-specific styles isolated  
✅ **Team Collaboration** - Multiple people can work on different sections  
✅ **Version Control** - Cleaner git diffs for changes

## Usage

### Development (Dynamic Loading)
1. Include `load-components.js` in your HTML
2. Add placeholder divs for each component
3. Run a local server (components won't load from `file://`)
   ```bash
   npx serve
   # or
   python3 -m http.server 8000
   ```

### Production (Build System)
Create a build script to combine components:
```bash
npm run build  # Combines all components into dist/index.html
```

## Customization

To add a new section:
1. Create `components/new-section.html`
2. Create `assets/css/components/new-section.css` (if needed)
3. Add to `load-components.js` components array
4. Import CSS in `main.css`

To modify a section:
- Edit the component file directly
- Changes reflect immediately (no need to touch main index.html)
