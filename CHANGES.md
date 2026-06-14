# Site 1: locationvoituretunisie24-7.com — Full Changes Specification

> **Based on:** Stitch analysis (code.html + screen.png + DESIGN.md)
> **Base template:** NH Rent Car (Next.js + Tailwind CSS)
> **Target:** Match stitch style/layout. Content from AI_INSTRUCTIONS.md.

---

## 1. BRAND & CONTENT (from AI_INSTRUCTIONS.md)

| Field | Value |
|-------|-------|
| **Domain** | locationvoituretunisie24-7.com |
| **Language** | French |
| **Brand Name** | Location Voiture Tunisie 24/7 |
| **Brand Short** | LVT-24/7 |
| **H1** | Location Voiture Tunisie |
| **Meta Title** | Location Voiture Tunisie 24/7 – Pas Cher & Rapide |
| **Meta Description** | Louez une voiture en Tunisie au meilleur prix. Djerba, Tunis, Hammamet, Monastir. |
| **CTA Text** | Réserver Maintenant |
| **Phone** | +216 97 955 896 |
| **Email** | nhrentcar.tn@gmail.com |
| **Tone** | Warm, local, helpful |

### SEO Pages to Create
| Slug | Target Keyword |
|------|---------------|
| `/location-voiture-tunis` | location voiture tunis |
| `/location-voiture-djerba` | location voiture djerba |
| `/location-voiture-hammamet` | location voiture hammamet |
| `/location-voiture-monastir` | location voiture monastir |
| `/location-voiture-sfax` | location voiture sfax |
| `/location-voiture-sousse` | location voiture sousse |
| `/aeroport-tunis` | location voiture aeroport tunis |
| `/aeroport-djerba` | location voiture aeroport djerba |

---

## 2. COLOR SCHEME CHANGES

### Replace entire color system in `globals.css` and `tailwind.config.ts`:

| Token | Base Template | New Value (Stitch) | Usage |
|-------|--------------|-------------------|-------|
| `--color-primary` | `#FF385C` | `#00256f` | Hero bg, buttons, badges, icons, links |
| `--color-primary-container` | — | `#1a3c8f` | Gradient end, decorative blurs |
| `--color-primary-fixed` | — | `#dbe1ff` | Trust badge icon circle bg |
| `--color-on-primary` | — | `#ffffff` | Text on primary |
| `--color-on-primary-container` | — | `#92abff` | Hero subtitle, footer contact icons |
| `--color-accent` | `#FF385C` | `#00256f` | Replace all accent usage |
| `--color-accent-dark` | `#E31C5F` | `#1a3c8f` | Hover states |
| `--color-background` | `#FFFFFF` | `#f7f9fc` | Page base |
| `--color-surface` | `#F7F7F7` | `#f7f9fc` | Trust badges section bg |
| `--color-surface-container-low` | — | `#f2f4f7` | Fleet section, services section |
| `--color-surface-container-lowest` | — | `#ffffff` | Cards, booking widget |
| `--color-surface-container-highest` | — | `#e0e3e6` | Input bottom-borders |
| `--color-on-surface` | `#1A1A1A` | `#191c1e` | Primary text |
| `--color-on-surface-variant` | — | `#444651` | Secondary text, labels |
| `--color-outline-variant` | — | `#c4c6d3` | Ghost borders at 15% |

### Footer Colors
- Footer bg: `bg-blue-950` (~`#172554`)
- Footer text: white headings, `slate-300` body, `slate-400` copyright
- Footer border: `border-white/10`

### Key Gradient
- Primary CTA: `bg-gradient-to-r from-[#00256f] to-[#1a3c8f]`

---

## 3. TYPOGRAPHY CHANGES

### Fonts to Load (replace current fonts)

| Role | Current | New |
|------|---------|-----|
| **Headlines / Display** | System/default | **Manrope** (Google Fonts) — weights: 700, 800, 900 |
| **Body / Labels / UI** | System/default | **Plus Jakarta Sans** (Google Fonts) — weights: 400, 500, 600, 700, 900 |

> Note: AI_INSTRUCTIONS says Nunito, but stitch uses Manrope + Plus Jakarta Sans. **Follow the stitch.**

### Update `layout.tsx`
- Import Manrope and Plus Jakarta Sans from `next/font/google`
- Apply Manrope as `font-headline`, Plus Jakarta Sans as `font-body`
- Set body class to `font-body`

### Type Treatments to Apply

