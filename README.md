# PasarUni - University Student Marketplace

A modern, commission-free marketplace for Malaysian university students. Buy and sell items with **fixed prices**, **public Q&A**, and **direct QR payments**.

## 🌟 Core Features

- **No Bargaining** - All prices are fixed
- **No Private Chat** - Communication happens via public Q&A only
- **Direct QR Payments** - Buyers pay sellers directly using DuitNow/TNG QR codes
- **0% Commission** - Platform takes no cut from transactions
- **University-Focused** - Filter items by your university

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom Shadcn-inspired components
- **Icons:** Lucide React
- **Backend:** Supabase (PostgreSQL, Auth, Storage)

## 📦 Project Structure

```
pasar-uni-web/
├── app/                    # Next.js App Router pages
│   ├── items/[id]/        # Product detail page
│   ├── sell/              # Sell item page
│   ├── profile/           # User profile page
│   ├── layout.tsx         # Root layout with Navbar & Footer
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/                # Base UI components (Button, Card, etc.)
│   ├── BuyNowModal.tsx    # QR payment modal
│   ├── ItemCard.tsx       # Product card component
│   ├── Navbar.tsx         # Navigation bar
│   └── Footer.tsx         # Footer
├── lib/                   # Utilities and configurations
│   ├── supabase.ts        # Supabase client
│   ├── database.types.ts  # TypeScript types for DB
│   ├── mockData.ts        # Mock data for development
│   └── utils.ts           # Helper functions
├── supabase/              # Database configuration
│   └── schema.sql         # Database schema
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Supabase account (free tier works)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd pasar-uni-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the schema from `supabase/schema.sql`
   - Get your project URL and anon key from Project Settings > API

4. **Configure environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## 📊 Database Schema

### Tables

- **profiles** - User profiles with payment QR codes
- **items** - Listed products with images, pricing, and status
- **questions** - Public Q&A for each item
- **orders** - Order records with payment proof

See `supabase/schema.sql` for the complete schema with Row Level Security policies.

## 🎨 Design System

### Colors

- **Primary (Indigo/Purple):** `bg-indigo-600` - Buy buttons, main actions
- **Secondary (Golden Yellow):** `bg-yellow-400` - Public Q&A button
- **Background:** `bg-slate-50` for app, white for cards
- **Text:** Slate color scale for hierarchy

### Typography

- Font: Inter (clean, modern, excellent readability)
- Headings: Bold weights (600-800)
- Body: Regular (400) and Medium (500)

## 🔑 Key Pages & Features

### Homepage (`/`)
- University and category filters
- Grid of item cards with condition badges
- Real-time filtering

### Product Detail (`/items/[id]`)
- Image gallery with thumbnails
- Fixed price display
- Seller information with verified badge
- Public Q&A section (ask questions, view answers)
- "Buy Now" button triggers QR payment modal

### Sell Item (`/sell`)
- Image upload (up to 5 photos)
- Form validation
- AI Assist button (mockup for description help)
- **Validation:** Requires user to have payment QR code set up

### Profile (`/profile`)
- Edit profile information
- Upload/update DuitNow/TNG QR code
- View listing statistics
- Manage all listed items

### QR Payment Flow
1. User clicks "Buy Now"
2. Modal displays seller's QR code
3. Buyer scans and pays via DuitNow/TNG
4. Buyer uploads payment proof screenshot
5. Item marked as "Reserved"
6. Seller notified to confirm payment

## 🧪 Mock Data

The app includes realistic mock data in `lib/mockData.ts`:
- 4 university students (UM, USM, UTAR, UKM)
- 8 items (textbooks, electronics, furniture, etc.)
- Sample Q&A conversations

This allows you to see the full UI immediately without setting up real data.

## 🔐 Security Features

- Row Level Security (RLS) policies on all tables
- Users can only edit their own profiles and items
- Public Q&A - anyone can ask, only sellers can reply
- Payment QR codes are private until checkout

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Touch-friendly buttons and interactions
- Optimized image loading with Next.js Image component

## 🚧 Future Enhancements

- [ ] Real authentication (email/password, social login)
- [ ] Real-time notifications using Supabase Realtime
- [ ] Image optimization and CDN integration
- [ ] AI-powered description writer
- [ ] User ratings and reviews
- [ ] Report/flag system for safety
- [ ] Email notifications for orders
- [ ] Search functionality with Algolia or similar
- [ ] Analytics dashboard for sellers

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- Supabase for the backend infrastructure
- Shadcn for UI component inspiration
- The Malaysian student community

---

**Built with ❤️ for Malaysian university students**

# pasar-uni
