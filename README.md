# Miracle 2026 — Voice of Easwarians

> **The flagship 24-hour hackathon by Voice of Easwarians student tech community.**

---

## Overview

| Field         | Detail                              |
|:------------- |:----------------------------------- |
| **Event**     | Miracle 2026 Hackathon              |
| **Club**      | Voice of Easwarians (VOE)           |
| **Date**      | October 15–16, 2026                 |
| **Venue**     | Easwari Engineering College, Chennai|
| **Duration**  | 24 Hours                            |
| **Prize Pool**| ₹50,000+                            |
| **Team Size** | 2–4 Members                         |
| **Tracks**    | AI/ML, Web/App, Healthcare, Smart Campus, Social Impact |

---

## Project Structure

```
VOE-Miracle-26/
│
├── index.html               ← Home page
├── .nojekyll                ← GitHub Pages config
├── README.md
│
├── pages/
│   ├── about.html           ← About VOE & Miracle
│   ├── event-details.html   ← Tracks, Timeline, Prizes
│   ├── registration.html    ← Team registration form
│   └── contact.html         ← Contact & FAQ
│
└── assets/
    ├── css/
    │   ├── variables.css    ← Design tokens & CSS vars
    │   ├── reset.css        ← Browser reset
    │   ├── global.css       ← Layout, background system, footer
    │   ├── components.css   ← Navbar, buttons, glass panel, toast
    │   ├── home.css         ← Hero section, preview cards
    │   ├── pages.css        ← Sub-page layouts (tracks, prizes, form, FAQ)
    │   ├── responsive.css   ← All @media breakpoints
    │   └── animations.css   ← @keyframes & reveal classes
    │
    ├── js/
    │   ├── main.js          ← DOMContentLoaded entry point
    │   ├── nav.js           ← Navbar scroll + active link + mobile menu
    │   ├── animations.js    ← All visual effects (particles, reveals, tilt…)
    │   ├── tabs.js          ← Tab switching system
    │   ├── faq.js           ← FAQ accordion
    │   └── registration.js  ← Form validation & success toast
    │
    ├── images/
    │   ├── logo/            ← voe-logo.svg, favicon.png
    │   ├── hero/            ← hero-bg.webp, miracle-visual.webp
    │   ├── community/       ← community-1..3.jpg
    │   ├── tracks/          ← ai-ml.webp, web-app.webp, etc.
    │   ├── backgrounds/     ← grid.svg, glow-1.webp, glow-2.webp
    │   └── icons/           ← calendar.svg, location.svg, etc.
    │
    └── videos/
        └── promo/           ← teaser.mp4
```

---

## CSS Architecture

| File | Purpose |
|:--- |:--- |
| `variables.css` | Single source of truth for all design tokens |
| `reset.css` | Minimal cross-browser reset |
| `global.css` | 4-layer background system (gradient → aurora → grid → noise) |
| `components.css` | Reusable UI: navbar, buttons, glass-panel, toast |
| `home.css` | Hero motif + orbitals + countdown + preview cards |
| `pages.css` | Tracks bento, timeline nodes, prize hierarchy, form, FAQ |
| `responsive.css` | All `@media` queries (1100/968/768/480px) |
| `animations.css` | `@keyframes` + `.reveal` scroll classes + tab pane |

## JS Architecture

| File | Exported Function | Purpose |
|:--- |:--- |:--- |
| `nav.js` | `initNavigation()` | Scroll-glass navbar, active page, mobile menu |
| `animations.js` | `initAnimations()` | 10 visual effects (particles, tilt, cursor, parallax…) |
| `tabs.js` | `initTabs()` | `[data-tab-system]` switching |
| `faq.js` | `initFAQ()` | Accordion open/close |
| `registration.js` | `initRegistration()` | Validation + success toast |
| `main.js` | — | Calls all `init*()` on DOMContentLoaded |

---

## Local Development

No build step required. Open `index.html` in any modern browser or use Live Server:

```bash
# VS Code Live Server extension — right click index.html → Open with Live Server
# Or any static file server:
npx serve .
```

## Deployment

This project is ready for **GitHub Pages**:

1. Push to a GitHub repository
2. Go to **Settings → Pages → Source → main branch / root**
3. The `.nojekyll` file ensures assets load correctly

---

*Built with HTML · CSS · Vanilla JS — No frameworks. No dependencies.*

**Crafted by the VOE Tech Team &mdash; Voice of Easwarians 2026.**