| Element | Font | Size | Weight | Tracking | Transform |
|---------|------|------|--------|----------|-----------|
| Brand "LVT-24/7" | Manrope | `text-2xl` | `font-black` (900) | `tracking-tighter` | `uppercase` |
| Nav links | Manrope | `text-sm` | `font-semibold` (600) | `tracking-tight` | — |
| Hero H1 | Manrope | `text-4xl md:text-6xl` | `font-extrabold` (800) | `tracking-tight` | uppercase content |
| Hero subtitle | Plus Jakarta Sans | `text-lg md:text-xl` | `font-medium` (500) | — | — |
| Form labels | Plus Jakarta Sans | `text-xs` | `font-bold` (700) | `tracking-wider` | `uppercase` |
| Section overline | Plus Jakarta Sans | `text-sm` | `font-bold` (700) | `tracking-widest` | `uppercase` |
| Section H2 | Manrope | `text-3xl md:text-4xl` | `font-extrabold` (800) | — | — |
| Car name H3 | Manrope | `text-2xl` | `font-bold` (700) | — | — |
| Car specs | Plus Jakarta Sans | `text-sm` | `400` | — | — |
| Price | Plus Jakarta Sans | `text-2xl` | `font-black` (900) | — | — |
| Footer headings | Plus Jakarta Sans | `text-xs` | `font-bold` (700) | `tracking-widest` | `uppercase` |

---

## 4. LAYOUT STRUCTURE CHANGES

### Page Container
- Max width: `max-w-screen-2xl` (1536px) — **wider than base template's `max-w-6xl`**
- Horizontal padding: `px-12` (48px) consistently
- Center: `mx-auto`

### Section Order (must match stitch)

| # | Section | Base Template Has? | Change |
|---|---------|-------------------|--------|
| 1 | Fixed Navbar | Yes | Redesign (see below) |
| 2 | Hero Section | Yes | Redesign (solid blue bg, centered text, no image collage) |
| 3 | Floating Booking Widget | Embedded in hero | **Extract to standalone**, float with `-mt-24` overlap |
| 4 | Trust Badges (3 icons) | Yes (in CTA bar) | Redesign as 3-column icon grid |
| 5 | Featured Cars Grid | Yes | Redesign as 2-column cards |
| 6 | Promotion Banner | No | **NEW** — 2-column split (text + image) in blue container |
| 7 | Services (Horizontal Scroll) | No | **NEW** — horizontally scrollable service cards |
| 8 | Footer | Yes | Redesign as 4-column on dark blue |

### Sections to REMOVE from base
- CTA Bar (replaced by trust badges)
- City Landing Links section
- FAQ section on homepage (can keep as separate page)
- "Why Choose Us" section (replaced by promo banner + services)

### Section Background Alternation
```
Navbar:     white/85% with blur
Hero:       #00256f (primary)
Trust:      #f7f9fc (surface)
Fleet:      #f2f4f7 (surface-container-low)
Promo:      #f7f9fc (surface)
Services:   #f2f4f7 (surface-container-low)
Footer:     blue-950 (~#172554)
```

---

## 5. COMPONENT-BY-COMPONENT CHANGES

### 5.1 Navbar (`navbar.tsx`)

**Current:** Fixed, white bg, 3 nav links, phone on right, hamburger mobile menu
**New design:**

- Position: `fixed top-0 w-full z-50`
- Height: `h-20` (80px)
- Background: `bg-white/85 backdrop-blur-xl shadow-sm`
- Layout: 3 zones — Brand | Center Links | Phone
- **Brand (left):** "LVT-24/7" in Manrope, `text-2xl font-black uppercase tracking-tighter text-blue-900`
- **Center links:** `hidden md:flex gap-8`
  - Active: `text-blue-700 border-b-2 border-blue-700 pb-1`
  - Inactive: `text-slate-600 hover:text-blue-900 transition-colors duration-300`
  - Font: Manrope, `text-sm font-semibold`
- **Phone (right):** `call` icon + phone number, `text-blue-900 font-semibold flex gap-2`

### 5.2 Hero Section (`hero-kayak.tsx`)

**Current:** 2-column grid (search form left, image collage right)
**New design:** Full-width centered text on solid blue background

- Container: `pt-20` (offset for navbar), `bg-[#00256f] min-h-[500px] px-12 py-24`
- Centered: `flex items-center justify-center`
- **Background effects:**
  - Carbon fibre texture overlay at `opacity-10` (from transparenttextures.com)
  - Decorative blur: `absolute -right-24 -top-24 w-96 h-96 bg-[#1a3c8f] rounded-full blur-3xl opacity-50`
- **Content:** `max-w-5xl text-center`
  - H1: white, `text-4xl md:text-6xl font-extrabold tracking-tight mb-6`
  - Subtitle: `text-[#92abff] text-lg md:text-xl font-medium max-w-2xl mx-auto`
- **Remove:** Image collage, tab bar, trust indicators below form
- **Move search form** to a separate floating widget below hero

### 5.3 Search/Booking Widget (NEW standalone component)

**Current:** Embedded inside hero
**New:** Floating card overlapping hero and next section

