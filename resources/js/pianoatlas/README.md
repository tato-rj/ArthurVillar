# Piano Atlas

Grand, upright, and single-note action anatomy explorer at `pianoatlas.` + `APP_DOMAIN`.
Routes: `pianoatlas.grand` (root) and `pianoatlas.upright` (`/upright`), and `pianoatlas.action` (`/action`),
registered in `routes/pianoatlas.php`.

- `viewer.js`: shared scene, navigation, selection, search, visibility, and layouts.
- `animation.js`: shared key, action, pedal animation, and synthesized piano audio.
- `grand/`, `upright/`, and `action/`: model geometry, part definitions, and JS entry points.
- `resources/views/pianoatlas/`: shared interface and model-specific views.
- `resources/sass/pianoatlas.scss`: shared desktop and mobile styling.

Run `npm run dev`, `npm run watch`, or `npm run prod` from the repository root.
Laravel Mix produces `public/js/pianoatlas/grand.js`,
`public/js/pianoatlas/upright.js`, and `public/css/pianoatlas.css`.

Models and sounds are self-contained educational approximations.
Drag to orbit, scroll/pinch to zoom, and right-drag/two fingers to pan.
Use `/` to search, Escape to clear selection, and R to reset.
Select a part for details, visibility controls, and applicable animations.

Production uses `pianoatlas.arthurvillar.com` on the existing Laravel server.
DNS, host routing, and TLS must cover that hostname.
