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

Route::domain(config('app.url'))->prefix('play/{recording}')->name('recordings.')->group(function() {
    Route::get('', 'RecordingsController@play')->name('play');
});

Route::middleware('auth')->domain('admin.'.config('app.url'))->name('admin.recordings.')->group(function() {
    Route::get('', 'RecordingsController@index')->name('index');

    Route::post('', 'RecordingsController@store')->name('store');

    Route::post('youtube-to-audio', 'RecordingsController@youtubeToAudio')->name('youtubeToAudio');

    Route::post('listen', 'RecordingsController@listen')->name('listen');

    Route::prefix('{recording}')->group(function() {
        Route::get('qrcode', 'RecordingsController@qrcode')->name('qrcode');

        Route::delete('', 'RecordingsController@destroy')->name('destroy');
    });

    // Route::prefix('methods')->name('methods.')->group(function() {
    //     Route::get('', 'MethodsController@index')->name('index');

    //     Route::post('', 'MethodsController@store')->name('store');

    //     Route::prefix('{method}')->group(function() {
    //         Route::patch('', 'MethodsController@update')->name('update');

    //         Route::delete('', 'MethodsController@destroy')->name('destroy');
    //     });
    // });

    // Route::prefix('books')->name('books.')->group(function() {
    //     Route::post('', 'BooksController@store')->name('store');

    //     Route::prefix('{book}')->group(function() {
    //         Route::get('', 'BooksController@show')->name('show');

    //         Route::patch('', 'BooksController@update')->name('update');

    //         Route::delete('', 'BooksController@destroy')->name('destroy');

    //         Route::prefix('tracks')->name('tracks.')->group(function() {
    //             Route::post('', 'TracksController@store')->name('store');

    //             Route::post('youtube', 'TracksController@youtube')->name('youtube');

    //             Route::patch('reorder', 'TracksController@reorder')->name('reorder');

    //             Route::prefix('{track}')->group(function() {
    //                 Route::post('', 'TracksController@listen')->name('listen');

    //                 Route::patch('', 'TracksController@update')->name('update');

    //                 Route::delete('', 'TracksController@destroy')->name('destroy');
    //             });
    //         });
    //     });
    // });
});

Route::get('', function () {
    return view('welcome');
});
