<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('', function () {
    return view('welcome');
})->name('home');

// Route::get('/analytics/opt-out', function (Request $request) {
//     return redirect('/')
//         ->withCookie(cookie(
//             name: 'exclude_analytics',
//             value: '1',
//             minutes: 60 * 24 * 365 * 5, // 5 years
//             path: '/',
//             domain: null,
//             secure: true,
//             httpOnly: false,
//             raw: false,
//             sameSite: 'Lax'
//         ));
// });

// Route::get('/analytics/opt-in', function () {
//     return redirect('/')
//         ->withCookie(cookie()->forget('exclude_analytics'));
// });