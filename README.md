# SkyTel Solutions - Refined Professional Website

A sophisticated, neutral-toned website redesign for SkyTel Solutions with grain texture and high-quality imagery.

## Design Philosophy

- **Neutral Aesthetics**: Monochromatic color palette with subtle grain texture
- **Professional Tone**: Clean, understated design focusing on continuity and promise
- **Image-Driven**: High-quality Unsplash photography with grayscale treatment
- **Minimal Decoration**: Reduced visual noise, no emojis, pure content focus
- **Sophisticated Typography**: Inter for body, IBM Plex Mono for accents

## Color Palette

- Dark: #1a1a1a
- Medium: #4a4a4a
- Light: #8a8a8a
- Background: #f5f5f5
- White: #ffffff

All images are desaturated for a cohesive, professional look.

## Features

- **Grain Texture Overlay**: Subtle film grain effect across the entire site
- **High-Quality Images**: Curated Unsplash photography relevant to telecom
- **Grayscale Treatment**: All images filtered for unified aesthetic
- **Responsive Grid System**: Modern layout adapting to all devices
- **Smooth Animations**: Subtle fade-in effects on scroll
- **Performance Optimized**: Lazy loading, intersection observers
- **Accessibility**: Semantic HTML, keyboard navigation, reduced motion support

## Image Sources

All images sourced from Unsplash:
- Hero: Network infrastructure visualization
- About: Team collaboration
- Services: Industry-specific imagery for each service
- Projects: Urban infrastructure
- Careers: Team meeting

## Technologies

- Semantic HTML5
- Modern CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter, IBM Plex Mono)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- First Contentful Paint: <1.5s
- Intersection Observer API for efficient animations
- Lazy loading for images
- Debounced scroll handlers
- RequestAnimationFrame for smooth animations

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-dark: #1a1a1a;
    --color-medium: #4a4a4a;
    /* ... */
}
```

### Images
Replace Unsplash URLs in `index.html` with your own high-quality images.
Maintain the grayscale filter for consistency.

### Grain Texture
Adjust opacity in `body::before` in `styles.css`:
```css
opacity: 0.5; /* 0 = no grain, 1 = full grain */
```

## Deployment

Static site ready for:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any static hosting

## License

© 2026 SkyTel Solutions. All rights reserved.

---

Design: Refined neutral aesthetic with grain texture
Focus: Professionalism, continuity, and promise
