# 🚀 Deployment Guide

## ⚠️ BLANK PAGE FIX

If you see a blank page after deploying, it's almost always **missing environment variables**.

**Quick Fix:**
1. Open browser console (F12 → Console tab)
2. Look for errors mentioning "Supabase" or "environment variables"
3. Add the environment variables in your hosting platform (see below)

---

## Environment Variables (REQUIRED)

You **MUST** add these two variables in your hosting platform for the site to work:

```
VITE_SUPABASE_URL=https://kjtumtcpjezbnhiwtocu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqdHVtdGNwamV6Ym5oaXd0b2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDkzMzQsImV4cCI6MjA3NTQyNTMzNH0.CLYAcy_lxy6CGOVmSDybmm8U8Qd7-DDZoRzFv0FHNfU
```

---

## Option 1: Vercel (Recommended - Easiest)

### Step-by-Step:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel auto-detects it's a Vite project ✓

3. **Add Environment Variables** (CRITICAL!)
   - Before clicking "Deploy", expand "Environment Variables"
   - Add both variables from above
   - OR add them later in: Settings → Environment Variables → Add

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live at `your-project.vercel.app`

### Files that make this work:
- `vercel.json` - Handles SPA routing
- `vite.config.ts` with `base: "./"` - Correct asset paths

---

## Option 2: Netlify

### Step-by-Step:

1. **Push to GitHub** (same as Vercel above)

2. **Deploy**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your repository

3. **Build Settings** (should auto-fill)
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variables** (CRITICAL!)
   - Click "Advanced" → "New variable"
   - Add both variables from above
   - OR add later in: Site settings → Environment variables

5. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes
   - Your site will be live at `your-project.netlify.app`

### Files that make this work:
- `_redirects` - Handles SPA routing
- `netlify.toml` - Additional Netlify config

---

## Option 3: GitHub Pages

### Step-by-Step:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Settings → Pages
   - Under "Source", select: **GitHub Actions**

3. **Add Secrets** (CRITICAL!)
   - Go to: Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Add BOTH variables:
     - Name: `VITE_SUPABASE_URL`
     - Value: `https://kjtumtcpjezbnhiwtocu.supabase.co`
   - Then add the second one:
     - Name: `VITE_SUPABASE_ANON_KEY`
     - Value: (the long JWT token from above)

4. **Trigger Deployment**
   - The workflow `.github/workflows/deploy.yml` runs automatically
   - Go to Actions tab to watch the deployment
   - Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Files that make this work:
- `.github/workflows/deploy.yml` - Auto-deployment workflow
- `.nojekyll` - Prevents Jekyll processing
- `base: "./"` in vite.config.ts - Relative paths for GitHub Pages

---

## Manual Deployment (Any Static Host)

If you want to deploy to **Cloudflare Pages**, **Firebase**, **AWS S3**, etc:

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Set environment variables before building:**
   ```bash
   export VITE_SUPABASE_URL=https://kjtumtcpjezbnhiwtocu.supabase.co
   export VITE_SUPABASE_ANON_KEY=your-key-here
   npm run build
   ```

3. **Upload the `dist` folder** to your hosting service

---

## Troubleshooting

### Problem: Blank white page

**Solution:**
1. Open browser console (F12)
2. Look for errors
3. Most likely: missing environment variables
4. Add them in your hosting platform and redeploy

### Problem: "Failed to fetch" errors

**Solution:**
- Environment variables are missing or incorrect
- Check you copied them exactly (no extra spaces)
- Redeploy after adding variables

### Problem: 404 on page refresh

**Solution:**
- Should be handled automatically by config files
- Check that `_redirects`, `vercel.json`, or `netlify.toml` exists in `dist/` folder
- Rebuild: `npm run build`

### Problem: Contact form doesn't work

**Solution:**
- Environment variables are definitely missing
- The app will show a friendly error message
- Add variables and redeploy

### Problem: Assets not loading (CSS/JS 404)

**Solution:**
- This is fixed by `base: "./"` in `vite.config.ts`
- Already configured correctly
- If still broken, rebuild: `npm run build`

---

## Verification Checklist

Before deploying, make sure:
- ✅ Code is pushed to GitHub
- ✅ Both environment variables are added in hosting platform
- ✅ Build command is `npm run build`
- ✅ Publish directory is `dist`
- ✅ Config files exist: `_redirects`, `vercel.json`, `.nojekyll`

After deploying:
- ✅ Site loads (not blank)
- ✅ No errors in browser console
- ✅ Navigation works
- ✅ Smooth scrolling works
- ✅ Contact form submits (if env vars are set)

---

## Need Help?

1. Check browser console for specific errors
2. Verify environment variables are set correctly
3. Try redeploying after adding variables
4. Make sure you're using the latest build

The app is now **gracefully degraded** - it will work even without environment variables, but the contact form will show a helpful error message.
