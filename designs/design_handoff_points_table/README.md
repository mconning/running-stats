# Handoff: Season Points Table (Women / Men split)

## Overview
A "Season Points" leaderboard for Strand Athletics Club — cumulative points per runner per route, for the 2026 season. This version splits results into a Women card (left) and a Men card (right), each further split by route (5KM shown first, then 10KM), matching the layout convention already used on the club's weekly Results sheet.

## About the Design Files
The file in this bundle (`season-points-women-men-split.html`) is a **design reference created in HTML** — a static prototype showing the intended look, not production code to copy directly. Recreate this design in the target codebase's existing environment (React, Vue, native, etc.) using its established components and patterns. If no frontend environment exists yet, choose the framework best suited to the project.

## Fidelity
**High-fidelity.** Colors, typography, spacing and structure below are final — implement pixel-for-pixel using the codebase's existing component library where equivalent components exist.

## Screens / Views

### Season Points card
**Purpose:** Show cumulative season points per runner, ranked within their gender and route.

**Layout:**
- Outer card: white background, 2px solid teal border (`--teal-500`), 20px border radius, soft navy-tinted shadow, `overflow: hidden`.
- Header band: navy background (`--navy-900`), 24px vertical / 28px horizontal padding, decorative semi-transparent circle (`--navy-700`, 160×160px, positioned top:-40px, right:-40px, 50% opacity) bleeding off the top-right corner.
  - Eyebrow: "STRAND ATHLETICS CLUB", Archivo 800, 11px, letter-spacing 0.08em, color `--sun-400`.
  - Title: "Season Points", Archivo 900, 26px, white, 4px margin-top.
  - Year pill: "2026", white text on `rgba(255,255,255,0.15)`, Work Sans 600, 12px, 4px/12px padding, pill radius, 10px margin-top.
  - Logo: 52×52px white circle, top:18px right:24px, containing the club round logo image at 44×44px (object-fit: contain), soft drop shadow.
- Body: 24px padding (28px/28px bottom), `display:flex`, `gap: 20px` — two equal-width (`flex:1`) columns side by side.

**Components — each column ("Women" / "Men"):**
- Column wrapper: 1px solid border (`--grey-200`), 12px border radius, `overflow:hidden`, `display:flex; flex-direction:column`.
- Column header bar: full-width, 12px/18px padding.
  - Women header: background `--navy-900`.
  - Men header: background `--teal-500`.
  - Label: Archivo 800, 15px, white ("Women" / "Men").
- Route sub-header bar (repeats once per route inside a column, order **5KM then 10KM**): background `--navy-700`, 5px/18px padding, label ("5KM" / "10KM") in Work Sans 700, 11px, white, letter-spacing 0.05em. Second route's sub-header gets `margin-top: 2px`.
- Ranked row (one per runner, directly below its route's sub-header): `display:flex; justify-content:space-between; padding:9px 18px`.
  - Left side: `display:flex; gap:14px` — rank number (fixed `width:16px`) then runner name.
  - Right side: points value.
  - **Rank 1**: background `--sun-400`; rank + name Work Sans 700, 13px, `--navy-900`; points Work Sans 800, 13px, `--navy-900`.
  - **Ranks 2–3**: background `--teal-100`; rank + name + points all Work Sans 700, 13px, `--navy-900`.
  - **Rank 4+**: alternating row background `--white` / `--grey-050` (starts white on rank 4, alternates every row); rank number Work Sans 400, 13px, `--grey-600`; name Work Sans 400, 13px, `--ink-900`; points Work Sans 600, 13px, `--ink-900`.

**Content (current data — swap for the live results feed):**

*Women — 5KM* (rank: name — points): 1 Pretty Bvute — 32, 2 Wilna Eybers — 23, 3 Michelle Van Der Watt — 21, 4 Sharni Izaks — 18, 5 Sarienne Fourie — 15, 6 Caren Meiring — 12, 7 Juna Zhang — 8, 8 Helena Strydom — 7, 9 Annelie Botha — 6, 10 Zanele Mbeki — 5, 11 Tanya Human — 5, 12 Ronel Jacobs — 4, 13 Lindie Swart — 3.

*Women — 10KM* (placeholder — no live data yet): 1 Elzabé Coetzee — 6, 2 Amanda Peters — 4, 3 Retha Snyman — 2.

*Men — 5KM*: 1 Steven George — 45, 2 Estiaan Diener — 29, 3 Jacco Born — 16, 4 Jandre Wichers — 15, 5 Christie Engelbrecht — 14, 6 Emile Van Zyl — 13, 7 Marius Michiel du Toit — 13, 8 Daryll Meyer — 10, 9 Johan Kruger — 9, 10 Sipho Nkosi — 8, 11 Werner Botes — 7, 12 Charl Pretorius — 6, 13 Andre Fourie — 5, 14 Bongani Zulu — 4.

*Men — 10KM*: 1 Christie Engelbrecht — 15, 2 Joseph Kandi — 3, 3 Alexander Engelbrecht — 2, 4 Jandre Wichers — 2, 5 Pieter Coetzee — 2, 6 Riaan Botha — 1, 7 Werner Smit — 1.

> Note: the Women 10KM entries are placeholders standing in for a route that doesn't have real results yet — replace with real data (or omit the section entirely) once available.

## Interactions & Behavior
Static display, no interactive states in this prototype (no click handlers, no animation). If the target app paginates or scrolls long ranked lists, that's an implementation decision — not specified here.

## State Management
None — this is presentational only. In a real app this would likely be a component that receives a runners array (grouped by gender + route) as props/data and renders the ranked rows; rank-based styling (gold/teal/plain) should be computed from array index, not hardcoded.

## Design Tokens
See `tokens/colors.css` for the full token file. Key values used here:
- `--navy-900: #143B61` (headers, dominant brand color)
- `--navy-700: #215A91` (route sub-header bars, decorative circle)
- `--teal-500: #3CB8BC` (Men column header)
- `--teal-100: #B5E4E4` (rank 2–3 row highlight)
- `--sun-400: #F4E54D` (rank 1 row highlight)
- `--grey-050: #F5F7F9` / `--white: #FFFFFF` (alternating row stripes)
- `--grey-200: #D2DBE2` (borders)
- `--grey-600: #647684` (secondary rank-number text)
- `--ink-900: #1E1C1D` (primary row text)

Typography: **Archivo** (700/800/900) for headings/labels, **Work Sans** (400/500/600/700/800) for body/data — both loaded via Google Fonts in the prototype; the target app should use its own self-hosted copies if it has them (see design system's `tokens/fonts.css`).

Border radius: 20px (outer card), 12px (columns). Shadow: soft navy-tinted, `0 10px 30px rgba(20,59,97,0.15)` on the outer card only.

## Assets
- `assets/strand-ac-logo-round.png` — club round logo, used at 44×44px inside a 52×52px white circle badge.

## Files
- `season-points-women-men-split.html` — the full design reference (self-contained, fonts and logo inlined — open directly in a browser).
- `tokens/colors.css` — the design system's color token source.
