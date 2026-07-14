---
name: folio-page
description: >
  Use this skill whenever you are building ANY new page, component, or UI section
  for the Folio book club website. This includes signup pages, login pages, profile
  pages, book detail pages, discussion pages, member pages, archive pages, dashboards,
  or any other screen. Always read this skill before writing a single line of JSX or
  CSS for Folio — it defines every rule: file structure, class naming, colors, fonts,
  spacing, component patterns, and CSS scoping. Never guess at the design system; it's
  all here.
---

# Folio — Page Creation Skill

You are building a page for **Folio**, a warm literary book club web app. Every page
must feel like a curated reading journal: editorial, intimate, and typographically rich.

---

## 1. File & Output Rules

- Every page is **two files**: `PageName.jsx` + `PageName.css`
- Both files live in `src/` alongside existing pages
- Import the CSS inside the JSX: `import "./PageName.css";`
- No inline styles. No Tailwind. No CSS modules. Plain CSS classes only.
- No third-party UI libraries (no MUI, no Chakra, no Radix). Hand-crafted only.

---

## 2. CSS Scoping — CRITICAL

Every page has a **unique root wrapper class** (e.g. `.home-page`, `.su-page`, `.profile-page`).

**ALL CSS rules — including variables, resets, and every selector — must be scoped
inside that root class.** Nothing global. No bare `body`, `*`, `:root`, `html`, or `a`
selectors anywhere in a page CSS file. This prevents styles from one page bleeding into
another when React loads both CSS files simultaneously.

### Correct pattern
```css
.profile-page {
  --cream: #f5f0e8;   /* variables go here, NOT in :root */
  font-family: var(--font-body);
}

.profile-page *,
.profile-page *::before,
.profile-page *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.profile-page a { text-decoration: none; color: inherit; }

.profile-page .some-component { ... }
```

### Wrong pattern (never do this)
```css
:root { --cream: #f5f0e8; }   /* ❌ bleeds globally */
body { font-family: ...; }    /* ❌ bleeds globally */
*, *::before, *::after { ... } /* ❌ higher specificity, breaks other pages */
.some-component { ... }        /* ❌ no page scope */
```

### Class naming
Prefix every class with a **2–3 letter page abbreviation** + hyphen to guarantee
no collisions across pages. Examples:

| Page         | Prefix | Example class        |
|--------------|--------|----------------------|
| Home         | `.app` | `.app .hero`         |
| Sign Up      | `.su-` | `.su-page .su-btn`   |
| Login        | `.lg-` | `.lg-page .lg-form`  |
| Profile      | `.pr-` | `.pr-page .pr-avatar`|
| Book Detail  | `.bd-` | `.bd-page .bd-cover` |
| Discussion   | `.dc-` | `.dc-page .dc-thread`|
| Archive      | `.ar-` | `.ar-page .ar-grid`  |

Pick a new prefix for each new page and use it **everywhere**: CSS selectors,
JSX `className` values, and `@keyframes` names.

---

## 3. Design Tokens

Declare these as CSS custom properties inside the page root class (not `:root`).
Use the **exact hex values** — do not substitute or approximate.

```css
.your-page {
  /* ── Palette ──────────────────────────────── */
  --cream:       #f5f0e8;   /* primary light bg, text on dark */
  --parchment:   #ede6d6;   /* section bg, tag bg             */
  --warm-tan:    #c9b99a;   /* borders, dividers, muted lines */
  --brown:       #7a4f3a;   /* primary brand colour           */
  --dark-brown:  #3d2314;   /* headings, dark surfaces        */
  --ink:         #1c1209;   /* body text, footer bg           */
  --rust:        #b05c3a;   /* accents, hover states, errors  */
  --sage:        #6b8c6e;   /* success, genre: nature/fiction */
  --gold:        #c49a44;   /* logo mark, stars, highlights   */
  --soft-white:  #faf8f3;   /* page background                */

  /* ── Typography ──────────────────────────── */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'Lora', Georgia, serif;
  --font-mono:    'DM Mono', monospace;

  /* ── Motion ───────────────────────────────── */
  --transition: 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);

  /* ── Elevation ────────────────────────────── */
  --shadow-sm: 0 2px 12px rgba(60, 35, 20, 0.10);
  --shadow-md: 0 8px 32px rgba(60, 35, 20, 0.15);
  --shadow-lg: 0 20px 60px rgba(60, 35, 20, 0.22);

  /* ── Misc ─────────────────────────────────── */
  --radius: 4px;
}
```

