# ⚡ Quick Start Guide

Get PasarUni running in 5 minutes!

## 🚀 Installation (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.local.example .env.local

# 3. Edit .env.local with your Supabase credentials
# (Get these from supabase.com after creating a project)
```

## 🗄️ Database Setup (2 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (wait ~2 min for setup)
3. Go to SQL Editor → New Query
4. Copy all contents from `supabase/schema.sql`
5. Paste and click "Run" ✅

## 🔑 Get Your API Keys (1 minute)

1. In Supabase: Settings → API
2. Copy **Project URL** → paste in `.env.local`
3. Copy **anon public key** → paste in `.env.local`

Your `.env.local` should look like:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

## ▶️ Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## ✅ Verify It Works

- ✅ Homepage loads with 8 sample items
- ✅ Click any item → detail page works
- ✅ Click "Buy Now" → QR modal appears
- ✅ Visit `/sell` → form loads
- ✅ Visit `/profile` → profile page loads

## 🎯 Next Steps

1. **Explore the mock data:** Browse items, test filters
2. **Check the QR flow:** Click "Buy Now" on any item
3. **Test the sell form:** Upload images, fill details
4. **Read full docs:** See `README.md` and `FEATURES.md`

## 🐛 Common Issues

**Error: "Cannot find module 'next'"**
→ Run `npm install` first

**Blank page or connection error**
→ Check `.env.local` has correct Supabase URL and key

**Images not loading**
→ Normal! Mock data uses external URLs, needs internet

**TypeScript errors in editor**
→ Normal! Will go away after `npm install`

## 📚 Documentation

- `README.md` - Full project overview
- `SETUP.md` - Detailed setup guide
- `FEATURES.md` - Complete feature documentation
- `supabase/schema.sql` - Database schema

## 💡 Tips

- Mock data is in `lib/mockData.ts` - realistic Malaysian university items!
- All pages work without authentication (using mock user)
- No real payments - it's all simulated for demo
- Beautiful UI out of the box - no setup needed!

---

**Need help?** Read `SETUP.md` for detailed instructions.

**Ready to deploy?** See deployment section in `README.md`.

