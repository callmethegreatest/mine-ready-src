# Project context — read this before any modification

This file is the project's living memory. It is **populated by the AI as the
project evolves** — the AI updates it after first build and after each major
modification so future AI calls have full context.

If this file is empty (template-default state), this is a brand new project
with no AI work done yet.

---

## Identity

- **Name:**
- **One-line description:**
- **Type / category:** _(landing page, e-commerce, dashboard, blog, hotel, restaurant, SaaS, CRM, etc.)_

## Brand & design

- **Color palette:** _(e.g. "stone-50 / amber-600 / zinc-900 — Moroccan luxury")_
- **Accent color (primary CTA):**
- **Font pairing:** _(display + body — e.g. "Playfair Display + Inter")_
- **Style mood:** _(luxury / playful / minimal / corporate / brutalist / etc.)_
- **Hero pattern:** _(split image-right / full-bleed / minimal type / video bg)_

## Architecture decisions

- **Routing model:** _(single-page anchor-scroll vs multi-page react-router)_
- **Pages:** _(list of routes + their purpose)_
- **State / contexts:** _(e.g. AuthContext, CartContext, ThemeProvider, LanguageProvider)_
- **Data layer:** _(localStorage / chantanDB / external API)_

## Features added so far

- _(e.g. "Dark mode toggle in header", "Arabic language with RTL", "About page at /about")_

## Locked decisions (do NOT change without explicit user request)

- _(e.g. "Hero stays split layout — user explicitly asked", "Brand color is amber-600 — do not swap")_

## Known constraints

- _(e.g. "User wants minimal animations", "Mobile must work on iOS Safari 14")_

---

## How the AI uses this file

**Before** modifying:
1. Read this file to understand brand, palette, feature inventory, locked decisions
2. Apply the same patterns when adding new sections/pages

**After** modifying:
1. Update the relevant section above (Identity, Features added, Locked decisions)
2. Commit the change as part of the same modification

**Never** delete or replace existing entries unless the user explicitly reverses a decision.
