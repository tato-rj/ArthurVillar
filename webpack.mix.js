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
    .js('resources/js/music/admin-soundeffects.js', 'public/js/music')
    .js('resources/js/music/games/intervalslab.js', 'public/js/music')
    .js('resources/js/music/games/chordslab.js', 'public/js/music')
    .js('resources/js/music/games/pitchdetective.js', 'public/js/music')
    .js('resources/js/music/games/tonetrek.js', 'public/js/music')
    .js('resources/js/music/games/notepython.js', 'public/js/music')
    .js('resources/js/music/games/keyslab.js', 'public/js/music')
    .js('resources/js/music/games/notenest.js', 'public/js/music')
    .js('resources/js/music/games/openstaff.js', 'public/js/music')
    .js('resources/js/music/games/beathero.js', 'public/js/music')
    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/musicgames.scss', 'public/css')
    .copyDirectory('resources/js/vendor', 'public/js/vendor')
    .copyDirectory('resources/images', 'public/images')
    .version();
