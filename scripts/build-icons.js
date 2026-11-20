// Bundle only the Lucide icons used by Blade, browser code, and dynamic model values.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const iconDirectory = path.join(root, 'node_modules/lucide-static/icons');
const available = new Set(fs.readdirSync(iconDirectory).filter(file => file.endsWith('.svg')).map(file => file.slice(0, -4)));
const aliases = require('../resources/icons/aliases.json');
const names = new Set(['circle-help', ...Object.values(aliases), ...require('../resources/icons/names.json')]);

function scan(directory, suffix) {
    for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
        const file = path.join(directory, entry.name);
        if (entry.isDirectory() && entry.name !== 'vendor') scan(file, suffix);
        if (!entry.isFile() || !entry.name.endsWith(suffix)) continue;

        const source = fs.readFileSync(file, 'utf8');
        for (const [, key] of source.matchAll(/(?:@icon\s*\(\s*|Icon::render\s*\(\s*|['"]icon['"]\s*=>\s*|\bicon:\s*)['"]([a-z0-9-]+)['"]/g)) {
            const name = aliases[key] || key;
            if (!available.has(name)) throw new Error(`Unknown icon "${key}" in ${path.relative(root, file)}`);
            names.add(name);
        }
        for (const [, key] of source.matchAll(/\bicon-([a-z0-9-]+)/g)) {
            const name = aliases[key] || key;
            if (available.has(name)) names.add(name);
        }
    }
}

scan(path.join(root, 'resources/views'), '.blade.php');
scan(path.join(root, 'resources/js'), '.js');

const icons = {};
for (const name of [...names].sort()) {
    if (!available.has(name)) throw new Error(`Unknown Lucide icon "${name}"`);
    const svg = fs.readFileSync(path.join(iconDirectory, name + '.svg'), 'utf8');
    const body = svg.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/);
    if (!body) throw new Error(`Invalid Lucide SVG "${name}"`);
    icons[name] = body[1].trim().replace(/\s+/g, ' ');
}
fs.writeFileSync(path.join(root, 'resources/icons/lucide.json'), JSON.stringify(icons, null, 2) + '\n');
console.log(`Generated ${names.size} Lucide icons.`);
