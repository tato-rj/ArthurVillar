# Piano Atlas

Interactive grand piano anatomy explorer at `instruments.` + `APP_DOMAIN`.
The landing route is `instruments.home`, registered in `routes/instruments.php`.

- `index.js`: scene, orbit/zoom, selection, search, system visibility, isolation,
  exploded layout, parts library, labels, and lid controls.
- `model.js`: self-contained procedural Three.js model and wood texture.
- `parts.js`: the 32 selectable component groups and educational descriptions.
- `resources/views/piano/index.blade.php`: accessible interface and panels.
- `resources/sass/piano/index.scss`: desktop and mobile layout.

Run `npm run dev`, `npm run watch`, or `npm run prod` from the repository root.
Generated assets are versioned through the existing Laravel Mix manifest.
No remote 3D models, textures, or runtime CDN dependencies are required.

The model has 88 physical keys (52 natural and 36 sharp/flat), repeated action
components, cross-strung bass, bridges, ribs, plate, case, and three pedals.
This is an educational approximation, not a manufacturer CAD model. String
scaling and action geometry are simplified; repeated components are selected
as named groups. No audio is generated.

Anatomy references:
- https://www.yamaha.com/en/musical_instrument_guide/piano/mechanism/
- https://www.yamaha.com/en/musical_instrument_guide/piano/mechanism/mechanism003.html

Controls: drag to orbit, scroll/pinch to zoom, right-drag/two fingers to pan.
Use `/` to search, Escape to clear selection, and R to reset. On phones the
Systems panel starts collapsed. All part groups can be selected through search.

Production needs DNS, host routing, and TLS for `instruments.arthurvillar.com` on the
existing Laravel server, followed by a normal application/asset deployment.
