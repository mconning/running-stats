# Strand Athletics Club — Design System

Strand Athletics Club (Strand AC) is a community athletics club based in Strand, on the coast of the Western Cape, South Africa. It runs training, time trials and fun runs for members "of all ages" and is co-branded / sponsored by **Balwin Properties** (the wave-branded Balwin script logo appears alongside the club mark in the "Strand AC-Balwin" lockups).

**Sources provided:**
- `uploads/STRAND AC_Guidelines.pdf` — a 5-page brand management manual (cover, TOC, and pages establishing the logo, colour and typography system). The PDF's imagery could not be rasterized in this environment, so colours were extracted directly from the PDF's vector fill/stroke operators (exact RGB values, see `tokens/colors.css`) and cross-checked against the supplied logo files.
- Logo files (user-supplied PNGs, re-uploaded after the original .eps files turned out not to be attached): `Strand AC Logo_Horizontal/Round/Square.png`, `STRAND AC-Balwin Logo_Horizontal.png`, `STRAND AC-Balwin Logo.png` — all in `assets/logos/`.
- No codebase, Figma file, or existing website was provided — this is a from-scratch brand-guidelines-only design system.

## Index
- `styles.css` — root stylesheet, imports everything in `tokens/`.
- `tokens/colors.css`, `typography.css`, `spacing.css`, `fonts.css` — design tokens & self-hosted webfonts.
- `assets/logos/` — the 5 logo lockups. `assets/fonts/` — Archivo & Work Sans woff2 files.
- `guidelines/` — foundation specimen cards (colour, type, spacing, brand) shown in the Design System tab.
- `components/core/` — Button, Badge, Card. `components/forms/` — Input, Select, Checkbox. `components/navigation/` — Tabs.
- `ui_kits/club-website/` — a click-through recreation of a club website home page (header, hero, events grid with a registration modal, footer).
- `ui_kits/time-trial-admin/` — recreation of the real `running-club-metrics` codebase's time trial review flow (password gate, races list, per-race entry review/edit, Mobii-photo "extraction" mock) plus a new Club Race Results page (external race DB filtered to club finishers, PNG/PDF export). Built from the actual `upload/review.html` + `upload/index.html` source and `roster.json`, not just the deployed pages' rendered output.
- `SKILL.md` — portable skill definition for use in Claude Code / other agent contexts.

## Components
- **Button** (`components/core/Button.jsx`) — pill CTA, variants `primary/accent/secondary/ghost`, sizes `sm/md/lg`.
- **Badge** (`components/core/Badge.jsx`) — uppercase pill label, tones `navy/teal/sun/coral/outline`.
- **Card** (`components/core/Card.jsx`) — rounded elevated surface, optional hover-lift.
- **Input** (`components/forms/Input.jsx`) — labeled text field with teal focus ring and error state.
- **Select** (`components/forms/Select.jsx`) — labeled dropdown.
- **Checkbox** (`components/forms/Checkbox.jsx`) — square navy-fill checkbox.
- **Tabs** (`components/navigation/Tabs.jsx`) — underline tab bar with teal active indicator.

No component inventory was defined by a source (brand-guidelines-only run), so this is a standard starter set sized to what a club site/registration flow needs. **Intentional additions:** all seven — there was no existing UI to match, so this list was chosen for immediate usefulness (marketing site + event registration), not exhaustiveness.

## CONTENT FUNDAMENTALS
- **Voice:** inclusive and inviting, for **all age groups** — copy should read equally welcoming to a first-time 8-year-old fun-runner and a 60-year-old club veteran. Avoid competitive-elite or intimidating language ("crush your PB", "no pain no gain").
- **Person:** direct and warm — "we" for the club, "you" for the reader. E.g. "We can't wait to see you at the next training session," "Whatever your pace, there's a place for you."
- **Casing:** Sentence case for body copy and buttons ("Become a Member", "Register Now" — title case is fine for short CTAs, but avoid ALL CAPS body text). Uppercase is reserved for short tracked labels/eyebrows/badges (e.g. "5KM", "KIDS FUN RUN"), matching the manual's uppercase wordmark treatment.
- **Tone words:** welcoming, community, encouraging, local/coastal ("the Strand", "our coastline", "beachfront"). Not: elite, hardcore, exclusive.
- **Emoji:** none seen in the source material — none used. Flag if the club wants a friendlier, emoji-inclusive tone for social-style content.
- **Numbers:** distances are written as digits + unit, no space, uppercase unit (5KM, 10KM, 21KM), matching common SA race-entry convention.

