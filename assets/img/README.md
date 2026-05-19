# Images for Rekha Singh Astrology

Drop your photos into this folder using these exact filenames. The website is already set up to look for them.

## Required (high priority)

| Filename | Purpose | Recommended size | Format | Notes |
|---|---|---|---|---|
| `rekha-portrait.jpg` | Hero portrait on Home page | 600 × 800 px (3:4) | JPG | Studio-quality, warm lighting, soft background. Under 150 KB after compression. |
| `rekha-portrait-2.jpg` | About strip on Home & About page | 480 × 640 px (3:4) | JPG | A second, more candid shot — at desk with books, or in consultation. Under 150 KB. |
| `og-image.jpg` | Social share preview (WhatsApp, Facebook, Twitter) | 1200 × 630 px (1.91:1) | JPG | Should include Rekha ji's name + a clean photo. Under 200 KB. |

## How the site uses these

- The HTML currently shows tasteful **inline SVG placeholders** in the portrait frames. When you drop the real `rekha-portrait.jpg` into this folder, look in `index.html` and `about.html` for the comment `<!-- REPLACE: ... -->` and swap the SVG block for a real `<img>` tag, like:

  ```html
  <img src="assets/img/rekha-portrait.jpg" alt="Portrait of Rekha Singh" width="600" height="800" loading="lazy" />
  ```

- The OG image is referenced in every page's `<head>`. Just add the file and it works automatically — no HTML change needed.

## Compression tips

Free tools that produce small, sharp JPGs:
- [Squoosh](https://squoosh.app) — drag, drop, export
- [TinyJPG](https://tinyjpg.com) — bulk compression

Target: portrait photos under **150 KB**; OG image under **200 KB**.
