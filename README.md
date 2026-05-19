# Rekha Singh Astrology — Website

A complete, static website for **Rekha Singh, Astrologer** (Indira Nagar, Lucknow). Built as plain HTML, CSS and JavaScript — no build tools, no frameworks, no dependencies. Deploys to GitHub Pages in minutes.

---

## What this is

Five pages — Home, About, Services, Testimonials, Contact — plus a custom 404. The site is optimised for mobile, fast on Indian networks, accessible, SEO-friendly, and designed to drive **WhatsApp consultations** as the main conversion. There is no contact form by design: every CTA points to WhatsApp, where Rekha ji can respond personally.

---

## Customise in 5 minutes

Open `assets/config.js` and edit these values. **This is the only file you need to touch** to put the site live with your real details.

| Field | What to put |
|---|---|
| `phone` | Your phone number, e.g. `"+91-9876543210"` |
| `whatsappNumber` | Same number, **country code first, no `+`, no spaces or dashes**. Example: `"919876543210"` |
| `whatsappDefaultMessage` | The pre-filled message that opens in WhatsApp when someone taps the button |
| `email` | Your contact email |
| `address` | Full visiting address |
| `hours` | Consultation hours |
| `experienceYears` | Number, e.g. `22` |
| `consultationsCount` | E.g. `"5,000+"` |
| `justdialUrl` | The exact URL of the JustDial listing |
| `googleMapsEmbed` | (Optional) the `src=` from a Google Maps embed iframe — see "Add a live map" below |

After saving, refresh any page. Phone numbers, WhatsApp links, address and hours update across the whole site automatically.

---

## Add your photos

Open `assets/img/README.md` for the full list. The two essential photos are:

1. `assets/img/rekha-portrait.jpg` — main hero portrait (600 × 800 px, JPG, under 150 KB)
2. `assets/img/og-image.jpg` — social share preview (1200 × 630 px)

The site currently shows tasteful SVG placeholders. To use real photos, drop the files into `assets/img/` and replace the SVG block in `index.html` / `about.html` with an `<img>` tag — see the inline `<!-- REPLACE: ... -->` comments in the HTML.

---

## Replace testimonials

The site ships with 10 realistic placeholder testimonials, written in the right tone but **not from real seekers**. Before going live, replace them with verified reviews from JustDial or Google.

- Carousel on home: `index.html` — search for `<!-- These testimonials are realistic placeholders.`
- Full grid: `testimonials.html` — search for the same comment

Each testimonial is one `<article>` block. Update the quote, name, city, and service tag. Keep the 5-star SVG row as is unless someone gave fewer stars.

---

## Deploy to GitHub Pages

1. **Create a GitHub account** if you don't have one — https://github.com/signup
2. **Create a new public repository**. A clean name like `rekha-singh-astrology` works well.
3. **Upload all the files** in this folder to that repo.
   - Easy way (no Git knowledge): on the repo page, click **"Add file" → "Upload files"**, drag the entire contents of this folder in, then commit.
   - Git way:
     ```bash
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<your-repo>.git
     git push -u origin main
     ```
4. **Enable Pages**: in the repo, go to **Settings → Pages**. Under "Build and deployment" → "Source", choose **Deploy from a branch**. Select branch `main` and folder `/ (root)`. Click **Save**.
5. Wait about a minute. Your site is now live at:
   `https://<your-username>.github.io/<your-repo>/`

That's it. Every time you push a new change, the site updates within a minute.

---

## Custom domain (optional)

Want a clean address like `rekhasinghastrology.in`?

1. Buy the domain from any registrar (GoDaddy, Hostinger, Namecheap).
2. Open the `CNAME` file at the root of this repo. Remove all the comment lines and replace with your bare domain on a single line:
   ```
   rekhasinghastrology.in
   ```
3. In your registrar's DNS panel:
   - Add four **A records** on `@` pointing to GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Add a **CNAME record** on `www` pointing to `<your-username>.github.io`
4. Back in **Settings → Pages**, enter your domain in the "Custom domain" box. Tick **Enforce HTTPS** once it's available (takes up to 24 hrs).

---

## Add a live Google Map (optional)

1. Open Google Maps, search for "Rekha Singh Astrologer, Indira Nagar Lucknow".
2. Click **Share → Embed a map**, copy the `src="..."` URL from the iframe.
3. Paste that URL as the value of `googleMapsEmbed` in `assets/config.js`.
4. Refresh the Contact page — the placeholder card is replaced with the live map.

---

## Add Google Analytics later (optional)

Open any of the HTML files. Inside the `<head>`, you'll see:

```html
<!-- Owner: to add Google Analytics later, paste your GA4 snippet here. -->
```

Paste your GA4 snippet right under that comment, in every page (`index.html`, `about.html`, `services.html`, `testimonials.html`, `contact.html`). The snippet is provided in your Google Analytics dashboard under "Data Streams → Web → View tag instructions".

---

## What's in this folder

```
/
├── index.html                   Home
├── about.html                   About Rekha ji
├── services.html                6 services in detail
├── testimonials.html            Full grid of testimonials
├── contact.html                 Address, phone, WhatsApp, map
├── 404.html                     Custom not-found page
├── .nojekyll                    Tells GitHub Pages not to process with Jekyll
├── robots.txt                   Lets search engines index everything
├── sitemap.xml                  Helps Google find all pages
├── CNAME                        Optional custom domain (commented out)
├── README.md                    This file
├── assets/
│   ├── config.js                The ONLY file you usually edit
│   ├── css/styles.css           All styles, one file
│   ├── js/main.js               All JS (nav, carousel, etc.)
│   └── img/                     Drop photos here
└──
```

---

## Need to make a bigger change?

The codebase is intentionally simple — open any `.html` file in a text editor (VS Code is free at https://code.visualstudio.com) and you can read it like a recipe. Sections are clearly labelled with comments like `<!-- ================= HEADER ================= -->`. Edit and save; refresh the browser to see it.

For larger redesigns or new pages, anyone comfortable with HTML/CSS can extend this — no build step, no Node.js, no npm.

---

## Crafted with reverence.
