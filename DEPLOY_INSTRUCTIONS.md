# How to Deploy Smart Shopping to Netlify

Your project is 100% prepared and pre-built for Netlify with all 285 pages (products, categories, cart, payment, policies) compiled in the `out/` directory.

Choose whichever deployment method you prefer:

---

## Option 1: Instant Netlify Drop (Fastest - 30 Seconds, No CLI Needed)

1. Open your browser and go to: **[https://app.netlify.com/drop](https://app.netlify.com/drop)**
2. Drag and drop the folder:
   ```
   D:\shopping-website\out
   ```
3. Netlify will instantly upload and give you a live HTTPS URL (e.g. `https://smartshopping-xxx.netlify.app`).

---

## Option 2: Deploy via Netlify CLI

Open PowerShell in `D:\shopping-website` and run:

```powershell
# 1. Login to your Netlify account (opens a browser tab)
npx netlify login

# 2. Deploy directly to production
npx netlify deploy --prod --dir=out
```

When prompted:
- Select `Create & configure a new site`
- Choose your team name
- Choose a site name (e.g., `smart-shopping-india`)

Your site will be live immediately!

---

## Option 3: Continuous Deployment via GitHub

1. Create a new repository on GitHub (e.g., `smart-shopping`).
2. Run in PowerShell:
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/smart-shopping.git
   git branch -M main
   git push -u origin main
   ```
3. Go to **[Netlify Dashboard](https://app.netlify.com)** -> Click **Add new site** -> **Import an existing project** -> Select **GitHub**.
4. Netlify will automatically read `netlify.toml` and deploy your site on every push!
