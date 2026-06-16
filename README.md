# SkyTel Solutions — Professional Telecom Services Website

A modern, high-performance website for SkyTel Solutions — a B2B telecom services company specializing in network engineering, RF planning, drive testing, and infrastructure deployment across India.

---

## Table of Contents

- [Overview](#overview)
- [Design Philosophy](#design-philosophy)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Sections](#sections)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Supabase Integration](#supabase-integration)
- [Form Validation](#form-validation)
- [Responsive Design](#responsive-design)
- [Performance](#performance)
- [Browser Support](#browser-support)
- [Deployment](#deployment)
- [Customization](#customization)
- [License](#license)

---

## Overview

SkyTel Solutions is a strategic partner for mission-critical connectivity, offering enterprise-grade telecom infrastructure services. This website showcases their capabilities, project portfolio, career opportunities, and provides a professional B2B contact flow with backend integration.

**Live Demo:** [Add your URL here]

---

## Design Philosophy

- **B2B Professional**: Clean, authoritative design targeting enterprise clients and engineering talent
- **Monochromatic Aesthetic**: Neutral color palette with grayscale imagery for a cohesive, serious tone
- **Data-Driven**: Stats counters, KPI cards, and measurable achievements front and center
- **Minimal Noise**: No emojis, no decorative fluff — pure content and conversion focus
- **Technical Polish**: Smooth scroll animations, counter-on-scroll effects, and refined micro-interactions

---

## Features

### Core
- **Responsive Navigation** — Fixed navbar with smooth scroll, mobile hamburger menu, active section highlighting
- **Hero Section** — Full-viewport hero with animated data-pulse rings, gradient overlay, and dual CTAs
- **Stats Counter Animation** — Numbers count up from 0 to target when scrolled into view (99.9% uptime, 24/7 support, 100+ projects, 50+ engineers)
- **Services Section** — 6 full-width horizontal cards with grayscale images, alternating layout, Challenge/Methodology/Impact structure
- **Projects Timeline** — Minimalist vertical timeline with KPI cards, status badges, and technology tags
- **Careers Section** — Side-by-side layout (image left, content right), skill-tag cloud, 4-column benefits grid
- **Contact Form** — Full B2B form with Supabase backend integration, file upload, and success state

### Technical
- **Supabase Backend** — Form submissions stored in `contact_submissions` table with resume file upload to storage
- **Form Validation** — Real-time validation on blur/input with visual feedback (green/red borders, error messages)
  - Name: Letters only, minimum 2 characters
  - Email: Valid email format with `@` and domain
  - Phone: 10-12 digit numbers only
  - Message: Minimum 10 characters
  - All select fields required
- **Resume Upload** — Drag-and-drop or click-to-browse file upload (PDF, DOC, DOCX, images)
- **Fade-in Animations** — IntersectionObserver-based staggered fade-in on scroll
- **Smooth Scrolling** — Custom cubic ease-in-out scroll animation with 750ms duration
- **Mobile Responsive** — Fully responsive across all breakpoints (1024px, 768px, 480px)
- **Accessibility** — Semantic HTML, keyboard navigation, ARIA labels, reduced motion support
- **Performance** — Lazy loading images, requestAnimationFrame for animations, debounced scroll handlers

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure |
| CSS3 | Grid, Flexbox, Custom Properties, Animations |
| JavaScript (ES6+) | IntersectionObserver, Fetch API, Async/Await |
| Supabase | Backend database + storage |
| Google Fonts | Montserrat (body), Space Mono (accents) |
| Unsplash | High-quality grayscale photography |

---

## Project Structure

```
SkyTel/
├── index.html          # Main HTML structure
├── styles.css          # All styles (548 lines, no frameworks)
├── script.js           # All JavaScript (300 lines, no dependencies)
├── assets/
│   └── skytel-logo.png # Company logo
└── README.md           # This file
```

**Total codebase:** ~1,400 lines across 3 files. Zero frameworks, zero build step.

---

## Sections

### 1. Hero
Full-viewport section with background image, animated pulse rings (3 staggered rings with radial-gradient glow), gradient overlay, and dual CTAs ("Talk to Our Team" + "Explore Capabilities").

### 2. About
Two-column grid with Vision/Mission text and a grayscale about image. Below: 4-column stats row with partition borders and counter animation.

### 3. Capabilities (Services)
6 full-width horizontal cards with alternating image placement. Each card covers:
- **Drive Test & Optimization**
- **RF Engineering**
- **Network Optimization**
- **Microwave Transmission**
- **WiMAX & Broadband**
- **Telecom Training**

Each follows: Challenge → Methodology → Impact structure.

### 4. Projects
Hero banner + minimalist vertical timeline with year markers, status badges (Completed/Ongoing), KPI cards, and technology tags. Projects:
- Urban LTE Rollout (1,200+ BTS sites)
- Rural Network Expansion (680+ villages)
- 5G Network Optimization (ongoing)

### 5. Careers
Side-by-side layout: 600px image on left, title + description + 12 skill tags on right. Below: 4-column benefits grid with SVG icons.

### 6. Contact
Two-column layout: contact info (email, phone, location) on left, form on right. Form includes:
- Name, Email, Phone fields
- Preferred Contact Method dropdown
- Service Interest dropdown
- Estimated Project Budget dropdown
- Project Requirements textarea
- Resume file upload (optional)
- Success message replaces form on submission

### 7. Footer
Full-width dark footer with brand info, 3-column links (Company, Capabilities, Legal), and copyright.

---

## Color Palette

| Variable | Hex | Usage |
|---|---|---|
| `--color-dark` | `#1a1a1a` | Headings, icons, dark backgrounds |
| `--color-dark-secondary` | `#2a2a2a` | Hover states |
| `--color-medium` | `#4a4a4a` | Body text, descriptions |
| `--color-light` | `#8a8a8a` | Labels, subtitles, placeholders |
| `--color-lighter` | `#c0c0c0` | Hero text, footer text |
| `--color-bg` | `#f5f5f5` | Page background, cards |
| `--color-white` | `#ffffff` | Cards, inputs, content areas |
| `--color-accent` | `#6a6a6a` | Ongoing status badges |

All images use `filter: grayscale(100%) contrast(1.1)` for unified aesthetic.

---

## Typography

| Font | Usage | Weights |
|---|---|---|
| **Montserrat** | Body text, headings, navigation, buttons | 300, 400, 500, 600, 700, 800, 900 |
| **Space Mono** | Stats numbers, labels, tags, timestamps | 400, 700 |

**Font sizes:**
- Hero title: 3.75rem (60px)
- Section titles: 2.5rem (40px)
- Stat numbers: 2.5rem (40px)
- Body: 1rem (16px)
- Labels/tags: 0.75–0.85rem

---

## Supabase Integration

### Configuration
```javascript
const SUPABASE_URL = 'https://aiakayokjdmtioyxpdla.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Li2yZjM4nvqyGhstQyi6Qw_-KeDByBG';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
```

### Database Table: `contact_submissions`

| Column | Type | Description |
|---|---|---|
| `name` | text | Submitter's full name |
| `email` | text | Email address |
| `phone` | text | Phone number |
| `contact_method` | text | Preferred: email / phone / video |
| `service_interest` | text | Selected service |
| `budget_range` | text | Estimated budget tier |
| `message` | text | Project requirements |
| `resume_url` | text | Storage path for uploaded file |

### Storage: `resumes` bucket
- Accepts: PDF, DOC, DOCX, PNG, JPG, GIF, WebP, SVG
- Files named with random hash for uniqueness

### Connection Test
A test query runs on page load to verify the Supabase connection. Check browser console for "Supabase connection successful" or error message.

---

## Form Validation

All fields validate in real-time on blur and input:

| Field | Rule | Error Message |
|---|---|---|
| Name | Letters only, min 2 chars | "Please enter a valid name (letters only)" |
| Email | Valid email format | "Please enter a valid email (e.g., you@company.com)" |
| Phone | 10-12 digits | "Enter a valid phone number" |
| Message | Min 10 chars | "Please enter at least 10 characters" |
| Selects | Required | HTML5 required validation |

**Visual feedback:**
- Invalid: Red border (`#d32f2f`) + error message below field
- Valid: Green border (`#2e7d32`)
- On submit: Alert if any field invalid, form stays intact

---

## Responsive Design

| Breakpoint | Changes |
|---|---|
| **1024px** | Services stack to single column, careers stack, contact stacks, benefits go 2×2 |
| **768px** | Nav becomes mobile menu, stats go 2×2, careers image 280px, benefits single column, form stacks |
| **480px** | Smaller fonts, stats single column, careers image 330px |

---

## Performance

- **No frameworks** — Vanilla JS, zero dependencies
- **Lazy loading** — All images use `loading="lazy"`
- **IntersectionObserver** — Efficient scroll-triggered animations
- **requestAnimationFrame** — Smooth 60fps counter and scroll animations
- **CSS containment** — Minimal repaints with efficient selectors
- **Estimated FCP:** <1.5s on 3G

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Uses: CSS Grid, Flexbox, CSS Custom Properties, IntersectionObserver, ES6+ (async/await, arrow functions, template literals)

---

## Deployment

Static site — no build step required. Ready for:

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static file host

**To deploy:** Upload `index.html`, `styles.css`, `script.js`, and `assets/` folder to your host.

---

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-dark: #1a1a1a;
    --color-medium: #4a4a4a;
    --color-light: #8a8a8a;
    --color-bg: #f5f5f5;
    /* ... */
}
```

### Images
Replace Unsplash URLs in `index.html`. Maintain grayscale filter for consistency:
```html
<img src="your-image.jpg" style="filter: grayscale(100%) contrast(1.1);">
```

### Supabase
Replace the URL and key in `script.js` with your own project credentials. Ensure the `contact_submissions` table and `resumes` bucket exist in your Supabase project.

### Stats
Edit the `data-target`, `data-suffix`, and `data-decimals` attributes on `.stat-number` elements:
```html
<div class="stat-number" data-target="99.9" data-suffix="%" data-decimals="1">0%</div>
```

### Adding Services
Copy a `.service-item` block in the HTML and update the image, title, and Challenge/Methodology/Impact text.

### Adding Projects
Copy a `.timeline-item` block and update the year, status, title, description, KPIs, and tags.

---

## License

© 2026 SkyTel Solutions. All rights reserved.

---

**Design:** Monochromatic professional aesthetic with technical polish
**Focus:** B2B conversion, engineering talent acquisition, measurable impact
**Built with:** Vanilla HTML, CSS, JavaScript + Supabase backend