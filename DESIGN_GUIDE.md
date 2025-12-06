# 🎨 PasarUni Design Guide - Neo-Brutalism Edition

## Visual Identity

PasarUni uses a **"Soft Neo-Brutalism"** design language inspired by Malaysian "pasar" (market) culture - bold, honest, and unpretentious.

## Color Palette

### Primary Colors

```
Mustard Yellow (Primary Action)
- Hex: #FACC15
- Tailwind: bg-pasar-yellow
- Usage: Navbar, CTA buttons, highlights, category badges

Navy Blue (Trust & Borders)
- Hex: #312E81
- Tailwind: bg-pasar-navy / text-pasar-navy / border-pasar-navy
- Usage: Text, borders, secondary buttons, shadows

Cream (Background)
- Hex: #FAFAF9
- Tailwind: bg-pasar-cream
- Usage: Page background

White (Cards)
- Hex: #FFFFFF
- Tailwind: bg-white
- Usage: Card backgrounds, input fields
```

### Semantic Colors

```
Red (Habis Stamp)
- Hex: #DC2626
- Tailwind: bg-pasar-red
- Usage: "Habis!" sold stamp
```

## Typography

**Font Family:** Inter (Google Fonts)
- Clean, modern, excellent readability
- Weights: 400, 500, 600, 700, 800, 900

**Hierarchy:**
- Hero Heading: 4xl-5xl, font-black (900)
- Section Heading: 3xl, font-black
- Subsection: 2xl, font-black
- Card Title: lg-xl, font-bold (700)
- Body: base, font-semibold (600) or font-medium (500)
- Small Text: sm-xs, font-semibold

**Color:**
- Primary text: text-pasar-navy
- Secondary text: text-pasar-navy/80
- Muted text: text-pasar-navy/60

## Neo-Brutalism Elements

### Borders
- Standard: `border-2 border-pasar-navy`
- Thick: `border-3 border-pasar-navy`
- Light: `border-2 border-pasar-navy/20`

### Shadows
```css
shadow-brutal: 4px 4px 0px 0px rgba(49, 46, 129, 1)
shadow-brutal-sm: 2px 2px 0px 0px rgba(49, 46, 129, 1)
shadow-brutal-lg: 6px 6px 0px 0px rgba(49, 46, 129, 1)
```

### Corners
- Standard: `rounded-xl` (12px)
- Small elements: `rounded-lg` (8px)
- Avatars/badges: `rounded-full`

### Cards (`.card-brutal`)
```
- bg-white
- rounded-xl
- border-2 border-pasar-navy
- shadow-brutal
```

### Buttons (`.btn-brutal`)
```
- px-6 py-3
- font-bold
- rounded-xl
- border-3 border-pasar-navy
- shadow-brutal
- Active state: translate-x-1 translate-y-1 shadow-none
```

## Component Patterns

### Navbar
- Sticky top
- Yellow background (`bg-pasar-yellow`)
- Navy bottom border (`border-b-4`)
- Height: 80px (h-20)
- Logo: 3xl font-black
- Slogan: xs font-semibold

### Product Cards
- White background
- Navy border (2px)
- Hard shadow
- Hover: lift up slightly, larger shadow
- If sold: gray overlay + "HABIS!" stamp

### "Habis!" Stamp
```
- Position: absolute, centered
- Transform: rotate(-12deg)
- bg-pasar-red
- text-white
- font-black text-3xl
- border-3 border-pasar-navy
- shadow-brutal
```

### Badges
- University: `bg-pasar-yellow border-2 border-pasar-navy`
- Condition: `bg-white border-2 border-pasar-navy`
- Fixed Price: `bg-pasar-yellow border-2 border-pasar-navy`

### Modals
- Backdrop: black/60 with blur
- Content: card-brutal styling
- Max width: 2xl
- Padding: 8 (32px)

## Terminology & Copywriting

