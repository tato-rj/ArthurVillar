// Regenerate the calendar's icon family with `npm run icons:calendar`.
// Requires ImageMagick 7 (`magick` on PATH). Normal Mix builds use committed exports.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {execFileSync} = require('child_process');

const root = path.resolve(__dirname, '..');
const master = path.join(root, 'resources/artwork/calendar/icon.png');
const tabIcon = path.join(root, 'resources/artwork/calendar/favicon-16.svg');
const output = path.join(root, 'public/favicon/calendar');
const fullBleedIcon = path.join(output, 'icon.png');
const version = crypto.createHash('sha256')
    .update(fs.readFileSync(master))
    .update(fs.readFileSync(tabIcon))
    .update(fs.readFileSync(__filename))
    .digest('hex').slice(0, 12);
const sizes = {
    'android-icon': [36, 48, 72, 96, 144, 192, 512],
    'apple-icon': [57, 60, 72, 76, 114, 120, 144, 152, 167, 180],
    'favicon': [32, 48, 96],
    'ms-icon': [70, 144, 150, 310],
};

execFileSync('magick', ['-version'], {stdio: 'ignore'});
fs.mkdirSync(output, {recursive: true});

function render(destination, operations, source = fullBleedIcon) {
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    execFileSync('magick', [
        source, '-colorspace', 'sRGB', '-filter', 'Lanczos',
        ...operations, '-depth', '8', '-strip',
        '-define', 'png:compression-level=9', destination,
    ]);
}

const opaque = ['-background', 'white', '-alpha', 'remove', '-alpha', 'off'];
function mirrorEdges(viewport) {
    return [
        '-virtual-pixel', 'mirror', '-filter', 'point',
        '-define', `distort:viewport=${viewport}`, '-distort', 'SRT', '0',
        '+repage', '-filter', 'Lanczos',
    ];
}

// Keep the lettering and paper inside the rounded face of the master.
// Mirror its clean outer texture to fill the square, including the corners.
render(fullBleedIcon, [
    '-crop', '910x1040+158+100', '+repage',
    ...mirrorEdges('1110x1110-100-35'), ...opaque, '-resize', '1024x1024',
], master);

for (const [prefix, dimensions] of Object.entries(sizes)) {
    for (const size of dimensions) {
        render(path.join(output, `${prefix}-${size}x${size}.png`), ['-resize', `${size}x${size}`]);
    }
}

for (const filename of ['apple-icon.png', 'apple-icon-precomposed.png']) {
    render(path.join(output, filename), ['-resize', '192x192']);
}

// The 16px tab icon has its own lettering so the date survives at native size.
execFileSync('magick', [
    '-background', 'none', '-density', '768', tabIcon, '-filter', 'Box', '-resize', '16x16',
    '-depth', '8', '-strip', path.join(output, 'favicon-16x16.png'),
]);

render(path.join(output, 'favicon.ico'), [
    '-resize', '256x256',
    '(', '-clone', '0', '-resize', '128x128', ')',
    '(', '-clone', '0', '-resize', '64x64', ')',
    ...[48, 32, 16].map(size => path.join(output, `favicon-${size}x${size}.png`)),
    '-type', 'TrueColorAlpha',
]);

// Extend the header and paper so the lettering fits inside the maskable safe zone.
for (const size of [192, 512]) {
    render(path.join(output, `maskable-icon-${size}x${size}.png`), [
        ...mirrorEdges('1184x1184-80-80'), '-resize', `${size}x${size}`,
    ]);
}

render(path.join(root, 'resources/images/logos/calendar.png'), ['-resize', '512x512']);
fs.mkdirSync(path.join(root, 'public/images/logos'), {recursive: true});
fs.copyFileSync(path.join(root, 'resources/images/logos/calendar.png'), path.join(root, 'public/images/logos/calendar.png'));

const viewPath = path.join(root, 'resources/views/layouts/favicon/calendar.blade.php');
let view = fs.readFileSync(viewPath, 'utf8');
const launches = [...view.matchAll(/<link rel="apple-touch-startup-image" media="([^"]+)" href="[^\n]+?\/favicon\/calendar\/([^?']+)/g)];
for (const [, media, filename] of launches) {
    const ratio = Number(media.match(/device-pixel-ratio: (\d+)/)[1]);
    let width = Number(media.match(/device-width: (\d+)px/)[1]) * ratio;
    let height = Number(media.match(/device-height: (\d+)px/)[1]) * ratio;
    if (media.includes('orientation: landscape')) [width, height] = [height, width];
    render(path.join(output, filename), [
        '-resize', `${160 * ratio}x${160 * ratio}`,
        '-background', 'white', '-gravity', 'center', '-extent', `${width}x${height}`, ...opaque,
    ], master);
}

const icon = (prefix, size, purpose) => ({
    src: `${prefix}-${size}x${size}.png?v=${version}`,
    sizes: `${size}x${size}`,
    type: 'image/png',
    purpose,
});
fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify({
    id: '/',
    name: 'Calendar',
    short_name: 'Calendar',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
        ...sizes['android-icon'].map(size => icon('android-icon', size, 'any')),
        ...[192, 512].map(size => icon('maskable-icon', size, 'maskable')),
    ],
}, null, 2) + '\n');

fs.writeFileSync(path.join(output, 'browserconfig.xml'), [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<browserconfig><msapplication><tile>',
    ...[70, 150, 310].map(size => `<square${size}x${size}logo src="/favicon/calendar/ms-icon-${size}x${size}.png?v=${version}"/>`),
    '<TileColor>#ffffff</TileColor></tile></msapplication></browserconfig>',
    '',
].join('\n'));

if (!view.includes('sizes="167x167"')) {
    view = view.replace('<link rel="apple-touch-icon" sizes="180x180"',
        '<link rel="apple-touch-icon" sizes="167x167" href="{{asset(\'/favicon/calendar/apple-icon-167x167.png\')}}">\n<link rel="apple-touch-icon" sizes="180x180"');
}
if (!view.includes('sizes="48x48"')) {
    view = view.replace('<link rel="icon" type="image/png" sizes="96x96"',
        '<link rel="icon" type="image/png" sizes="48x48" href="{{asset(\'/favicon/calendar/favicon-48x48.png\')}}">\n<link rel="icon" type="image/png" sizes="96x96"');
}
view = view.replace(/(favicon\.ico[^>\n]+sizes=")[^"]+"/,
    (_, prefix) => `${prefix}16x16 32x32 48x48 64x64 128x128 256x256"`);
view = view.replace(/asset\('\/favicon\/calendar\/([^?']+)(?:\?[^']*)?'\)/g,
    (_, filename) => `asset('/favicon/calendar/${filename}?v=${version}')`);
fs.writeFileSync(viewPath, view);

const backPath = path.join(root, 'resources/views/components/back.blade.php');
fs.writeFileSync(backPath, fs.readFileSync(backPath, 'utf8')
    .replace(/calendar\.png(?:\?v=[a-f0-9]+)?/g, `calendar.png?v=${version}`));

const notificationPath = path.join(root, 'app/Notifications/EventReminder.php');
fs.writeFileSync(notificationPath, fs.readFileSync(notificationPath, 'utf8')
    .replace(/android-icon-192x192\.png(?:\?v=[a-f0-9]+)?/g, `android-icon-192x192.png?v=${version}`));

console.log(`Generated calendar icons and ${launches.length} launch screens (version ${version}).`);
