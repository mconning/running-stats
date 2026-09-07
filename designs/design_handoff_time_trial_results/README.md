# Handoff: Time Trial Results (Public Results Page — "Bold Stat Board" + side-by-side gender cards)

## Overview
Redesign of the weekly Time Trial Results page (currently rendered from a screenshot/table like `running-club-metrics`'s published results view). Groups finishers by **route** (5KM, 10KM, …), then by **gender** side by side within each route, ranked by position, with the podium (1st/2nd/3rd) highlighted per gender and season-best (SB) tags. This is a **display-only** page — no auth, no editing (that's `TimeTrialAdmin.jsx`, covered in the sibling handoff `design_handoff_time_trial_admin/`).

## About the Design Files
`design_files/` contains **static design reference HTML/React** (Babel in-browser JSX, no build step) — shows intended look/layout, not production code to copy verbatim. Data is mocked in `mockResultsData.js`. **Recreate against the real backend** (whatever endpoint currently powers the published-results table in `running-club-metrics` — confirm the exact route; it likely lives in the same `src/review_api/` Lambda set as the admin flow, returning entries once a race's `status` is `published`).

## Fidelity
High-fidelity for layout, color, type, spacing — built on the club's real design tokens (`styles.css` + `tokens/*.css`) and the exact palette/logo assets. Data shape below (`event` + `entries[]`) is a proposed contract, not read from a live schema — confirm field names against whatever the `published` results payload actually returns (likely close to `TimeTrialAdmin.jsx`'s entry shape: `{ name, gender, time, ... }`, plus `position` and an `is_sb`/season-best flag computed server-side or client-side from historical times).

## Layout
Single outer card, `max-width: 980px`, centered, `border-radius: var(--radius-lg)`, `box-shadow: var(--shadow-lg)`, background `var(--grey-050)`.

**Header band**: full-bleed `var(--navy-900)` background, `padding: 40px 44px 32px`, a soft decorative teal circle (`var(--teal-500)` at 18% opacity, 220px, positioned top-right, overflow hidden on the band). Contents (`position: relative` so they sit above the circle):
- Eyebrow: "Strand Athletics Club", Archivo 800, 12px, uppercase, `letter-spacing: var(--ls-eyebrow)`, color `var(--sun-400)`.
- Title: "Time Trial — Week {N}", Archivo 800, `--fs-display-md` (36px), white.
- Pill badges below: one per distinct route present in the data (e.g. "5KM Route", "10KM Route") plus the race date — `rgba(255,255,255,0.12)` background, white text, 11px bold uppercase, `border-radius: var(--radius-pill)`.
- Round club logo, 96px, white circle background with 6px padding, top-right, opposite the title.

**Body**: `padding: 32px 44px 44px`, one **route section per distance**, stacked top to bottom (5KM above 10KM, etc. — order by ascending distance):
- Route section header: 6×22px navy accent bar (`border-radius: 3px`) + Archivo 800 `--fs-h2` (26px) navy label, e.g. "5KM Route".
- Below it, **two gender cards side by side** (`display:flex; gap:20px`, wrap on narrow widths): Women card first, Men card second. Each card: white background, `border-radius: var(--radius-lg)`, `box-shadow: var(--shadow-md)`, `overflow: hidden`.
  - Card header bar: solid color fill, `padding: 14px 20px`, Archivo 800 white label, `font-size: var(--fs-h3)`. **Women's bar = `var(--navy-700)`, Men's bar = `var(--teal-500)`.**
  - Card body: table, no header row, 3 columns: Position (36px, plain number), Name, Time (right-aligned, `H:MM:SS` trimmed to `MM:SS`, `(SB)` suffix when `is_sb`).
  - **Podium rows** (position ≤ 3): 1st gets `var(--sun-400)` full-row background + Archivo 900 navy text; 2nd/3rd get `var(--teal-100)` background + Archivo 800 navy text.
  - **Non-podium rows**: alternate `#fff` / `var(--grey-050)` zebra striping, `var(--grey-600)`/`var(--ink-900)` text, regular weight, `10px 16px` cell padding.
- Repeat the whole route-section block for each additional route (10KM, etc.) beneath the previous one, `margin-bottom: 40px` between sections.

## Data Shape
```
{
  event: { series_name, week, year, race_date },
  entries: [{ position, name, gender: 'M'|'F', time: 'H:MM:SS', is_sb: boolean, distance: '5KM'|'10KM'|… }]
}
```
- Group by `distance` first (drives the route sections and header pills), then by `gender` within each distance, sorted by `position` ascending. Ties share a position (e.g. two athletes at position 2, or three at position 8/13 in the 5KM mock) — expected from dead-heat finish times, not a bug.
- `is_sb` marks a season-best time — confirm whether this is computed server-side (comparing against the athlete's prior times in the DB) or needs to be computed client-side from historical results; the mock hardcodes it.
- The mock's 10KM entries are placeholder names drawn from the club roster (`window.MockData.ROSTER` in the admin handoff) — replace with real 10KM time-trial results once available.

## Assets
- `assets/logos/strand-ac-logo-round.png` — round logo, used at 60px in a white circle on the navy header.

## Design Tokens Used
Colors: `--navy-900 #143B61` (header bg + route section labels/podium text), `--navy-700 #215A91` (women's card header), `--teal-500 #3CB8BC` (men's card header + decorative circle), `--teal-100 #B5E4E4` (2nd/3rd podium bg), `--sun-400 #F4E54D` (1st-place podium bg + eyebrow text), `--grey-050 #F5F7F9` (outer card bg + zebra stripe), `--grey-600 #647684` (secondary text). Fonts: Archivo (display/headings, 700–900), Work Sans (body, inherited default — this page is mostly Archivo numerals/labels). Radius: `--radius-lg 16px`, `--radius-pill`. Shadow: `--shadow-lg` (outer card), `--shadow-md` (gender cards).

## Files
- `design_files/index.html.txt` — entry point, loads React/Babel + design-system bundle, mounts `TimeTrialResultsPage`.
- `design_files/TimeTrialResultsPage.jsx.txt` — the page component (`ResultsTable` sub-component handles per-gender rendering).
- `design_files/mockResultsData.js.txt` — placeholder data; replace with a real fetch to the published-results endpoint.
(Renamed to `.txt` so they don't collide with the live source in the design system project — rename back to `.jsx`/`.js`/`.html` once copied into your codebase.)

Reference the sibling `design_handoff_time_trial_admin/README.md` for the admin-side data shapes (`race_date`, `status` values, entry fields) this page's data is downstream of.
