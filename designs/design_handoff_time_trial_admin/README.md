# Handoff: Time Trial Admin & Club Race Results

## Overview
Two screens for Strand Athletics Club's time trial results workflow:
1. **Time Trial Admin** — password-gated staff tool to create a race, upload a finish-line photo, review/edit the auto-extracted entries, and publish results. This redesigns the existing `upload/index.html` + `upload/review.html` pages in the `running-club-metrics` codebase into a single flow.
2. **Club Race Results** — a new screen pulling results from an external race-timing database (e.g. Finish Line Insights) filtered to Strand AC finishers, with PNG/PDF export.

## About the Design Files
The files in `design_files/` are **design references built in static HTML/React (Babel, in-browser JSX, no build step)** — they show intended look, layout, and interaction, not production code to copy directly. All data is mocked in `design_files/mockData.js` and all "backend" calls (login, photo processing, race results) are faked with `setTimeout`. **Recreate these designs against the real `running-club-metrics` backend** (the API Gateway + Lambda functions in `src/review_api/`, the S3 presign upload flow in `upload/presign_handler.py`, and the Mobii extraction pipeline), using whatever frontend stack the codebase ends up using (the current pages are vanilla HTML/JS — you can keep that, or move to a framework if the team prefers).

## Fidelity
**High-fidelity** for layout, colors, typography, spacing, and component states — built using the club's actual design system (`styles.css` design tokens + `Button`/`Badge`/`Card`/`Input`/`Select` components from the same project). Treat visual values below as final. Data shapes and status values were read directly from the real `upload/review.html` source and `src/review_api/*.py`, so those are meant to be exact — but the *implementation* (API calls, polling, auth) must be re-wired to the real endpoints, not copied as-is (the mock fetches don't exist).

## Screens / Views

### 1. Time Trial Admin (`TimeTrialAdmin.jsx` behind `LoginGate.jsx`)

**Purpose**: club committee member logs in, manages the list of time trial races, uploads a finish-line photo per race, reviews/corrects the extracted entries, and publishes.

**Login gate** (`LoginGate.jsx`):
- Centered white card, 360px wide, 40px padding, `border-radius: 16px` (`--radius-lg`), `box-shadow: var(--shadow-md)`, on a `var(--grey-050)` page background.
- Club horizontal logo at top (32px tall, `width: auto`, `align-self: flex-start` — do NOT let a column-flex container stretch it).
- Title "Time Trial Admin" — Archivo 800, 22px, `var(--navy-900)`.
- Subcopy 14px `var(--grey-600)`.
- Password `<input type="password">` via the design system's `Input` component.
- Error text 13px `var(--coral-500)` shown inline below the field on failed login.
- Primary `Button` "Log In", full width of form (`type="submit"`).
- **Real behavior**: POST `{password}` to `/login` (see `src/review_api/login.py`); on success store the returned token (currently `sessionStorage` in the real page) and show the app; on 401/failure show the error text. Do not hardcode a password client-side — the prototype's `strandac2026` check is a stand-in only.

**Top nav** (`TimeTrialApp.jsx`): header bar, `padding: 16px 32px`, bottom hairline border `var(--grey-100)`. Left: club horizontal logo, 30px tall (`width:auto`). Center-right: two nav buttons ("Time Trial Admin" / "Club Results") using `Button` variant `primary` when active, `ghost` otherwise, `size="sm"`. Right: "Log Out" ghost button.

**Races list**: white card (`border:1px solid var(--grey-100)`, `border-radius: var(--radius-lg)`, `padding:24px`).
- "New race date" date `Input` + "Create race (no photo)" secondary `Button`, inline, bottom-aligned.
- Table columns: Date, Series, Status, (row action). Header row: 12px uppercase Archivo 700, `var(--grey-600)`, `letter-spacing: var(--ls-eyebrow)`, 2px bottom border `var(--grey-100)`.
- Each row clickable (opens that race); active row highlighted `background: var(--grey-050)`.
- Status badge tones (via `Badge` component): `draft`→outline, `extracting`→sun (amber), `processing`→sun, `published`→teal, `extraction_failed`/`processing_failed`→coral. Label text: replace underscores with spaces (e.g. "extraction failed").
- Real behavior: GET `/races` on load (`src/review_api/races.py`); POST `/races {race_date}` to create (kicks off "extracting" status via the pipeline — no photo means it goes straight to a manual-entry draft in the real system, confirm with backend team exactly what "no photo" race creation does server-side).

