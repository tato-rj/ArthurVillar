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
    .js('resources/js/music/games/intervals.js', 'public/js/music')
    .js('resources/js/music/games/chords.js', 'public/js/music')
    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/musicgames.scss', 'public/css')
    .copyDirectory('resources/js/vendor', 'public/js/vendor')
    .copyDirectory('resources/images', 'public/images')
    .version();
