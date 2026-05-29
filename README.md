# Ultimate Fitness Gym — Lebanon

Premium yellow/black marketing site for UFG (Mtayleb & Awkar). Built with React, Vite, and Tailwind CSS v4.

## Development

```bash
npm install
npm run dev
```

## Media pipeline

Source photos/videos live outside the repo (e.g. Desktop `UFG PICS/`). **Originals are never modified.**

```bash
# Default source: ../UFG PICS (sibling of this repo)
npm run optimize-media

# Custom source path
UFG_MEDIA_SOURCE="/path/to/UFG PICS" npm run optimize-media
```

Outputs go to `public/ufg-media/` as WebP/AVIF images (thumb, mobile, tablet, desktop), compressed MP4/WebM videos, and poster frames.

### Branch ↔ folder mapping

Edit **one place** in `src/data/ufgMedia.js` (`BRANCH_SOURCE_FOLDERS`) and mirror in `scripts/optimize-ufg-media.mjs`:

| Branch   | Source folder | Default assumption        |
|----------|---------------|---------------------------|
| `mtayleb` | `ufg1 pics`   | Primary club (Cotton Mall) |
| `awkar`   | `ufg2 pics`   | Second branch             |

Swap keys if your folders are the other way around, then re-run `npm run optimize-media`.

Semantic placements (hero, galleries, CTAs) are configured in `src/data/ufgMedia.js`.

## Build & deploy

```bash
npm run build
npm run preview
```

Optimized assets in `public/ufg-media/` are copied to `dist/` for Netlify/static hosting. Commit them after adding new source media and re-running the optimizer.