**Race detail panel** (shown when a race is selected): white card, same styling as above, `gap:20px` internal stack.
- Header row: `"{race_date} — {series_name}"` (Archivo 800, 20px, navy) + status badge, space-between.
- **Photo upload**: dashed-border drop zone (`1.5px dashed var(--grey-200)`, `border-radius: var(--radius-md)`, `padding:16px`, `background: var(--grey-050)`) containing a hidden `<input type="file" accept="image/*">`, a "Choose photo" secondary button, and the chosen filename (or "No photo uploaded yet") in 13px grey. While status is `extracting`, show "Extracting times from photo…" in teal, 13px bold below.
  - Real behavior: this triggers the actual upload flow — request a presigned URL from `/presign` (`upload/presign_handler.py`) with `{password, filename, race_date}`, PUT the file to the returned `upload_url`, then the async extraction pipeline picks it up and the race status transitions `draft → extracting → draft` (with entries populated) or `→ extraction_failed`. The prototype fakes this with a 1.2s timeout.
- **Entries table** (only shown once entries exist): columns Name, Gender, Time, Distance, Source, Flag, (actions). Sorted by gender (M before F before other) then by time ascending (parse `H:MM:SS`/`MM:SS`/`SS`). Flagged rows get a `#FFF8E5` background tint. Each row is **inline-editable**: Name is a text input, Gender/Distance are selects, Time is a text input (`H:MM:SS` placeholder), Source is read-only text, Flag column shows a coral `Badge` with the flag reason (underscores replaced with spaces) or an em dash. Row actions: "Save" (PUT the edited fields to `/races/{race_date}/entries/{entry_id}`, and clear `flag_reason` to null) and "Remove" (DELETE same entry). A banner note above the table reads "resolve flags before processing" in coral bold when any entry is flagged.
- **Add entry** row: Name field is a **text input with a `<datalist>` autocomplete** sourced from the club roster (`/roster-names` endpoint — `src/review_api/roster_names.py`, ~roster.json canonical names), Gender select (M/F), Time text input, Distance select (5KM/10KM), "Add" secondary button. POSTs to `/races/{race_date}/entries`.
- **Start processing** primary button — disabled when: no entries, any entry still flagged, or status is `extracting`/`processing`. On click: POST `/races/{race_date}/process`, status → `processing` → poll until it becomes `published` (or `processing_failed`); show "Processing…" (teal) then "Published — results are live." (leaf green) inline next to the button.

### 2. Club Race Results (`RaceResults.jsx`)

**Purpose**: pull results from an external race-timing database and show only Strand AC finishers, with export.

**Layout**: same max-width (1000px) centered column as the admin page, `padding: 32px 24px 64px`.
- Title "Club Race Results" (Archivo 800, 28px, navy) + subcopy.
- Controls row: a `Select` labeled "Race" (options = "All Races" + each distinct race name from the results feed) on the left; "Download PNG" (secondary) and "Download PDF" (primary) buttons on the right.
- Results card: white, bordered, `border-radius: var(--radius-lg)`, `padding:24px`. Header inside the card: round club logo (36px) + bold navy label showing the selected race name (or "All Races") + "— Club Results".
- Table columns: Pos, Name, Category, Distance (as a teal `Badge`), Time (Archivo 700). When "All Races" is selected, an extra Race column appears. Sorted by position ascending. Empty state: centered grey "No Strand AC finishers found for this race."
- **Download PDF**: triggers `window.print()` (the header/buttons are hidden via a `@media print` rule so only the results table prints).
- **Download PNG**: uses `html2canvas` (CDN, see `index.html`) to rasterize the results card and trigger a download named `strand-ac-results.png`.
- Real behavior: this needs a genuine integration with the external results provider (confirm the actual API/scrape source — the design was built against a placeholder "Finish Line Insights" concept since no live integration exists yet) filtered by club name = "Strand Athletics Club". The PDF/PNG export mechanisms (`window.print()` + `html2canvas`) are real and can ship as-is if you keep a similar DOM structure.