Always load fonts with this exact `@import` at the **top** of the CSS file (before
the page root class, since `@import` must be first):

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400;1,600&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@300;400&display=swap');
```

---

## 4. Typography Rules

| Role              | Font              | Weight | Size                    | Extra                        |
|-------------------|-------------------|--------|-------------------------|------------------------------|
| Page H1           | `font-display`    | 800    | `clamp(2rem, 4vw, 3rem)`| —                            |
| Section H2        | `font-display`    | 700    | `2rem`                  | —                            |
| Card title        | `font-display`    | 700    | `1.05–1.4rem`           | —                            |
| Italic accent     | `font-display`    | 400    | inherit                 | `font-style: italic`         |
| Body / description| `font-body`       | 400    | `0.95–1.05rem`          | `line-height: 1.75–1.8`      |
| Labels / eyebrows | `font-mono`       | 400    | `0.65–0.75rem`          | `letter-spacing: 0.12–0.2em`, `text-transform: uppercase` |
| Buttons           | `font-mono`       | 400    | `0.78rem`               | `letter-spacing: 0.08em`, `text-transform: uppercase` |
| Captions / hints  | `font-mono`       | 300    | `0.63–0.68rem`          | `letter-spacing: 0.08em`     |

**Eyebrow labels** (small category/section labels above headings) always use
`font-mono`, uppercase, and one of: `color: var(--rust)` or `color: var(--gold)`.

---

## 5. Colour Usage Guide

| Token          | Use for                                                  |
|----------------|----------------------------------------------------------|
| `--soft-white` | Default page background                                  |
| `--cream`      | Cards, inputs, light surfaces, text on dark backgrounds  |
| `--parchment`  | Alternating section backgrounds, tag backgrounds         |
| `--warm-tan`   | Borders, dividers, placeholder text, muted lines         |
| `--brown`      | Primary buttons, active states, links, brand colour      |
| `--dark-brown` | Headings, dark panel backgrounds, hover on buttons       |
| `--ink`        | Body text (on light bg), footer background               |
| `--rust`       | Hover accents, eyebrow labels, error states, highlights  |
| `--sage`       | Success indicators, nature/fiction genre chip            |
| `--gold`       | Logo ◈ mark, star ratings, special highlights            |

**Dark sections** (hero, panel, members): use `var(--dark-brown)` or `var(--ink)`
as background, `var(--cream)` for text, `var(--gold)` for accents.

---

## 6. Component Patterns

### Buttons
Three variants used across all pages. Adapt class prefix to your page:

```css
.xx-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: var(--radius);
  border: none;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
}

