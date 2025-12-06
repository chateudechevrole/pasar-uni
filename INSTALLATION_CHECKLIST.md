# 📋 Installation Checklist

Use this checklist to ensure PasarUni is set up correctly.

## Pre-Installation ✅

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Supabase account created (free tier)
- [ ] Code editor ready (VS Code recommended)

## Installation Steps ✅

### 1. Install Dependencies
```bash
npm install
```
- [ ] Command runs without errors
- [ ] `node_modules/` folder created
- [ ] All packages installed (~500MB)

### 2. Supabase Setup
- [ ] New Supabase project created
- [ ] Project is "Active" status (not "Paused")
- [ ] Waited for project initialization (~2 min)

### 3. Database Schema
- [ ] Opened SQL Editor in Supabase
- [ ] Copied contents from `supabase/schema.sql`
- [ ] Pasted into SQL Editor
- [ ] Clicked "Run" successfully
- [ ] Saw "Success. No rows returned" message
- [ ] Verified tables in Table Editor:
  - [ ] `profiles` table exists
  - [ ] `items` table exists
  - [ ] `questions` table exists
  - [ ] `orders` table exists

### 4. Environment Variables
- [ ] Created `.env.local` file in project root
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Values copied from Supabase Settings → API
- [ ] No quotes around values
- [ ] No extra spaces

### 5. Start Development Server
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] Runs on `http://localhost:3000`
- [ ] Terminal shows "ready" message

## Verification Tests ✅

### Homepage (http://localhost:3000)
- [ ] Page loads successfully
- [ ] 8 items displayed in grid
- [ ] University filter buttons visible
- [ ] Category pills visible
- [ ] Clicking filters updates items
- [ ] Navbar shows logo and buttons
- [ ] Footer appears at bottom

### Item Detail Page
- [ ] Click any item card
- [ ] URL changes to `/items/item-X`
- [ ] Item images load
- [ ] Price displays in purple
- [ ] Seller information shows
- [ ] Public Q&A section visible
- [ ] Questions and answers display
- [ ] "Buy Now" button is purple

### QR Payment Modal
- [ ] Click "Buy Now" button
- [ ] Modal opens with dark backdrop
- [ ] QR code image displays
- [ ] Payment instructions show
- [ ] Upload button works
- [ ] File input accepts images
- [ ] Can close modal

### Sell Item Page (http://localhost:3000/sell)
- [ ] Page loads successfully
- [ ] All form fields present:
  - [ ] Photo upload area
  - [ ] Title input
  - [ ] Description textarea
  - [ ] Price input
  - [ ] Category dropdown
  - [ ] Condition buttons
  - [ ] University dropdown
- [ ] "AI Assist" button visible
- [ ] Can upload images
- [ ] Image previews appear
- [ ] Form validation works

### Profile Page (http://localhost:3000/profile)
- [ ] Page loads successfully
- [ ] User profile card shows
- [ ] Statistics display
- [ ] QR upload section present
- [ ] "My Listings" shows items
- [ ] All user's items appear

## Common Issues Checklist ✅

### If Homepage is Blank
- [ ] Check browser console (F12) for errors
- [ ] Verify `.env.local` exists and has correct values
- [ ] Restart dev server (`Ctrl+C`, then `npm run dev`)
- [ ] Check Supabase project is not paused

### If Images Don't Load
- [ ] Internet connection active
- [ ] Images are from Unsplash (external)
- [ ] Browser allows external images
- [ ] No ad blocker interfering

### If TypeScript Errors Appear
- [ ] Run `npm install` first
- [ ] Check `node_modules/` exists
- [ ] Try deleting `node_modules/` and reinstalling
- [ ] Restart VS Code

### If Supabase Connection Fails
- [ ] `.env.local` file in root directory (not in subdirectory)
- [ ] URL starts with `https://`
- [ ] API key is the "anon public" key (not service role)
- [ ] No typos in environment variable names
- [ ] Server restarted after adding `.env.local`

## Browser Testing ✅

Test in these browsers:
- [ ] Chrome/Edge (recommended)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browser

## Responsive Testing ✅

- [ ] Desktop view (1920x1080)
- [ ] Tablet view (768x1024)
- [ ] Mobile view (375x667)
- [ ] Can toggle with browser DevTools

## Feature Testing ✅

### Filters
- [ ] University filter changes items
- [ ] Category filter changes items
- [ ] "All" shows all items
- [ ] Combining filters works
- [ ] Result count updates

### Navigation
- [ ] Clicking logo goes to homepage
- [ ] "Sell Item" button goes to `/sell`
- [ ] "Profile" button goes to `/profile`
- [ ] Back button works
- [ ] URL routing correct

### Item Cards
- [ ] Show correct information
- [ ] Hover effect works
- [ ] Click opens detail page
- [ ] SOLD items show overlay
- [ ] RESERVED items show overlay
- [ ] Verified badge appears on sellers

### Public Q&A
- [ ] Can type question
- [ ] Questions display correctly
- [ ] Replies show in blue box
- [ ] Timestamps show
- [ ] Seller badge on replies
- [ ] Anonymous option works

## Performance Checks ✅

- [ ] Page loads in < 2 seconds
- [ ] Images load smoothly
- [ ] No console errors (F12)
- [ ] Smooth animations
- [ ] Filters respond instantly
- [ ] Forms feel responsive

## Final Verification ✅

- [ ] All pages accessible
- [ ] All features work
- [ ] No critical errors
- [ ] UI looks polished
- [ ] Ready for development
- [ ] Ready to add real auth
- [ ] Ready to deploy

## Documentation Reviewed ✅

- [ ] Read `README.md` - Project overview
- [ ] Read `QUICKSTART.md` - Fast setup
- [ ] Read `SETUP.md` - Detailed guide
- [ ] Skimmed `FEATURES.md` - Feature docs
- [ ] Understand project structure

## Next Steps After Verification ✅

1. **Customize:**
   - [ ] Update university list (if needed)
   - [ ] Modify color scheme (optional)
   - [ ] Add your own logo

2. **Develop:**
   - [ ] Enable real authentication
   - [ ] Connect to real Supabase data
   - [ ] Add more features

3. **Deploy:**
   - [ ] Build production version
   - [ ] Deploy to Vercel
   - [ ] Set production env vars

---

## Status

Date: ___________

Installation Status: ⬜ Not Started | ⬜ In Progress | ⬜ **Complete**

Issues Encountered: ___________________________________

Resolution: _________________________________________

---

If all checkboxes are ticked ✅, you're ready to build amazing features!

**Congratulations! PasarUni is ready to serve Malaysian students!** 🎉