## Interactions & Behavior
- Hover states: buttons darken one shade within their hue (see Design Tokens); cards with `hover` prop lift 2px + deepen shadow.
- Focus states: inputs/selects get a teal glow ring `0 0 0 3px var(--teal-100)` and border color `var(--teal-500)`.
- Transitions: 120–150ms ease on background-color/box-shadow/border-color only — no bounce/spring easing anywhere.
- No responsive/mobile breakpoints were designed — both screens assume a desktop admin-tool context; ask if a mobile layout is needed.

## State Management
- `unlocked` (bool) — gates the whole app behind `LoginGate`.
- `page` ('admin' | 'results') — top-level nav.
- `races` (array of `{race_date, series_name, status}`) — fetch from `/races`.
- `activeDate` — currently open race.
- `entries` (array of `{entry_id, name, gender, time, distance, source, flag_reason}`) — fetch from `/races/{date}` when opening a race.
- `raceFilter` on the results page — selected race name to filter by.

## Design Tokens
(from this project's `styles.css` / `tokens/*.css` — use these exact values)
- Colors: navy `#143B61` (`--navy-900`), navy hover `#215A91` (`--navy-700`), teal `#3CB8BC` (`--teal-500`), teal hover `#5FCEC6` (`--teal-300`), teal tint `#B5E4E4` (`--teal-100`), sun `#F4E54D` (`--sun-400`), coral `#FF3536` (`--coral-500`), leaf green `#37A245` (`--leaf-500`), ink `#1E1C1D` (`--ink-900`). Neutrals: `--grey-050 #F5F7F9`, `--grey-100 #E7ECF0`, `--grey-200 #D2DBE2`, `--grey-400 #9AABB8`, `--grey-600 #647684`.
- Fonts: display/headings — Archivo (700/800/900); body — Work Sans (400/500/600/700).
- Type scale used here: 28px/800 page titles, 20px/800 section titles, 16px/800 card labels, 14–16px/400–600 body, 12px/700 uppercase eyebrows (`letter-spacing: 0.12em`).
- Radius: `--radius-sm 4px`, `--radius-md 8px`, `--radius-lg 16px`, `--radius-pill` (buttons/badges).
- Shadow: `--shadow-sm`, `--shadow-md`, `--shadow-lg` — all soft navy-tinted, not pure black.
- Spacing scale: 4/8/12/16/24/32/48/64/96px.

## Assets
- Club logos: `assets/logos/strand-ac-logo-horizontal.png`, `strand-ac-logo-round.png` (from the design system, copied into `design_files` folder is not included — pull from the design system project's `assets/logos/` or the club's own brand assets).
- No icon font/library used; only text and the two logo files.

## Files
- `design_files/index.html.txt` — entry point, loads React/Babel + the design system bundle + html2canvas, mounts `TimeTrialApp`.
- `design_files/TimeTrialApp.jsx.txt` — top-level shell (nav + page switch).
- `design_files/LoginGate.jsx.txt` — password screen.
- `design_files/TimeTrialAdmin.jsx.txt` — races list + race detail/review workspace.
- `design_files/RaceResults.jsx.txt` — club results table + export.
- `design_files/mockData.js.txt` — placeholder data; replace entirely with real API calls.
(Renamed to `.txt` in this bundle so they don't collide with the live source in the design system project — rename back to their original extensions once copied into your own codebase.)

Reference source (for exact real-world data shapes/status values/endpoints): `running-club-metrics/upload/review.html`, `upload/index.html`, `src/review_api/*.py`, `upload/presign_handler.py`, `roster.json`.