- Position: `max-w-6xl mx-auto px-6 -mt-24 relative z-20`
- Card: `bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-[#c4c6d3]/15`
- **Form layout:** `grid grid-cols-1 md:grid-cols-4 gap-8` (3 inputs + 1 button)
- **Input style:** Minimalist bottom-border only (NO boxes)
  - Label: `text-xs font-bold text-[#444651] tracking-wider uppercase`
  - Icon: Material Symbols, `absolute left-0 bottom-2 text-[#00256f]`
  - Border: `border-b-2 border-[#e0e3e6]`, focus: `focus:border-[#00256f]`
  - Text: `font-semibold text-[#191c1e]`
  - Padding: `py-2 pl-7`, `bg-transparent`
- **Search button:**
  - `bg-gradient-to-r from-[#00256f] to-[#1a3c8f]`
  - `text-white font-bold py-4 rounded-lg`
  - `shadow-lg shadow-[#00256f]/20`
  - Hover: `hover:scale-[0.98]`
  - Content: "RECHERCHER" + search icon

### 5.4 Trust Badges Section (NEW)

**Current:** CTA bar with phone + WhatsApp
**New:** 3-column icon grid

- Section bg: `bg-[#f7f9fc]`, `py-24 px-12`
- Grid: `grid-cols-1 md:grid-cols-3 gap-12 text-center`
- Each badge:
  - Icon circle: `w-20 h-20 bg-[#dbe1ff] rounded-full` centered
  - Icon: Material Symbols, `text-[#00256f] text-4xl`
  - Title: `text-xl font-bold text-[#191c1e] mb-2`
  - Desc: `text-[#444651] text-sm max-w-[250px]`
- Suggested badges: "Sans Carte Bancaire", "Service 24/7", "Assurance Incluse"

### 5.5 Car Cards Grid

**Current:** 3-column grid, `CarCard` component
**New:** 2-column grid with redesigned cards

- Section bg: `bg-[#f2f4f7]`, `py-24 px-12`
- Header: Overline "NOTRE COLLECTION" + H2 "Véhicules de Prestige" + "Voir tout" link with arrow
- Grid: `grid-cols-1 md:grid-cols-2 gap-12`
- **Card:**
  - `bg-white rounded-xl overflow-hidden`
  - Hover: `hover:-translate-y-2 transition-all duration-500`
  - NO border, NO box-shadow (tonal layering only)
  - **Image:** `aspect-[16/9] w-full object-cover` (full bleed, no padding)
  - **Category badge:** `absolute top-6 left-6 bg-[#00256f] px-4 py-2 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg`
  - **Body:** `p-8`
    - Top row: `flex justify-between items-start mb-6`
    - Left: Car name (`text-2xl font-bold mb-1`) + specs (`text-[#444651] text-sm`)
    - Right: "A partir de" + price (`text-2xl font-black text-[#00256f]`)
  - **CTA button:**
    - `w-full py-4 border-2 border-[#00256f]/10 text-[#00256f] font-bold rounded-lg`
    - Hover: `group-hover:bg-[#00256f] group-hover:text-white transition-all`

### 5.6 Promotion Banner (NEW)

**New section not in base template**

- Outer: `bg-[#00256f] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center`
- **Left half (text):** `w-full md:w-1/2 p-12 md:p-20`
  - Badge pill: `bg-white/20 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8`
  - Title: `text-4xl md:text-5xl font-black text-white mb-6 leading-tight`
  - Subtitle: `text-[#92abff] text-lg mb-10 opacity-90`
  - Price + CTA row: `flex gap-8`
    - Price: label `text-xs uppercase tracking-widest opacity-60` + value `text-4xl font-black`
    - CTA: `bg-white text-[#00256f] px-8 py-4 rounded-lg font-bold hover:bg-[#92abff]`
- **Right half (image):** `w-full md:w-1/2 h-[400px]` with `object-cover`

### 5.7 Services Horizontal Scroll (NEW)

**New section not in base template**

- Section bg: `bg-[#f2f4f7]`, `py-24`
- Cards in `flex gap-8 px-12 pb-8 overflow-x-auto` (hide scrollbar with CSS)
- Each card: `flex-shrink-0 w-80 bg-white p-8 rounded-xl shadow-sm`
  - Icon: Material Symbols, `text-[#00256f] text-4xl mb-6`
  - Title: `text-xl font-bold mb-3`
  - Desc: `text-[#444651] text-sm leading-relaxed`

### 5.8 Footer (`footer.tsx`)

**Current:** Dark gradient with 5-column grid, CTA banner above
**New:** Dark blue with 4-column grid, no CTA banner

