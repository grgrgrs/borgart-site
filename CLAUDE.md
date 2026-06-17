# borgart-site

Personal site for George Rogers — independent reviewer of AI companion devices for older adults, and data/analytics consultant.

## Project

- **Framework**: Astro 4.x (static site generation)
- **Styling**: Tailwind CSS with custom warm color palette, Plus Jakarta Sans font
- **Interactivity**: React (only where needed — e.g., ServiceCard component)
- **Deployed to**: Fly.io at borgart.ai via Docker/NGINX

## Commands

```sh
npm run dev      # Local dev server
npm run build    # Static build to /dist
npm run preview  # Preview production build
```

## Architecture

- `src/pages/` — Astro page files (one file = one route)
- `src/layouts/BaseLayout.astro` — shared header, nav, footer, SEO tags
- `src/components/` — reusable UI blocks (Hero, CTA, Section, ServiceCard)
- `src/styles/global.css` — design tokens and shared utilities
- `public/` — static assets (favicon variants)
- `tailwind.config.js` — custom color palette and typography config

## Key conventions

- Pages are static by default — avoid adding client-side JS unless necessary
- Styling goes through Tailwind; shared tokens live in `global.css`
- The site has two content areas: device reviews/guides (content), and data consulting services
