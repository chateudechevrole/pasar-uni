# ⚡ PasarUni Neo-Brutalism - Quick Reference

## 🎨 Design Tokens

### Colors
```css
--pasar-yellow: #FACC15  /* Primary actions */
--pasar-navy:   #312E81  /* Borders, text */
--pasar-cream:  #FAFAF9  /* Background */
--pasar-red:    #DC2626  /* Habis stamp */
```

### Shadows
```css
shadow-brutal:    4px 4px 0px 0px navy
shadow-brutal-sm: 2px 2px 0px 0px navy
shadow-brutal-lg: 6px 6px 0px 0px navy
```

### Typography
```
Headings:  font-black (900)
Buttons:   font-bold (700)
Body:      font-semibold (600)
Support:   font-medium (500)
```

## 🧩 Component Classes

### Button
```jsx
<button className="btn-brutal bg-pasar-navy text-pasar-yellow">
  Text
</button>
```

### Card
```jsx
<div className="card-brutal p-6">
  Content
</div>
```

### Badge
```jsx
<div className="px-3 py-1 bg-pasar-yellow rounded-lg border-2 border-pasar-navy">
  <span className="text-sm font-bold text-pasar-navy">UM</span>
</div>
```

### Habis Stamp (on sold items)
```jsx
{item.status === 'SOLD' && (
  <>
    <div className="absolute inset-0 bg-black/40" />
    <div className="habis-stamp">HABIS!</div>
  </>
)}
```

## 📝 Terminology

```
Home → Tapak Pasar
Products → Stalls
New Items → Fresh Drops 🔥
Sold → HABIS!
Buy Now → BELI SEKARANG
Sell Item → Jual Barang
Public Q&A → Soalan Awam
Fixed Price → Harga Tetap
```

## 🎯 Key Pages

```
/              → Tapak Pasar (Homepage)
/items/[id]    → Product Detail
/sell          → Jual Barang
/profile       → User Profile
```

## 🇲🇾 Writing Style

**Do:**
- "Guna", "nak", "tak", "je", "boleh"
- "COD area UM sahaja"
- "Serious buyer je contact"
- "Harga fixed, jangan tawar ya!"

**Don't:**
- Formal English
- Generic descriptions
- Corporate language

## 🚀 To Run

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

## 📚 Documentation

- `DESIGN_GUIDE.md` - Full design system
- `REDESIGN_SHOWCASE.md` - Visual showcase
- `NEO_BRUTALISM_REDESIGN.md` - Implementation notes
- `README.md` - Project overview

---

**Remember:** Bold, honest, Malaysian! 🇲🇾

