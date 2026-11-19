# Yasir Ziyaudeen Ahamed — portfolio

Personal portfolio: AI engineer shipping agents that are checked before they act.

Static site, no framework. Hero pills and the basketball hoop use [Matter.js](https://brm.io/matter-js/), smooth scrolling uses [Lenis](https://lenis.darkroom.engineering/) (both vendored in `vendor/`).

## Structure

- `src/index.html`, `src/style.css`, `src/app.js`: source (all content lives in `app.js`)
- `icons/`: tool icons (Simple Icons)
- `img/`: project screenshots (hover previews, project panels) and the social share image `og.png`
- `build.py`: inlines CSS, JS, vendor libs and icons into one file
- `index.html`: built site (generated, do not edit by hand); served with the résumé PDF from the repo root, so it works on GitHub Pages as-is

## Build and run

```bash
python3 build.py
python3 -m http.server 8000
```