## VISUAL FOUNDATIONS
- **Colour:** navy (`#143B61`) is the dominant, authoritative colour (the full wordmark, headers, primary buttons). Teal (`#3CB8BC`), sun yellow (`#F4E54D`) and coral (`#FF3536`) are the club's energetic accent trio, used in the logo's wave graphic and as small pops of colour (badges, underlines) — never as large dominant fields competing with navy. Balwin's own red/green appear only in the Balwin co-brand mark, never elsewhere. No explicit grey ramp exists in the source; a navy-tinted neutral scale was derived for text/surfaces (`--grey-*`).
- **Type:** the wordmark is an extremely bold, tightly-set geometric sans. **Archivo (800/900 Black)** is the closest faithful Google Fonts match for display/headline type; **Work Sans** is a friendly, rounded-but-clean body companion (legible at all ages, per the "all age groups" brief). *Font files were not supplied — Archivo and Work Sans are substitutions. Flag to the user and request the manual's actual typeface files/names if brand-exact type matching is required.*
- **Spacing:** a simple 4px-based scale (4/8/12/16/24/32/48/64/96), generous section padding (48–96px) to keep pages feeling open and unhurried rather than dense.
- **Backgrounds:** solid navy or white fields; the recurring motif is a **layered wave** (navy → teal → sun yellow, echoing the beach/coastline) used as a graphic divider (seen literally in the logo, reused as a hero-section divider in the UI kit). No photography, illustration, gradients, patterns, or textures exist in the source — do not invent any; ask for real event/action photography before using imagery.
- **Animation:** none prescribed by the source. Kept subtle and functional in the UI kit: 120–150ms ease transitions on hover/press only, no bounce/spring.
- **Hover states:** buttons darken/shift a shade within the same hue (navy→lighter navy-700, teal→lighter teal-300); cards lift 2px with a deepened shadow; links shift from navy to coral.
- **Press/active states:** no distinct press treatment beyond the existing hover/focus (kept intentionally simple/functional given no source spec).
- **Focus:** a teal glow ring (`0 0 0 3px teal-100`) on inputs/selects — accessible, on-brand, distinct from hover.
- **Borders:** thin 1–1.5px, `--grey-100`/`--grey-200` for structure, navy for outlined buttons/checkboxes.
- **Shadows:** soft, navy-tinted (not pure black) — `--shadow-sm/md/lg`, used sparingly on raised cards/modals only.
- **Corner radii:** `--radius-sm` 4px (checkboxes), `--radius-md` 8px (inputs, small cards), `--radius-lg` 16px (cards, modals), `--radius-pill` for buttons/badges — pill shapes mirror the club's energetic, rounded wordmark feel.
- **Cards:** white, 16px radius, 1px hairline border, soft shadow — no colored left-border accent (avoided deliberately as an AI-slop trope).
- **Transparency/blur:** used only for the registration modal's scrim (`rgba(navy, 0.55)`) — no frosted-glass/blur elsewhere.
- **Imagery colour vibe:** undetermined — no photography was supplied. If/when action photography is added, the coastal setting suggests bright, warm daylight tones (not desaturated or moody) to match the energetic accent palette.

## ICONOGRAPHY
No icon system, icon font, or icon SVGs were present in the supplied guidelines. The wordmark itself contains one graphic device — a small seagull silhouette — used decoratively within the logo lockups only (see `guidelines/brand-wave-motif.html`); it is not a general-purpose icon. No emoji or unicode glyphs are used as icons in the source. **Recommendation:** if the UI kit needs functional icons (menu, close, chevrons — used minimally in the UI kit via plain text/CSS, not icon fonts), a clean stroke set like Lucide (CDN) would pair well with the geometric wordmark; flag this as a substitution if adopted, since no source icon set exists.

## Fonts — substitution flag
⚠️ The brand manual's actual typeface(s) were not supplied (only vector paths, no embedded/named font data was extractable). **Archivo** (display) and **Work Sans** (body) were chosen as the nearest-feeling free equivalents to the wordmark's bold geometric letterforms. Please share the manual's typography pages or the actual font files if pixel-accurate type matching matters.

## Caveats
- The uploaded guidelines PDF's images could not be rendered in this environment (a rendering-pipeline limitation, not a missing-file issue) — foundations here are built from the logo files, extracted vector colours, and the brief, not from viewing the manual's typography/imagery pages directly.
- Typography is a best-guess Google Fonts substitution (see above) — please confirm or supply real font files.
- No existing website/app/codebase was provided, so the UI kit (`ui_kits/club-website`) is an original, brand-appropriate layout rather than a recreation of anything that exists today.
