# drewsartorius.com

Personal site for **Drew Sartorius**, built with [Astro](https://astro.build/) and deployed to **GitHub Pages** at [https://drewsartorius.com](https://drewsartorius.com).

## Local development

```bash
npm install
npm run dev
```

Optional: copy `.env.example` to `.env` and set `PUBLIC_RECAPTCHA_SITE_KEY` (the build also falls back to a committed default for convenience).

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

This repo uses **GitHub Actions** (`.github/workflows/deploy.yml`) to run `npm ci` and `npm run build`, then publishes the `dist` folder with `actions/deploy-pages`.

1. In the repository **Settings → Pages**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
2. On each push to `main`, the workflow builds and deploys.
3. **Optional:** In **Settings → Secrets and variables → Actions → Variables**, add `PUBLIC_RECAPTCHA_SITE_KEY` so CI uses your key without relying on the in-repo fallback.

Build-time environment variables:

| Variable | Purpose |
|----------|---------|
| `ASTRO_SITE` | Canonical site origin (default in workflow: `https://drewsartorius.com`) |
| `ASTRO_BASE` | Path prefix if hosted in a subpath (use `/` for apex custom domain) |
| `PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 **site** key (public) |

The reCAPTCHA **secret** key must be configured only in **Formspree** for each form, not in this repository.

## Custom domain & DNS

`public/CNAME` contains `drewsartorius.com`. In your DNS provider:

- **Apex (root):** A records to GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- **www:** CNAME to `<your-username>.github.io`

Then in the repo **Settings → Pages**, set the custom domain and wait for the DNS check. Enforce HTTPS once it is available.

Official reference: [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Forms & reCAPTCHA

- Main contact form posts to Formspree endpoint `xrervpbd`.
- The page at `/safe/` uses a separate Formspree endpoint (`mjgjdykn`) after passphrase unlock.
- reCAPTCHA v3: load the site key on the client, execute on submit, and send `g-recaptcha-response` with the POST (handled in `FormspreeForm.astro`). Formspree validates using the **secret** you saved in their dashboard. See [Formspree: Using reCAPTCHA v3](https://help.formspree.io/hc/en-us/articles/4411635023507-Using-reCAPTCHA-v3).

## `/safe` and SEO

- `public/robots.txt` disallows `/safe`.
- `public/sitemap.xml` lists only the homepage (not `/safe`).
- The main site does not link to `/safe`.
- The safe page sets `<meta name="robots" content="noindex, nofollow">`.

## Security note: client-side passphrase and encrypted messages

The `/safe` route checks the gate with a **SHA-256** digest in the browser, then decrypts **AES-256-GCM** blobs (key from **PBKDF2** with your passphrase). Plaintext messages are **not** stored in the repo; only base64-wrapped JSON ciphertext lives in `src/lib/safe-messages.ts`. After unlock, decrypted text is inserted as an **HTML comment** on `<html>`, immediately before `<head>` (right under the ASCII banner comment in source order; visible in DevTools), not as visible page content.

**Limits:** This still is not “real” security. Anyone who guesses or learns the passphrase can decrypt. Anyone who cracks the stored digest can try the same passphrase against the ciphertext. After a successful unlock, decrypted text is kept in **`sessionStorage`** for the tab session so you do not have to re-type the passphrase on every reload.

For true secrecy, use server-side auth or something like Cloudflare Access.

### Change the passphrase

1. Pick a new passphrase; compute SHA-256 hex (`echo -n 'YourPhrase' | shasum -a 256`).
2. Update `PASSPHRASE_DIGEST_HEX` in `src/pages/safe/index.astro`.
3. Re-encrypt all messages with the script below using the **new** `PASSPHRASE` and replace `ENCRYPTED_SAFE_MESSAGES` in `src/lib/safe-messages.ts`.

### Add or edit encrypted messages (local only)

Do **not** commit plaintext. From the project root:

```bash
PASSPHRASE='same passphrase as the gate' node scripts/encrypt-safe-messages.mjs "Your new message"
```

Paste the printed `export const ENCRYPTED_SAFE_MESSAGES = [...]` into `src/lib/safe-messages.ts` (or merge new lines into the array). Rebuild and deploy.

## Media placeholders

Replace gradient placeholders with real assets when ready:

- Hero: ~**2400×1350** (or 1920×1080) WebP
- Section: ~**1600×1000** WebP
- Optional muted hero video: **1920×1080**, short loop, compressed MP4/WebM
