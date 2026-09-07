# Outreach Kit Generator — Deployment Guide

This is a small website: a form (`public/index.html`) plus one secure backend
function (`api/generate.js`) that calls the Anthropic API on your behalf. Your
API key lives only on the server — it's never visible to visitors.

## What you need before starting
- A free [Vercel](https://vercel.com) account (sign up with GitHub, Google, or email)
- An Anthropic API key from [console.anthropic.com](https://console.anthropic.com) → **Get API Keys**
  (this is separate from your claude.ai account — you'll need to add billing there,
  and each generation costs a small fraction of a cent)
- Node.js installed on your computer (to use the Vercel CLI) — or you can deploy
  straight from the Vercel dashboard without installing anything, see Option B below

---

## Option A — Deploy with the Vercel CLI (recommended)

1. **Install the Vercel CLI** (one-time):
   ```
   npm install -g vercel
   ```

2. **Log in**:
   ```
   vercel login
   ```

3. **From inside this project folder, deploy**:
   ```
   vercel
   ```
   Follow the prompts (accept the defaults). This gives you a live URL like
   `https://outreach-kit-generator-yourname.vercel.app`.

4. **Add your environment variables** (your API key and a shared access code
   for gating — pick any password-like string for the access code):
   ```
   vercel env add ANTHROPIC_API_KEY
   vercel env add ACCESS_CODE
   ```
   Paste the values when prompted. Choose "Production" (and Preview/Development
   too, if you want to test locally).

5. **Redeploy so the new environment variables take effect**:
   ```
   vercel --prod
   ```

Your tool is now live at your `.vercel.app` URL (or a custom domain — see below).

---

## Option B — Deploy from the Vercel dashboard (no CLI)

1. Push this folder to a new GitHub repository (or use Vercel's "drag and drop
   folder" import if offered).
2. On [vercel.com](https://vercel.com), click **Add New → Project**, and import
   the repository.
3. Before the first deploy, go to **Settings → Environment Variables** and add:
   - `ANTHROPIC_API_KEY` = your key from the Anthropic console
   - `ACCESS_CODE` = any password you choose, e.g. `CAS2026`
4. Click **Deploy**.

---

## Connecting it to your product

- **Landing page link**: point a button on your sales page (Gumroad, Payhippo,
  etc.) to your live Vercel URL — e.g. "Access your Outreach Kit Generator".
- **Access code delivery**: in Gumroad, add the access code to the automatic
  "content delivered after purchase" message, alongside your PDF download.
  Buyers paste this code into the tool before generating.
- **Custom domain (optional)**: in Vercel → Settings → Domains, you can point
  a domain you own (or a free subdomain) to this project instead of the
  default `.vercel.app` address.

## Changing the access code later
If your code ever leaks or you want to rotate it, just update the
`ACCESS_CODE` environment variable in Vercel and redeploy — no code changes
needed.

## Cost control
Each generation makes one API call. To keep costs predictable:
- The backend already limits input length per request.
- Consider rotating the `ACCESS_CODE` periodically, or issuing a unique code
  per buyer if you want per-customer usage limits later (this starter uses one
  shared code for simplicity).

## Local testing (optional)
```
vercel dev
```
This runs the site locally with your environment variables, so you can test
before deploying.
