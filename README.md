# multiagents.me

Personal site for **Om Yadao** — AI/ML Engineer.

Live at [multiagents.me](https://multiagents.me).

## How it works

One file. `index.html` contains the markup, the styles and the small bit of
JavaScript that highlights the current section in the side index. The portrait
is embedded as a base64 WebP, so the page has no local asset requests and no
build step.

The only external request is the IBM Plex Sans / Mono stylesheet from Google
Fonts.

## Editing

Open `index.html` and edit it directly. No `npm install`, no bundler.

To preview locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which uploads the
repository root to GitHub Pages. `CNAME` points the Pages deployment at
`multiagents.me` and `.nojekyll` stops Jekyll from touching the files.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | The entire site |
| `Om-Yadao-Resume.pdf` | Résumé linked from the hero and contact section |
| `CNAME` | Custom domain |
| `.nojekyll` | Serve files as-is |
