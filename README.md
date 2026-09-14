<<<<<<< HEAD
# Abdullah Shehada — Portfolio (Next.js)

This is the Next.js (App Router) version of the portfolio, split from the original
single-file `index.html` into components, with the 3D robot / cloud companion (Three.js)
and icons (lucide) installed as real npm packages instead of external CDN scripts.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

To build for production:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.js       Root layout — Inter font (next/font/google) + page metadata
  page.js         Assembles all sections in order
  globals.css     All the original CSS, unchanged
components/
  Navbar.jsx
  Hero.jsx         Contains the #robot-mount div (3D robot renders here)
  Discovery.jsx    Stats, tech stack, languages, competencies
  Experience.jsx   Timeline + the cloud companion (#cloud-robot-mount)
  Projects.jsx     Renders the 8 project cards from data/projects.js
  Contact.jsx
  ClientEffects.jsx  All the interactive JS (typewriter, 3D scenes, scroll-reveal
                      animations, counters, mobile menu) as a single client component
data/
  projects.js      Project content as a data array — edit this to add/change projects
```

## Adding your real photo & project screenshots

Search each component for the `{/* ... */}` comments marking where an `<img>` should
replace a placeholder `<div>`:

- `components/Contact.jsx` — profile photo
- `components/Projects.jsx` — project screenshots (currently text placeholders)

## Editing content

- **Projects:** edit `data/projects.js` (label, title, subtitle, description, tags).
  Adding a new project there automatically renders a new card — no JSX editing needed.
- **Experience timeline, skills, stats, contact info:** edit the JSX directly inside the
  matching component file.

## Known notes

- **Google Fonts at build time:** `next/font/google` fetches Inter from
  `fonts.googleapis.com` during `next build` / `next dev`. If you're behind a strict
  proxy/firewall that blocks this domain, the build will fail or fall back to a system
  font. This is expected — it will work normally on a machine with regular internet
  access.
- **`THREE.Clock` deprecation warning:** the installed `three` version is newer than the
  one originally loaded via CDN, so the browser console will log a harmless
  "THREE.Clock is deprecated, use THREE.Timer" warning. It's cosmetic only — the 3D
  scenes work correctly.
- The old single-file `index.html` is no longer the source of truth — make future
  content edits in this Next.js project instead.
>>>>>>> b4906d7aa34f381a6ac1f7f4748915a11389dbd1
