// Regenerate the calendar's icon family with `npm run icons:calendar`.
// Requires ImageMagick 7 (`magick` on PATH). Normal Mix builds use committed exports.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {execFileSync} = require('child_process');

const root = path.resolve(__dirname, '..');
const master = path.join(root, 'resources/artwork/calendar/icon.png');
const output = path.join(root, 'public/favicon/calendar');
const version = crypto.createHash('sha256')
    .update(fs.readFileSync(master))
    .update(fs.readFileSync(__filename))
    .digest('hex').slice(0, 12);
const sizes = {
    'android-icon': [36, 48, 72, 96, 144, 192, 512],
    'apple-icon': [57, 60, 72, 76, 114, 120, 144, 152, 167, 180],
    'favicon': [16, 32, 48, 96],
    'ms-icon': [70, 144, 150, 310],
};

execFileSync('magick', ['-version'], {stdio: 'ignore'});
fs.mkdirSync(output, {recursive: true});

function render(destination, operations) {
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    execFileSync('magick', [
        master, '-colorspace', 'sRGB', '-filter', 'Lanczos',
        ...operations, '-depth', '8', '-strip',
        '-define', 'png:compression-level=9', destination,
    ]);
}

const opaque = ['-background', 'white', '-alpha', 'remove', '-alpha', 'off'];
// Remove excess transparent margins only for tiny browser-tab icons.
const faviconCrop = ['-trim', '+repage', '-bordercolor', 'none', '-border', '32'];
for (const [prefix, dimensions] of Object.entries(sizes)) {
    for (const size of dimensions) {
        const operations = prefix === 'favicon' ? [...faviconCrop] : [];
        operations.push('-resize', `${size}x${size}`);
        if (prefix === 'favicon') {
            operations.push('-background', 'none', '-gravity', 'center', '-extent', `${size}x${size}`);
        }
        if (prefix === 'apple-icon') operations.push(...opaque);
        render(path.join(output, `${prefix}-${size}x${size}.png`), operations);
    }
}

for (const [filename, size] of [['icon.png', 1024], ['apple-icon.png', 192], ['apple-icon-precomposed.png', 192]]) {
    render(path.join(output, filename), [
        '-resize', `${size}x${size}`,
        ...(filename.startsWith('apple-') ? opaque : []),
    ]);
}

render(path.join(output, 'favicon.ico'), [
    ...faviconCrop, '-resize', '256x256', '-background', 'none',
    '-gravity', 'center', '-extent', '256x256',
    '-define', 'icon:auto-resize=256,128,64,48,32,16',
]);

// Opaque, separately padded exports for launchers that apply circular or squircle masks.
for (const size of [192, 512]) {
    const artworkSize = Math.round(size * 0.8);
    render(path.join(output, `maskable-icon-${size}x${size}.png`), [
        '-resize', `${artworkSize}x${artworkSize}`,
        '-background', 'white', '-gravity', 'center', '-extent', `${size}x${size}`, ...opaque,
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
    ]);
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
