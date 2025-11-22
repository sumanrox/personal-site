# Copilot Instructions for AI Agents

## Project Overview
- Modular portfolio site for a security researcher (Suman Roy)
- All major sections (navigation, hero, about, work, experience, skills, contact, footer, projects, logo-carousel) are separate HTML components in `components/`
- CSS is split by component in `assets/css/components/`, imported via `main-modular.css`
- JavaScript modules for each feature in `assets/js/components/`
- Main entry for development: `index.html` (dynamic loading via `load-components.js`)
- For production: use `build.py` to combine all components into `dist/index.html`

## Developer Workflow
- Start a local server for development:
  ```bash
  python3 -m http.server 8000
  # Or
  npx http-server -p 8000
  ```
- Edit HTML/CSS/JS in their respective component files
- Refresh browser to see changes
- Build for production:
  ```bash
  python3 build.py
  # Output: dist/index.html
  ```

## Key Patterns & Conventions
- **Component Loading:** `load-components.js` dynamically loads HTML into placeholders in `index.html`
- **Animation:** GSAP + ScrollTrigger for ultra-fast, snappy animations; SplitType for text effects; Lucide for icons
- **Section Animations:** Each section uses its own JS module for entrance/fade/slide effects
- **Pill Headers:** Animated pill headers for section titles, controlled by `pillHeaders.js`
- **Skill Bars & CVE Charts:** Animated via GSAP, data attributes control width/count
- **Navigation:** Minimalist, mobile-friendly, animated with GSAP
- **Logo Carousel:** Infinite scroll, interactive controls
- **Testing/Redesign:** Use `test.html` and `redesign.html` for isolated experiments

## Customization & Extension
- To add a new section:
  1. Create `components/new-section.html`
  2. Create `assets/css/components/new-section.css` (if needed)
  3. Add to `load-components.js` and import CSS in `main-modular.css`
  4. Add placeholder in `index.html`
- To modify a section: edit the relevant component file(s)
- Animations: adjust timing/stagger in JS modules

## Troubleshooting
- Components not loading? Use a local server (not `file://`)
- Styles not applying? Check CSS imports in `main-modular.css`
- Animations not working? Ensure GSAP and ScrollTrigger are loaded, check JS console

## References
- See `README-MODULAR.md`, `MODULAR-STRUCTURE.md`, and comments in component files for more details

---
For best results, follow the modular structure and keep changes isolated to relevant components. Use ultra-fast animation patterns and maintain clean separation of HTML, CSS, and JS.
