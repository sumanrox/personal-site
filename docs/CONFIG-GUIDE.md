# Portfolio Configuration Guide

The portfolio content is managed through a centralized JSON configuration file, making it easy to update your information without touching HTML files.

## Configuration File

**Location:** `config/portfolio.json`

## Structure

### Personal Information
```json
"personal": {
  "name": "Your Name",
  "title": "Your Title",
  "tagline": "Your Tagline",
  "bio": "Your bio...",
  "location": "Your Location",
  "availability": "Your availability status",
  "responseTime": "Your response time"
}
```

### Contact Information
```json
"contact": {
  "email": "your@email.com",
  "social": {
    "github": "https://github.com/username",
    "hackerone": "https://hackerone.com/username",
    // ... more social links
  }
}
```

### Stats (Hero Section)
```json
"stats": {
  "experience": {
    "value": 6,
    "label": "Years",
    "description": "..."
  },
  "cves": {
    "value": 12,
    "label": "CVEs"
  }
  // ... more stats
}
```

### Skills
```json
"skills": {
  "categories": [
    {
      "name": "Category Name",
      "items": ["Skill 1", "Skill 2"]
    }
  ]
}
```

### Experience
```json
"experience": [
  {
    "title": "Job Title",
    "company": "Company Name",
    "period": "2019 - Present",
    "type": "full-time",
    "description": "...",
    "highlights": ["Achievement 1", "Achievement 2"]
  }
]
```

### Research Findings
```json
"research": [
  {
    "id": "001",
    "title": "Vulnerability Title",
    "severity": "Critical",
    "type": "Authentication",
    "cve": "CVE-2023-XXXXX",
    "bounty": 5000,
    "description": "...",
    "impact": "...",
    "status": "Patched"
  }
]
```

### Projects
```json
"projects": [
  {
    "name": "Project Name",
    "description": "...",
    "tags": ["Tag1", "Tag2"],
    "github": "https://github.com/...",
    "featured": true
  }
]
```

### SEO Settings
```json
"seo": {
  "title": "Page title",
  "description": "Meta description",
  "keywords": "keyword1, keyword2",
  "author": "Your Name",
  "themeColor": "#000000",
  // Open Graph and Twitter Card settings
}
```

## Usage in HTML

### Data Attributes

Use `data-content` attribute to automatically populate content:

```html
<!-- Simple text content -->
<span data-content="name">Fallback Name</span>

<!-- Email link -->
<a data-content="email" href="mailto:fallback@email.com">Contact</a>

<!-- Social links -->
<a data-social="github" href="#">GitHub</a>
<a data-social="twitter" href="#">Twitter</a>

<!-- Stats with counters -->
<div data-stat="experience">
  <span data-target="0">0</span>+ Years
</div>
```

### JavaScript API

```javascript
import { getConfig, setContent, loadConfig } from './assets/js/config.js';

// Load config
await loadConfig();

// Get config value
const name = getConfig('personal.name');
const email = getConfig('contact.email');

// Update DOM element
setContent('[data-content="name"]', 'personal.name');

// Custom formatter
setContent('[data-stat="bounty"]', 'stats.bounties.value', 
  (val) => `$${val}K+`
);
```

## Automatic Features

The config loader automatically:

1. **Updates SEO meta tags** - Title, description, Open Graph, Twitter Cards
2. **Populates stats counters** - All `data-stat` elements
3. **Sets social links** - All `data-social` links
4. **Initializes content** - All `data-content` elements

## Content Update Workflow

### To Update Your Info:

1. Edit `config/portfolio.json`
2. Save the file
3. Refresh your browser - changes appear instantly!

### No Need To Touch:
- ❌ HTML files
- ❌ JavaScript files (unless adding new features)
- ❌ Multiple files for one change

## Benefits

✅ **Single Source of Truth** - One file contains all your data  
✅ **Easy Updates** - Edit JSON, not HTML  
✅ **Type Safety** - Structured data format  
✅ **SEO Friendly** - Auto-updates meta tags  
✅ **Version Control** - Track content changes easily  
✅ **Separation of Concerns** - Content separate from code

## Best Practices

1. **Backup your config** before major changes
2. **Validate JSON** - Use a JSON validator to catch syntax errors
3. **Keep URLs updated** - Regularly check social links are current
4. **Update stats** - Keep metrics current (CVEs, bounties, etc.)
5. **Test locally** - Always test changes before deploying

## Example: Adding New Social Link

1. Add to config:
```json
"contact": {
  "social": {
    "mastodon": "https://mastodon.social/@username"
  }
}
```

2. Add to HTML:
```html
<a data-social="mastodon" href="#" target="_blank" rel="noopener noreferrer">
  Mastodon
</a>
```

3. Done! The link will auto-populate on page load.

## Troubleshooting

### Config not loading?
- Check browser console for errors
- Verify JSON syntax is valid
- Ensure file path is correct: `/config/portfolio.json`

### Content not updating?
- Clear browser cache
- Check data attribute names match config paths
- Verify `initializeContent()` is called in app.js

### Links broken?
- Verify URLs in config include `https://`
- Check for typos in social platform keys
- Ensure `data-social` attribute matches config key
