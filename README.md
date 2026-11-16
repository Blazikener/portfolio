# Yasir Ziyaudeen Ahamed — portfolio

Personal portfolio: AI engineer shipping agents that are checked before they act.

Static site, no framework. Hero pills and the basketball hoop use [Matter.js](https://brm.io/matter-js/), smooth scrolling uses [Lenis](https://lenis.darkroom.engineering/) (both vendored in `vendor/`).

## Structure

- `src/index.html`, `src/style.css`, `src/app.js`: source (all content lives in `app.js`)
- `icons/`: tool icons (Simple Icons)
- `build.py`: inlines CSS, JS, vendor libs and icons into one file
- `dist/`: built site (`index.html` + résumé PDF), ready for any static host

## Build and run

```bash
python3 build.py
cd dist && python3 -m http.server 8000
```
