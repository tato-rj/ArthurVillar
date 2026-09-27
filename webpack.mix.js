const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/offline.js', 'public/js')
    .js('resources/js/calendar/index.js', 'public/js/calendar')
    .js('resources/js/pianoatlas/action/index.js', 'public/js/pianoatlas/action.js')
    .js('resources/js/pianoatlas/grand/index.js', 'public/js/pianoatlas/grand.js')
    .js('resources/js/pianoatlas/upright/index.js', 'public/js/pianoatlas/upright.js')
    .js('resources/js/music/admin-soundeffects.js', 'public/js/music')
    .js('resources/js/music/games/intervalslab.js', 'public/js/music')
    .js('resources/js/music/games/chordslab.js', 'public/js/music')
    .js('resources/js/music/games/pitchdetective.js', 'public/js/music')
    .js('resources/js/music/games/chorddetective.js', 'public/js/music')
    .js('resources/js/music/games/tonetrek.js', 'public/js/music')
    .js('resources/js/music/games/notepython.js', 'public/js/music')
    .js('resources/js/music/games/keyslab.js', 'public/js/music')
    .js('resources/js/music/games/notenest.js', 'public/js/music')
    .js('resources/js/music/games/notematch.js', 'public/js/music')
    .js('resources/js/music/games/memorywizard.js', 'public/js/music')
    .js('resources/js/music/games/openstaff.js', 'public/js/music')
    .js('resources/js/music/games/beathero.js', 'public/js/music')
    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/offline.scss', 'public/css')
    .sass('resources/sass/calendar.scss', 'public/css')
    .sass('resources/sass/external/scheduler.scss', 'public/css/external/scheduler.css')
    .sass('resources/sass/pianoatlas.scss', 'public/css/pianoatlas.css')
    .sass('resources/sass/schedule.scss', 'public/css')
    .sass('resources/sass/musicgames.scss', 'public/css')
    .version();

// Webpack adds trailing tabs to runtime chunks. Normalize the changed game bundles
// before Mix computes version hashes so generated assets also pass diff --check.
mix.webpackConfig({
    plugins: [{
        apply(compiler) {
            compiler.hooks.thisCompilation.tap('GameBundleWhitespace', compilation => {
                compilation.hooks.processAssets.tap({
                    name: 'GameBundleWhitespace',
                    stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER,
                }, assets => {
                    for (const [name, asset] of Object.entries(assets)) {
                        if (!/^\/?js\/(app\.js|music\/(?!admin-)[^/]+\.js)$/.test(name)) continue;
                        const normalized = asset.source().toString().replace(/[ \t]+$/gm, '');
                        compilation.updateAsset(name, new compiler.webpack.sources.RawSource(normalized));
                    }
                });
            });
        },
    }],
});
