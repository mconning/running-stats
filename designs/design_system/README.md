# Strand AC Design System — drop-in bundle

Copy this whole `strand-ac-design-system/` folder into your repo (e.g. `running-club-metrics/static/strand-ac-design-system/`).

## Using the CSS tokens only (works with your current vanilla HTML pages)
Add to `upload/index.html` and `upload/review.html`:
```html
<link rel="stylesheet" href="/static/strand-ac-design-system/styles.css">
```
Then use the CSS variables it defines (`var(--navy-900)`, `var(--font-display)`, `var(--space-4)`, etc.) in your existing `<style>` blocks instead of hardcoded values.

## Using the full component bundle (React)
```html
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
<link rel="stylesheet" href="/static/strand-ac-design-system/styles.css">
<script src="/static/strand-ac-design-system/_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, Input, Select, Checkbox, Card, Badge, Tabs } = window.StrandAthleticsClubDesignSystem_f49d47;
  // use as normal JSX components
</script>
```

## Contents
- `styles.css` + `tokens/` — colors, type, spacing, radius, shadow CSS variables + self-hosted Archivo/Work Sans fonts.
- `assets/logos/`, `assets/fonts/` — the 5 logo lockups + font files.
- `_ds_bundle.js` — compiled React components (Button, Input, Select, Checkbox, Card, Badge, Tabs).
- `readme.md` — full brand guidelines (voice, visual foundations, iconography).
- `SKILL.md` — for use with Claude Code if you want AI-assisted implementation directly in this repo.

Full source (foundation cards, UI kit prototypes) lives in the Strand Athletics Club Design System project if you need to regenerate or extend this bundle later.
