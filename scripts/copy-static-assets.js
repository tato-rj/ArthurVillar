const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const copies = [
    ['resources/js/vendor', 'public/js/vendor'],
    ['resources/images', 'public/images'],
    ['node_modules/lemonadejs/dist/lemonade.js', 'public/js/vendor/lemonadejs/lemonade.js'],
    ['node_modules/@calendarjs/ce/dist/index.js', 'public/js/vendor/calendarjs/index.js'],
    ['node_modules/@calendarjs/ce/dist/style.css', 'public/css/vendor/calendarjs.css'],
];

const copyRecursive = function(source, destination) {
    const stat = fs.statSync(source);

    if (stat.isDirectory()) {
        fs.mkdirSync(destination, {
            recursive: true,
        });

        fs.readdirSync(source).forEach(function(entry) {
            copyRecursive(path.join(source, entry), path.join(destination, entry));
        });

        return;
    }

    fs.mkdirSync(path.dirname(destination), {
        recursive: true,
    });

    fs.copyFileSync(source, destination);
};

const copyPath = function(source, destination) {
    fs.rmSync(destination, {
        force: true,
        recursive: true,
    });

    copyRecursive(source, destination);
};

copies.forEach(function([source, destination]) {
    copyPath(path.join(root, source), path.join(root, destination));
});