- Background: `bg-blue-950` (~`#172554`)
- Padding: `py-24 px-12`
- Grid: `grid-cols-1 md:grid-cols-4 gap-12`
- **Column 1 (Brand):**
  - Name: Manrope, `text-xl font-bold uppercase mb-6`
  - Desc: `text-slate-300 mb-8 max-w-xs`
  - Social: `flex gap-4`, each `w-10 h-10 rounded-full border border-white/20`, hover `bg-white/10`
- **Columns 2-3 (Links):**
  - Heading: `text-xs font-bold text-white uppercase tracking-widest mb-2`
  - Links: `text-slate-300 flex flex-col gap-4`, hover `text-white translate-x-1 duration-200`
- **Column 4 (Contact):**
  - Each: icon (`text-[#92abff]`) + text (`text-slate-300`)
- **Bottom bar:**
  - `mt-20 pt-8 border-t border-white/10`
  - `text-slate-400 text-xs flex justify-between items-center`
  - Right: privacy/terms links, `hover:text-white`

---

## 6. BORDER RADIUS SYSTEM

Override Tailwind border-radius to be tighter/sharper:

| Token | Value |
|-------|-------|
| `DEFAULT` | `0.125rem` (2px) |
| `lg` | `0.25rem` (4px) |
| `xl` | `0.5rem` (8px) |
| `full` | `0.75rem` (12px) |

---

## 7. SHADOWS

| Element | Shadow |
|---------|--------|
| Navbar | `shadow-sm` |
| Booking Widget | `shadow-2xl` |
| Search Button | `shadow-lg shadow-[#00256f]/20` |
| Category Badges | `shadow-lg` |
| Service Cards | `shadow-sm` |
| Car Cards | None (tonal layering) |

---

## 8. ICONS

- **System:** Google Material Symbols Outlined
- **Settings:** `FILL: 0, wght: 400, GRAD: 0, opsz: 24`
- Primary color on light bg: `text-[#00256f]`
- Accent in footer: `text-[#92abff]`

---

## 9. INTERACTIONS & HOVER STATES

| Element | Hover Effect |
|---------|-------------|
| Nav links | `text-blue-900 transition-colors duration-300` |
| Search button | `scale(0.98)` press-in |
| Car cards | `translateY(-8px)` lift |
| Car card CTA | Color fill from outline to solid blue |
| "Voir tout" arrow | `gap` widens from 2 to 4 |
| Footer links | `translate-x-1` rightward slide |

---

## 10. 3-STEP RENTAL UX

### Step 1: Search (Hero + Floating Widget)
- User lands on homepage, sees hero with H1
- Floating booking widget below: picks location, dates
- Clicks "RECHERCHER" → navigates to `/nos-voitures`

### Step 2: Choose Car (Car Listing Page)
- Editable search bar at top showing dates
- Filter sidebar + 2-column car grid
- Clicks "Réserver" on card → saves car to store → navigates to `/checkout`

### Step 3: Confirm & Book (Checkout Page)
- Shows booking summary (car, dates, location, price)
- Collects: name, phone, email
- Submit → sends to **Telegram bot + Email**
- Redirects to `/thank-you`

---

## 11. FILES TO CREATE/MODIFY

### New Files
- `src/components/trust-badges.tsx` — 3-column icon grid
- `src/components/promo-banner.tsx` — 2-column promotion section
- `src/components/services-scroll.tsx` — horizontal scrollable services
- `src/components/floating-search.tsx` — standalone floating booking widget

### Files to Modify
- `src/lib/site-config.ts` — Update all brand values, colors, telegram config
- `src/app/globals.css` — Replace entire color system
- `tailwind.config.ts` — Update fonts, border-radius, colors
- `src/app/layout.tsx` — Import Manrope + Plus Jakarta Sans
- `src/app/page.tsx` — Change section order, add new sections
- `src/components/navbar.tsx` — Redesign per stitch
- `src/components/hero-kayak.tsx` — Redesign as centered text on blue bg
- `src/components/car-card.tsx` — Redesign as 2-column layout with new card style
- `src/components/car-grid.tsx` — Change to 2-column grid
- `src/components/footer.tsx` — Redesign as 4-column dark blue
- `src/app/robots.ts` — Update domain
- `src/app/sitemap.ts` — Update domain + add SEO pages

### Files to Remove
- `src/components/search-widget.tsx` — Replaced by floating-search.tsx

---

## 12. DUPLICATE CONTENT BYPASS CHECKLIST

- [x] Unique color scheme (deep navy blue `#00256f`)
- [x] Unique fonts (Manrope + Plus Jakarta Sans)
- [x] Unique hero design (solid blue bg, centered text, no images)
- [x] Unique section order (trust badges → fleet → promo → services)
- [x] Unique CTA text ("Réserver Maintenant")
- [x] All text in French (unique per site)
- [x] Unique JSON-LD schema with site-specific data
- [x] Unique sitemap.xml
