# PasarUni Project Structure

Visual guide to understanding the codebase organization.

## 📁 Directory Tree

```
pasar-uni-web/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies & scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── next.config.js            # Next.js configuration
│   ├── .gitignore                # Git ignore rules
│   └── .env.local.example        # Environment variables template
│
├── 📘 Documentation
│   ├── README.md                 # Project overview
│   ├── QUICKSTART.md             # 5-minute setup guide
│   ├── SETUP.md                  # Detailed setup instructions
│   ├── FEATURES.md               # Feature documentation
│   └── PROJECT_STRUCTURE.md      # This file!
│
├── 📱 app/ (Next.js App Router)
│   ├── layout.tsx                # Root layout with Navbar & Footer
│   ├── page.tsx                  # Homepage (/)
│   ├── globals.css               # Global styles & Tailwind imports
│   │
│   ├── items/
│   │   └── [id]/
│   │       └── page.tsx          # Product detail (/items/[id])
│   │
│   ├── sell/
│   │   └── page.tsx              # Sell item form (/sell)
│   │
│   └── profile/
│       └── page.tsx              # User profile (/profile)
│
├── 🧩 components/
│   ├── Navbar.tsx                # Top navigation bar
│   ├── Footer.tsx                # Bottom footer
│   ├── ItemCard.tsx              # Product card component
│   ├── BuyNowModal.tsx           # QR payment modal
│   │
│   └── ui/                       # Base UI components
│       ├── Button.tsx            # Button with variants
│       ├── Card.tsx              # Card container
│       ├── Badge.tsx             # Badge with variants
│       ├── Input.tsx             # Text input field
│       └── Modal.tsx             # Modal/dialog component
│
├── 🔧 lib/
│   ├── supabase.ts               # Supabase client setup
│   ├── database.types.ts         # TypeScript types for DB
│   ├── mockData.ts               # Development mock data
│   └── utils.ts                  # Utility functions (cn, formatPrice, etc.)
│
├── 🗄️ supabase/
│   └── schema.sql                # Complete database schema
│
└── 🌐 public/
    └── qr-codes/
        └── placeholder-qr.svg    # Sample QR code image
```

## 🗺️ Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        HOMEPAGE (/)                         │
│  • University filters                                        │
│  • Category pills                                           │
│  • Item grid with cards                                     │
└─────────────┬───────────────────────────────────────────────┘
              │
              │ Click item
              ↓
┌─────────────────────────────────────────────────────────────┐
│                   ITEM DETAIL (/items/[id])                 │
│  • Image gallery                                            │
│  • Price & description                                      │
│  • Seller info                                              │
│  • Public Q&A section                                       │
│  • Buy Now button                                           │
└─────────────┬───────────────────────────────────────────────┘
              │
              │ Click "Buy Now"
              ↓
┌─────────────────────────────────────────────────────────────┐
│                    BUY NOW MODAL                            │
│  • Shows seller's QR code                                   │
│  • Payment instructions                                     │
│  • Upload payment proof                                     │
│  • Submit → Item marked RESERVED                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     SELL ITEM (/sell)                       │
│  • Upload photos (max 5)                                    │
│  • Fill item details                                        │
│  • Set fixed price                                          │
│  • ⚠️ Validates QR code is set up                          │
│  • Submit → Item appears on homepage                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    PROFILE (/profile)                       │
│  • View/edit profile info                                   │
│  • Upload payment QR code                                   │
│  • View statistics                                          │
│  • Manage listings                                          │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Component Hierarchy

```
App
└── RootLayout
    ├── Navbar
    │   ├── Logo
    │   ├── Search Input
    │   └── Buttons (Sell, Profile)
    │
    ├── Page Content
    │   │
    │   ├── Homepage
    │   │   ├── Hero Section
    │   │   ├── University Filter Buttons
    │   │   ├── Category Pills
    │   │   └── ItemCard Grid
    │   │       └── ItemCard (×8)
    │   │
    │   ├── Item Detail Page
    │   │   ├── Image Gallery
    │   │   ├── Product Info Card
    │   │   ├── Seller Card
    │   │   ├── Buy Button
    │   │   └── Q&A Section
    │   │       ├── Ask Question Form
    │   │       └── Question List
    │   │
    │   ├── Sell Page
    │   │   ├── Photo Upload Grid
    │   │   ├── Form Fields
    │   │   │   ├── Title Input
    │   │   │   ├── Description Textarea
    │   │   │   ├── Price Input
    │   │   │   ├── Category Select
    │   │   │   ├── Condition Buttons
    │   │   │   └── University Select
    │   │   └── Submit Button
    │   │
    │   └── Profile Page
    │       ├── Profile Card
    │       ├── Stats Card
    │       ├── QR Upload Card
    │       └── My Listings Card
    │
    └── Footer
        ├── Brand Section
        ├── Quick Links
        ├── Support Links
        └── Social Icons

Modals (Overlays)
└── BuyNowModal
    ├── Instructions
    ├── QR Code Display
    ├── Upload Section
    └── Submit Button
```