### English → Bahasa Malaysia

| English | Bahasa | Usage |
|---------|--------|-------|
| Home | Tapak Pasar | Main page name |
| Products | Stalls | Product listings |
| Fresh Drops | Fresh Drops | New items section |
| Sold | Habis! | Item status |
| Sell Item | Jual Barang | Navigation button |
| Buy Now | Beli Sekarang | Purchase button |
| Fixed Price | Harga Tetap | Price type |
| Meet-up | COD (Cash on Delivery) | Transaction method |

### Voice & Tone
- **Casual Malaysian**: Use "guna", "nak", "tak", "je", "sahaja"
- **Friendly**: "Boleh COD area UM!", "Serious buyer je contact"
- **Direct**: "Harga fixed, jangan tawar ya!"
- **Honest**: Describe condition transparently

## Mascot: Tuxedo Cat (Cow Cat)

**Implementation:**
- Emoji combo: 🐈‍⬛ + 🤍
- Placement: Hero section, welcome card
- Character: Friendly, approachable, represents students

**Future:** Can be replaced with custom illustration

## Layout Patterns

### Grid System
- Container: `container mx-auto px-4 sm:px-6 lg:px-8`
- Product Grid: 1-2-3-4 columns (mobile to desktop)
- Gap: 6 (24px)

### Spacing
- Section margin-bottom: 12-16 (48-64px)
- Card padding: 6 (24px)
- Form spacing: 4-6 (16-24px)

## Interactive States

### Hover
- Cards: lift up slightly (`-translate-y-1`)
- Cards: larger shadow (`shadow-brutal-lg`)
- Buttons: slight color change
- Links: color to full opacity

### Active (Buttons)
- Move down-right: `translate-x-1 translate-y-1`
- Remove shadow: `shadow-none`
- Creates "pressed" effect

### Focus
- Ring: 2px navy (`focus:ring-2 focus:ring-pasar-navy`)
- Outline: none

### Disabled
- Opacity: 50%
- Cursor: not-allowed
- Grayscale

## Responsive Breakpoints

```
sm: 640px   - Small tablets
md: 768px   - Tablets
lg: 1024px  - Desktop
xl: 1280px  - Large desktop
```

## Accessibility

- High contrast (Navy on White/Yellow)
- Bold typography for readability
- Touch targets: minimum 44x44px
- Semantic HTML
- Alt text for images
- Keyboard navigation support

## Do's and Don'ts

### ✅ Do:
- Use bold fonts (700-900 weights)
- Use thick borders (2-3px)
- Use hard shadows (no blur)
- Use navy for borders and text
- Use yellow for primary actions
- Keep corners rounded (xl/lg)
- Write in casual Malaysian style
- Be direct and honest

### ❌ Don't:
- Use soft/blurred shadows
- Use thin borders (1px)
- Use light font weights
- Use gradients (except subtle ones)
- Use rounded buttons (use xl instead)
- Mix too many colors
- Use formal English

## Example Components

### Primary Button
```jsx
<button className="btn-brutal bg-pasar-navy text-pasar-yellow">
  BELI SEKARANG
</button>
```

### Secondary Button
```jsx
<button className="btn-brutal bg-pasar-yellow text-pasar-navy">
  Jual Barang
</button>
```

### Product Card
```jsx
<div className="card-brutal hover:shadow-brutal-lg hover:-translate-y-1">
  {/* Content */}
</div>
```

### University Badge
```jsx
<div className="px-3 py-1 bg-pasar-yellow rounded-lg border-2 border-pasar-navy">
  <span className="text-sm font-bold text-pasar-navy">UM</span>
</div>
```

### Section Heading
```jsx
<h2 className="text-3xl font-black text-pasar-navy mb-6">
  Fresh Drops 🔥
</h2>
```

---

This design system creates a bold, memorable, and distinctly Malaysian marketplace experience that stands out from generic e-commerce platforms.

