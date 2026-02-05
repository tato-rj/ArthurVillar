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

Route::middleware('auth')->domain('admin.'.config('app.url'))->prefix('youtube')->name('admin.youtube.')->group(function() {
    Route::get('', 'YoutubeController@create')->name('create');

    Route::get('download', 'YoutubeController@download')->name('download');

    Route::post('', 'YoutubeController@convert')->name('convert');
});

Route::get('', function () {
    return view('welcome');
})->name('home');
