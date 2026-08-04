# Home

Scroll landing about abandoned dogs: a journey from cold to warm — asphalt
and rain at the start, warm home light by the end. Two 3D dog models
(Sketchfab) are driven by scroll progress through a single persistent
WebGL canvas.

Core idea: *"If even those without a home are capable of care — why is it
sometimes missing in those who have one?"*

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **React Three Fiber** + **drei** — rendering and loading `.glb` models
- **GSAP** (`ScrollTrigger`, `SplitText`) — syncing camera/light/text to scroll
- **Tailwind CSS v4** — base styles, design system via CSS variables

## Structure

```
src/
  app/                  layout, page, globals.css (design tokens)
  components/
    scene/              persistent <Canvas>: models, light, camera, particles
    sections/           8 landing sections (hero → footer)
    ui/                 RevealLine (SplitText reveal), ScrollIndicator, ShareButton
  hooks/                useSectionTrigger (progress+pin), useActiveSection
  lib/
    scroll/director.ts  shared mutable scroll state (active/progress/warmth)
    scene/              model normalization, color theme
public/models/           optimized .glb (meshopt + WebP textures)
models/                  raw Sketchfab sources (gitignored, not in the repo)
```

## How it works

Each section registers a `ScrollTrigger` (`useSectionTrigger`), which writes
progress (0–1) to `director.progress[id]`. The `Director` component inside
`<Canvas>` derives the "active" section from that progress every frame and
interpolates camera position, the crossfade between the two models, lighting,
and particles (rain → warm dust) from it. The "transition" and "care"
sections are pinned (`ScrollTrigger.pin`) to give the animation and the
interaction (`OrbitControls` on the second model) room to breathe.

Models are optimized via `@gltf-transform/cli` (`optimize` — meshopt geometry
compression + WebP texture recompression): `black_dog` 5.6MB → 659KB,
`chance_meeting` 19.9MB → 1.0MB.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploying a static export

`GH_PAGES=1` enables `output: "export"` and a `/save-dogs-showcase` basePath
(used for the GitHub Pages showcase deploy, which serves this app at that
subpath):

```bash
GH_PAGES=1 NEXT_PUBLIC_GH_PAGES=1 npm run build   # writes to out/
```

For a normal deploy (Vercel, a custom domain, etc.) just use `npm run build`
— basePath is empty by default.

## Rebuilding the models

Raw sources (`models/*.glb`) aren't in the repo (see `.gitignore`). To
regenerate the optimized versions in `public/models/`:

```bash
npx @gltf-transform/cli optimize models/<file>.glb public/models/<name>.glb \
  --texture-compress webp --texture-size 2048
```
