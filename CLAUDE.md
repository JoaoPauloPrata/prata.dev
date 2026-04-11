# CLAUDE.md — prata.dev

## Project

Personal freelance landing page. React + Vite, single-page.

**Stack:** React, Vite, plain CSS (`src/index.css`), no CSS frameworks.

---

## Key Architecture

- `src/App.jsx` — component order (AuroraBackground → Nav → Hero → Stats → Services → HowItWorks → Testimonials → CTA → Footer → WhatsAppFloat)
- `src/index.css` — single stylesheet, all styles live here
- `src/components/` — one file per section
- `src/hooks/useScrollReveal.js` — IntersectionObserver, fires once

### CSS Conventions
- `--container: 1440px` — max content width
- `--pad-x` — only on full-bleed sections (Nav, Hero, CTA, Footer, HowItWorks)
- Regular sections: `padding: 5rem 2.5rem; max-width: var(--container); margin: 0 auto`
- `--acento: #7ab3cc` — silvery-blue accent
- Fluid base font: `clamp(16px, 1vw, 20px)`, jumps to `clamp(20px, 0.85vw, 26px)` at 2400px+

### Breakpoints
| Query | Purpose |
|-------|---------|
| `@media (min-width: 2400px)` | Ultrawide (29"+ 21:9) — font up, services 2-col |
| `@media (max-width: 1024px)` | Tablet — hide nav links, 2-col grids |
| `@media (max-width: 640px)` | Mobile — single column, compact spacing |
| `@media (max-width: 400px)` | Very small phones |

---

## Critical Rule: No Collateral Damage

**When fixing a bug or adjusting a section, you must not negatively impact other sections.**

Before changing any shared CSS class (`.section-title`, `.section-sub`, `.hero-eyebrow`, `section`, etc.), verify that every section using it still renders correctly across all breakpoints:

- Mobile (375px)
- Tablet (768px)
- Standard desktop (1440px)
- Ultrawide 21:9 (2560px+)

If a change to a shared class would harm another section, use a more specific selector or add a targeted override instead of modifying the shared rule.

---

## Responsive Rules per Section

### Hero
- `h1`: `clamp(2rem, 4.5vw, 5rem)`, `max-width: min(100%, 900px)`
- Parallax via `--mx` / `--my` CSS vars + RAF lerp (factor 0.06)
- Entrance: `fade-up` keyframe animations with staggered delays

### Services
- Grid: `repeat(4, 1fr)` default → `repeat(2, 1fr)` at ≤1024px → `1fr` at ≤640px → `repeat(2, 1fr)` at ≥2400px
- Section title: `clamp(1.8rem, 3vw, 3rem)` (capped to prevent ultrawide overflow)

### HowItWorks
- Full-bleed background (`background: rgba(17,17,17,0.75)`)
- Roadmap: scroll progress fills `.roadmap-fill`, IntersectionObserver activates `.step-road.step-active`

### Aurora Background
- `position: fixed; z-index: 0` — always behind content
- 4 blobs with independent keyframe animations
- Mobile: blobs scaled down via `@media (max-width: 640px)`

---

## WhatsApp Number
`WA_NUMBER = '5531999999999'` in `src/components/Hero.jsx` and `src/components/WhatsAppFloat.jsx`
