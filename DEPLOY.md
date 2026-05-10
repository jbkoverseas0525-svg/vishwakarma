# Deploying Vishwakarma TechnoEnergy to `vishwakarmatechnoenergy.com`

The project is preconfigured for **Vercel** (free, automatic HTTPS, global CDN). Total time: ~5 minutes.

---

## 1 · Install Vercel CLI (one-time)

```bash
npm install -g vercel
```

## 2 · Deploy (from this folder)

```bash
cd /Users/mayankagrawal/Desktop/JBK/vishwakarma-technoenergy
vercel login          # opens browser → sign in with Google / GitHub / email
vercel --prod         # first run: accept defaults (project name, scope, etc.)
```

When it finishes you get a live URL like `https://vishwakarma-technoenergy-xxxx.vercel.app`.
Test the whole site there — Home, About, Contact, Quote, Catalog download. Everything should work.

## 3 · Attach your domain `vishwakarmatechnoenergy.com`

```bash
vercel domains add vishwakarmatechnoenergy.com
vercel domains add www.vishwakarmatechnoenergy.com
```

Vercel prints DNS records. Log into your domain registrar (GoDaddy / Namecheap / BigRock / Hostinger / wherever you bought vishwakarmatechnoenergy.com) and add these:

| Type  | Host / Name | Value                | TTL  |
| ----- | ----------- | -------------------- | ---- |
| A     | @           | 76.76.21.21          | Auto |
| CNAME | www         | cname.vercel-dns.com | Auto |

Save. DNS propagation: 5–30 min. Vercel auto-issues an SSL cert when DNS lands.

## 4 · Verify on `https://vishwakarmatechnoenergy.com`

- Open the site (HTTPS padlock should appear)
- Test: `/about`, `/contact`, `/quote`, `/CATALOG.pdf`, `/robots.txt`, `/sitemap.xml`
- Reload any deep link (e.g. `/quote`) — it should work, not 404 (the `vercel.json` rewrites handle this)

## 5 · Google Search Console (SEO)

1. Go to https://search.google.com/search-console
2. Add property → `https://vishwakarmatechnoenergy.com`
3. Verify via HTML tag or DNS
4. **Sitemaps** → submit `sitemap.xml`
5. **URL Inspection** → request indexing for `/`, `/about`, `/contact`, `/quote`

## 6 · Google Business Profile (local SEO — huge for Ahmedabad searches)

1. Go to https://business.google.com
2. Create profile: name "Vishwakarma TechnoEnergy", category "Engine Manufacturer" or "Machinery Supplier"
3. Use the verified address from GST cert: **Shop 5, Block A, Shivansh Landmark, Manthan Road, Vatva, Ahmedabad – 382445**
4. Add phone `+91 83206 84142`, email `info@vishwakarmatechnoenergy.com`, website `https://vishwakarmatechnoenergy.com`
5. Verify via postcard (takes ~7 days)

---

## Redeploying after changes

Every time you change code:

```bash
vercel --prod
```

Or connect the project to GitHub in the Vercel dashboard → any `git push` auto-deploys.

## Rollback

```bash
vercel rollback          # reverts to previous deployment
```
