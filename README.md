# Kivu Gateway

Your Gateway to the Great Lakes — marketing site for Kivu Gateway, connecting people, businesses and opportunities across Rwanda and Eastern DRC.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- react-router-dom

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment (Vercel)

This project deploys as a static Vite SPA. `vercel.json` includes a catch-all
rewrite to `index.html` so client-side routes (e.g. `/services`, `/tourism`)
work correctly on direct load and refresh — no framework preset changes
needed beyond the default Vite build (`npm run build`, output directory `dist`).

## Content

All contact details, team info, listings and photography are placeholder
content pending real details from the business — see `src/data/site.ts` for
the single source of truth for contact info, stats, services and destinations.
