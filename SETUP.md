# Setup Guide for PasarUni

This guide will help you get PasarUni up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Sign up for free](https://supabase.com)

## Step-by-Step Setup

### 1. Install Dependencies

First, install all required packages:

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Supabase client
- Lucide React icons
- Utility libraries (clsx, tailwind-merge, class-variance-authority)

### 2. Set Up Supabase

#### Create a New Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose an organization (or create one)
4. Fill in project details:
   - **Name:** PasarUni (or your preferred name)
   - **Database Password:** Choose a strong password (save this!)
   - **Region:** Singapore (closest to Malaysia)
5. Wait for the project to be created (~2 minutes)

#### Run the Database Schema

1. In your Supabase project dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste it into the SQL Editor
5. Click "Run" (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned" - this means your tables are created!

#### Get Your API Keys

1. In your Supabase project, go to **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. You'll see two important values:
   - **Project URL** - Copy this
   - **anon public** key - Copy this (it's in the "Project API keys" section)

### 3. Configure Environment Variables

1. In the project root, find `.env.local.example`
2. Create a new file called `.env.local` (copy the example):

```bash
cp .env.local.example .env.local
```

3. Open `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **Important:** Never commit `.env.local` to Git! It's already in `.gitignore`.

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

You should see:

```
▲ Next.js 14.2.5
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000
```

### 5. Open the Application

1. Open your browser
2. Navigate to [http://localhost:3000](http://localhost:3000)
3. You should see the PasarUni homepage with mock data!

## Verify Everything Works

### Check the Homepage
- ✅ You should see 8 items displayed in a grid
- ✅ University filters should work
- ✅ Category pills should filter items

### Check Item Detail Page
- ✅ Click on any item
- ✅ You should see the full item details
- ✅ Public Q&A section should be visible
- ✅ Click "Buy Now" to see the QR payment modal

### Check Sell Page
- ✅ Navigate to `/sell` or click "Sell Item" in navbar
- ✅ Form should load with all fields
- ✅ Try uploading images

### Check Profile Page
- ✅ Navigate to `/profile` or click "Profile" in navbar
- ✅ You should see the user profile with stats
- ✅ You can upload a QR code

## Common Issues & Solutions

### Issue: "Cannot find module 'next'"
**Solution:** Run `npm install` - dependencies aren't installed yet.

### Issue: Supabase connection error
**Solution:** 
1. Check your `.env.local` file exists
2. Verify the URL and API key are correct
3. Restart the dev server after changing `.env.local`

### Issue: Images not loading
**Solution:** The mock data uses external images from Unsplash. Ensure you have internet connection.

### Issue: TypeScript errors
**Solution:** These should go away after `npm install`. If they persist, try:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## Next Steps

### Enable Real Authentication

1. In Supabase Dashboard, go to **Authentication** > **Providers**
2. Enable Email provider (or others like Google, GitHub)
3. Configure email templates if needed
4. Implement auth in the app (currently using mock data)

### Upload Real Images

1. In Supabase Dashboard, go to **Storage**
2. Create a new bucket called `item-images`
3. Set it to public
4. Update the image upload logic in `/sell` page

### Enable Real-time Features

Supabase Realtime can notify sellers when someone asks a question or makes a purchase. This requires subscribing to database changes.

### Deploy to Production

Once you're ready, deploy to Vercel:

```bash
npm run build
```

Then push to GitHub and connect to Vercel, or use Vercel CLI:

```bash
npx vercel
```

Don't forget to set environment variables in Vercel's project settings!

## Project Structure Overview

```
pasar-uni-web/
├── app/                  # Next.js pages (App Router)
│   ├── items/[id]/      # Dynamic item detail page
│   ├── sell/            # Sell item page
│   ├── profile/         # User profile page
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── ui/              # Base UI components
│   └── ...              # Feature components
├── lib/                 # Utilities
│   ├── supabase.ts      # Supabase client
│   ├── mockData.ts      # Development data
│   └── utils.ts         # Helper functions
├── supabase/            # Database
│   └── schema.sql       # Database schema
└── public/              # Static files
```

## Support

If you encounter any issues:

1. Check this guide again carefully
2. Look at the main README.md for more context
3. Check the Supabase dashboard for any errors
4. Ensure all environment variables are set correctly

---

Happy coding! 🚀