## 🎯 Data Flow

```
┌─────────────────┐
│   Mock Data     │ (Development)
│  mockData.ts    │
└────────┬────────┘
         │
         │ Provides realistic items, users, Q&A
         ↓
┌─────────────────┐
│     Pages       │
│  page.tsx       │
└────────┬────────┘
         │
         │ Pass data as props
         ↓
┌─────────────────┐
│   Components    │
│  ItemCard, etc. │
└────────┬────────┘
         │
         │ Render UI
         ↓
┌─────────────────┐
│   User sees     │
│   interface     │
└─────────────────┘

For Production:
┌─────────────────┐
│    Supabase     │
│   PostgreSQL    │
└────────┬────────┘
         │
         │ API calls via supabase.ts
         ↓
┌─────────────────┐
│  Next.js App    │
└─────────────────┘
```

## 🗃️ Database Schema Overview

```
┌──────────────┐
│   profiles   │
├──────────────┤
│ • id         │──┐
│ • username   │  │
│ • university │  │
│ • payment_qr │  │
└──────────────┘  │
                  │
                  │ Foreign Key
                  │
┌──────────────┐  │
│    items     │◄─┘
├──────────────┤
│ • id         │──┐
│ • seller_id  │  │
│ • title      │  │
│ • price      │  │
│ • images[]   │  │
│ • status     │  │
└──────────────┘  │
                  │
                  │ Foreign Key
                  ↓
┌──────────────┐
│  questions   │
├──────────────┤
│ • id         │
│ • item_id    │
│ • content    │
│ • reply      │
└──────────────┘

┌──────────────┐
│   orders     │
├──────────────┤
│ • id         │
│ • buyer_id   │
│ • seller_id  │
│ • item_id    │
│ • status     │
│ • proof_url  │
└──────────────┘
```

## 🎨 Styling Architecture

```
┌────────────────────────────────────────┐
│         globals.css                    │
│  • Tailwind directives                 │
│  • Google Fonts import                 │
│  • CSS variables                       │
└──────────┬─────────────────────────────┘
           │
           ↓
┌────────────────────────────────────────┐
│      tailwind.config.ts                │
│  • Color system                        │
│  • Font family                         │
│  • Custom utilities                    │
└──────────┬─────────────────────────────┘
           │
           ↓
┌────────────────────────────────────────┐
│       UI Components                    │
│  • Button variants                     │
│  • Badge variants                      │
│  • Card styles                         │
└──────────┬─────────────────────────────┘
           │
           ↓
┌────────────────────────────────────────┐
│      Page Components                   │
│  • Compose UI components               │
│  • Apply layout                        │
│  • Add interactions                    │
└────────────────────────────────────────┘
```

## 🔐 Security Layers

```
┌─────────────────────────────────────────┐
│         Row Level Security (RLS)        │
│  • Defined in schema.sql                │
│  • Enforced by Supabase                 │
└──────────┬──────────────────────────────┘
           │
           ↓
┌─────────────────────────────────────────┐
│         Authentication Layer            │
│  • Supabase Auth (future)               │
│  • Session management                   │
└──────────┬──────────────────────────────┘
           │
           ↓
┌─────────────────────────────────────────┐
│         Application Logic               │
│  • Form validation                      │
│  • QR code validation                   │
│  • Status checks                        │
└─────────────────────────────────────────┘
```

## 🚀 Build Process

```
Source Code (TypeScript + JSX)
        ↓
   TypeScript Compiler
        ↓
   Next.js Compiler
        ↓
   Tailwind CSS Processing
        ↓
   Optimized Bundle
        ↓
   Static/Server Pages
        ↓
   Production Ready
```

## 📦 Key Dependencies

```
Next.js 14        → Framework
React 18          → UI library
TypeScript        → Type safety
Tailwind CSS      → Styling
Supabase          → Backend
Lucide React      → Icons
```

## 🎯 File Naming Conventions

- **Pages:** `page.tsx` (Next.js App Router convention)
- **Components:** PascalCase (e.g., `ItemCard.tsx`)
- **Utilities:** camelCase (e.g., `utils.ts`)
- **Types:** `database.types.ts`
- **Config:** kebab-case (e.g., `tailwind.config.ts`)

## 💡 Development Tips

1. **Start with homepage:** See all items and filters
2. **Check mock data:** Realistic Malaysian university items
3. **Test QR flow:** Core feature of the platform
4. **Modify colors:** Update `tailwind.config.ts`
5. **Add features:** Follow existing patterns

---

This structure is designed for **scalability** and **maintainability**. Each component has a single responsibility, making it easy to extend and modify.