/* Primary — filled brown */
.xx-btn--primary { background: var(--brown); color: var(--cream); }
.xx-btn--primary:hover {
  background: var(--dark-brown);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Ghost — transparent, cream border (for dark backgrounds) */
.xx-btn--ghost {
  background: transparent;
  color: var(--cream);
  border: 1px solid rgba(245,240,232,0.45);
}
.xx-btn--ghost:hover { background: rgba(245,240,232,0.1); }

/* Outline — transparent, tan border (for light backgrounds) */
.xx-btn--outline {
  background: transparent;
  color: var(--brown);
  border: 1.5px solid var(--warm-tan);
}
.xx-btn--outline:hover {
  border-color: var(--brown);
  background: rgba(122,79,58,0.05);
}

/* Modifiers */
.xx-btn--full   { width: 100%; }
.xx-btn--large  { padding: 16px 40px; font-size: 0.85rem; }
.xx-btn--disabled { opacity: 0.45; cursor: not-allowed; pointer-events: none; }
```

### Book Cover Illustration
Simulated book cover — no real images needed:

```css
.xx-book-cover {
  border-radius: 3px 10px 10px 3px;   /* thin spine side, thick page side */
  border-left: 5px solid rgba(0,0,0,0.25);  /* spine shadow */
  box-shadow: var(--shadow-lg);
  background: linear-gradient(160deg, var(--brown), #5c3420);
  overflow: hidden;
  transition: transform var(--transition);
}
.xx-book-cover:hover { transform: translateY(-6px) rotate(-1deg); }
```

Book colours in use across the site (vary per book):
- Dark green: `linear-gradient(135deg, #4a6741, #2e4228)`
- Warm tan: `linear-gradient(135deg, #9b7c5a, #7a5c3a)`
- Brown (default): `linear-gradient(160deg, #7a4f3a, #5c3420)`

### Cards (light bg)
```css
.xx-card {
  background: var(--soft-white);
  border: 1px solid rgba(201,185,154,0.5);
  border-radius: 8px;
  padding: 28px 24px;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition), box-shadow var(--transition);
}
.xx-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}
```

### Cards (dark bg — inside dark sections)
```css
.xx-dark-card {
  background: rgba(245,240,232,0.06);
  border: 1px solid rgba(245,240,232,0.12);
  border-radius: 8px;
  padding: 28px 20px;
  transition: background var(--transition), transform var(--transition);
}
.xx-dark-card:hover {
  background: rgba(245,240,232,0.11);
  transform: translateY(-4px);
}
```

### Genre / Tag Chips
```css
.xx-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: var(--parchment);
  border: 1px solid var(--warm-tan);
  border-radius: 100px;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dark-brown);
}

/* Selected state */
.xx-chip--selected {
  border-color: var(--brown);
  background: rgba(122,79,58,0.08);
  color: var(--brown);
  font-weight: 500;
}
```

### Section Eyebrow + Divider Line
```css
.xx-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--rust);
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.xx-eyebrow::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--warm-tan);
  max-width: 200px;
}
```

### Form Fields
```css
.xx-field { display: flex; flex-direction: column; gap: 6px; }

.xx-field__label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dark-brown);
}

.xx-field__input {
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid var(--warm-tan);
  border-radius: var(--radius);
  background: var(--cream);
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--ink);
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
}
.xx-field__input::placeholder { color: rgba(122,79,58,0.4); }
.xx-field__input:focus {
  border-color: var(--brown);
  box-shadow: 0 0 0 3px rgba(122,79,58,0.12);
}
.xx-field--error .xx-field__input {
  border-color: var(--rust);
  box-shadow: 0 0 0 3px rgba(176,92,58,0.1);
}

.xx-field__error {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--rust);
}
```

### Avatar Circle
```css
.xx-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--soft-white);
}
/* Avatar accent colours (rotate through): */
/* #c49a72, #8faa8b, #b07d62, #9b8ea0     */
```

---

## 7. Layout Patterns

### Section with light background
```jsx
<section className="xx-section">
  <div className="xx-eyebrow"><span>◉ Section Label</span></div>
  <div className="xx-section__header">
    <h2>Section Title</h2>
    <a href="#" className="xx-section__link">See all →</a>
  </div>
  {/* content */}
</section>
```
```css
.xx-page .xx-section { padding: 80px 48px; background: var(--soft-white); }
.xx-page .xx-section__header {
  display: flex; align-items: baseline;
  justify-content: space-between; margin-bottom: 40px;
}
.xx-page .xx-section__link {
  font-family: var(--font-mono); font-size: 0.72rem;
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--brown);
}
```

### Dark section (members, hero panels)
```css
.xx-page .xx-dark-section {
  position: relative;
  padding: 80px 48px;
  overflow: hidden;
}
.xx-page .xx-dark-section__bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--dark-brown), #2e1a0e);
}
.xx-page .xx-dark-section__content {
  position: relative; z-index: 1;
  max-width: 900px; margin: 0 auto;
}
/* Text inside: use var(--cream) for headings, rgba(245,240,232,0.7) for body */
```

### Split layout (form pages like Sign Up)
```css
.xx-page {
  display: grid;
  grid-template-columns: 420px 1fr;
  min-height: 100vh;
}
/* Left panel: dark. Right panel: soft-white. */
```

### Stats row
```css
.xx-page .xx-stats {
  display: flex; align-items: center;
  justify-content: center; gap: 48px;
}
.xx-page .xx-stat { text-align: center; }
.xx-page .xx-stat__num {
  display: block; font-family: var(--font-display);
  font-size: 2.4rem; font-weight: 800; color: var(--cream); line-height: 1;
}
.xx-page .xx-stat__label {
  font-family: var(--font-mono); font-size: 0.68rem;
  letter-spacing: 0.16em; text-transform: uppercase; color: rgba(245,240,232,0.45);
}
.xx-page .xx-stat__divider { width: 1px; height: 48px; background: rgba(245,240,232,0.15); }
```

---

## 8. Shared Decorative Elements

### The ◈ logo mark
Used in the logo and as decorative ornaments. Always coloured `var(--gold)`.
```jsx
<span className="xx-logo">◈ Folio</span>
```

### Ornamental characters used site-wide
- `◈` — logo / section ornament (gold)
- `◉` — "currently reading" / active indicator (rust)
- `⊛` — metadata / info indicator (rust)
- `✦` — eyebrow label decorator (gold/rust)
- `★` — star ratings (gold)

### Quote display
```jsx
<div className="xx-quote">
  <span className="xx-quote__mark">"</span>
  <p>Quote text here.</p>
  <cite>— Author Name</cite>
</div>
```
```css
.xx-page .xx-quote__mark {
  font-family: var(--font-display); font-size: 5rem;
  color: var(--gold); opacity: 0.4; line-height: 1; display: block;
}
.xx-page .xx-quote p {
  font-family: var(--font-display); font-style: italic;
  font-size: 1.15rem; line-height: 1.75; color: rgba(245,240,232,0.85);
}
.xx-page .xx-quote cite {
  font-family: var(--font-mono); font-size: 0.7rem;
  letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); font-style: normal;
}
```

---

## 9. Animation Names

Prefix ALL `@keyframes` names with your page prefix to avoid collisions:

```css
@keyframes pr-fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pr-fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

Standard easing: `0.35s cubic-bezier(0.22, 0.61, 0.36, 1)` (already in `--transition`).
Hover lifts: `transform: translateY(-4px)` for cards, `-2px` for buttons.

---

## 10. Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 900px) {
  .xx-page .xx-section { padding: 60px 24px; }
  /* Collapse multi-column grids to 1 column */
  /* Split layouts: grid-template-columns: 1fr */
}

/* Mobile */
@media (max-width: 480px) {
  /* Stack flex rows, reduce font sizes ~10–15% */
}
```

Section padding on mobile: `60px 24px` (down from `80px 48px`).
Hero padding on mobile: `60px 24px`.

---

## 11. The Navbar (shared — do not recreate)

The navbar already exists in `BookClubHome.jsx`. New pages do NOT include a
navbar — the app's router wraps pages with a shared layout that provides it.
If a page needs a back-navigation logo (like Sign Up), use a standalone fixed logo:

```jsx
<a href="/" className="xx-back-logo">◈ Folio</a>
```
```css
.xx-page .xx-back-logo {
  position: fixed; top: 28px; left: 40px;
  font-family: var(--font-display); font-size: 1.4rem; font-weight: 800;
  color: var(--dark-brown); letter-spacing: 0.02em; text-decoration: none; z-index: 10;
}
```

---

## 12. Quick Checklist Before Submitting

Before handing back any page, verify:

- [ ] CSS `@import` for Google Fonts is the first line of the CSS file
- [ ] All CSS variables are declared inside `.xx-page { }`, not `:root`
- [ ] The `*` reset is `.xx-page *, .xx-page *::before, .xx-page *::after`
- [ ] No bare `body`, `html`, `a`, or `*` selectors in the CSS file
- [ ] Every `className` in JSX matches a `.xx-page .xx-classname` rule in CSS
- [ ] Every `@keyframes` name starts with the page prefix
- [ ] Buttons use `--brown` / `--dark-brown` / `--cream` colours
- [ ] Headings use `font-display` (Playfair Display)
- [ ] Labels / buttons use `font-mono` (DM Mono) with `text-transform: uppercase`
- [ ] Body text uses `font-body` (Lora)
- [ ] Hover states on interactive elements (cards lift, buttons darken)
- [ ] Mobile responsive styles included under `@media (max-width: 900px)`