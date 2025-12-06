# 📤 GitHub Upload Guide for PasarUni

## ✅ Pre-Upload Checklist

All emojis have been replaced with proper Lucide React icons:
- ✅ Homepage (Store, Flag, Flame, Package icons)
- ✅ Item Detail Page (GraduationCap, MessageCircle icons)
- ✅ Profile Page (School, CreditCard icons)
- ✅ Sell Page (DollarSign icon)
- ✅ Navbar & Login (Store, Flag icons)
- ✅ Footer (text only)
- ✅ .gitignore exists and configured

## 🚀 Upload Steps

### Step 1: Initialize Git Repository

Open your terminal in the project directory and run:

```bash
cd "/Users/yuanping/pasar uni web"
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: PasarUni Student Marketplace

- Complete marketplace platform for Malaysian students
- Features: Item listings, Q&A, bank transfer payments
- Tech: Next.js 14, TypeScript, Supabase, Tailwind CSS
- UI: Neo-brutalism design with Lucide icons"
```

### Step 4: Create GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `pasar-uni` or `pasaruni-marketplace`
3. Description: "Student marketplace platform for Malaysian universities"
4. Choose **Public** or **Private**
5. **Do NOT** initialize with README, .gitignore, or license (we already have them)
6. Click **Create repository**

### Step 5: Connect to GitHub

After creating the repo, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual values.

### Example:
```bash
git remote add origin https://github.com/johndoe/pasar-uni.git
git branch -M main
git push -u origin main
```

## 🔐 Important: Environment Variables

### ⚠️ NEVER commit your .env files!

Your `.gitignore` already excludes:
- `.env`
- `.env.local`
- `.env*.local`

### For GitHub Repository Settings:

Add these instructions to your README for other developers:

```markdown
## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project dashboard.
```

## 📋 Post-Upload Tasks

### 1. Add Repository Topics (on GitHub)
Click "About" gear icon and add topics:
- `nextjs`
- `typescript`
- `supabase`
- `marketplace`
- `student`
- `malaysia`
- `tailwindcss`

### 2. Create GitHub Issues for Future Features
- Implement saved items functionality
- Add view tracking
- Create notifications page
- Add seller reply UI for Q&A

### 3. Add Deployment Instructions

If using Vercel:
1. Import your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

## 🎯 Recommended GitHub Repository Settings

### Branch Protection
1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews
   - Require status checks to pass

### GitHub Actions (Optional)
Create `.github/workflows/ci.yml` for automated testing:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm run build
```

## 📝 Commit Message Convention

Use conventional commits for better changelog:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Examples:
```bash
git commit -m "feat: add saved items functionality"
git commit -m "fix: resolve bank account validation issue"
git commit -m "docs: update installation guide"
```

## 🔄 Future Updates Workflow

```bash
# Make changes to your code
git add .
git commit -m "feat: your feature description"
git push origin main
```

## ❓ Common Issues

### Issue: "remote origin already exists"
```bash
git remote remove origin
git remote add origin YOUR_NEW_URL
```

### Issue: "Authentication failed"
- Use GitHub Personal Access Token instead of password
- Generate at: Settings → Developer settings → Personal access tokens

### Issue: Large files error
```bash
# Check file sizes
git ls-files -s | awk '{print $4, $2}' | sort -n -r | head -20

# Remove from git if needed
git rm --cached large-file.zip
```

## ✨ Your Repository is Ready!

Once uploaded, your repository will contain:
- ✅ Clean, professional codebase
- ✅ Proper icon usage (no emojis)
- ✅ Complete documentation
- ✅ TypeScript types
- ✅ Tailwind CSS styling
- ✅ Supabase integration
- ✅ Modern Next.js 14 structure

## 🌐 Share Your Project

Add these badges to your README:

```markdown
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Enabled-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-cyan)
```

---

**Good luck with your project! 🚀**
