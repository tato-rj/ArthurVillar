<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function() {
    Route::get('', 'RecordingsController@home')->name('home');

    Route::prefix('recordings')->name('recordings.')->group(function() {
        Route::post('', 'RecordingsController@store')->name('store');

        Route::prefix('{recording}')->group(function() {
            Route::get('', 'RecordingsController@edit')->name('edit');

            Route::patch('playlists', 'RecordingsController@playlists')->name('playlists');
        });
    });
});

Route::get('url/{recording}', 'PlayerController@url')->name('url');

Route::get('qrcode', 'PlayerController@qrcode')->name('qrcode');

Route::middleware('token.play')->get('{token}', 'PlayerController@show')->name('show');



// Route::name('recordings.')->group(function() {
//     Route::post('listen', 'RecordingsController@listen')->name('listen');
// });

// Route::prefix('composers')->name('composers.')->group(function() {
//     Route::get('', 'ComposersController@index')->name('index');

//     Route::post('', 'ComposersController@store')->name('store');

//     Route::prefix('{composer}')->group(function() {
//         Route::get('', 'ComposersController@edit')->name('edit');

//         Route::patch('', 'ComposersController@update')->name('update');

//         Route::delete('', 'ComposersController@destroy')->name('destroy');
//     });
// });

// Route::prefix('playlists')->name('playlists.')->group(function() {
//     Route::get('', 'PlaylistsController@index')->name('index');

//     Route::post('', 'PlaylistsController@store')->name('store');

//     Route::prefix('{playlist}')->group(function() {
//         Route::get('recordings', 'PlaylistsController@recordings')->name('recordings');

//         Route::patch('secret', 'PlaylistsController@secret')->name('secret');

//         Route::patch('', 'PlaylistsController@update')->name('update');

//         Route::delete('', 'PlaylistsController@destroy')->name('destroy');
//     });
// });

// Route::prefix('youtube')->name('youtube.')->group(function() {
//     Route::get('', 'YoutubeController@create')->name('create');

//     Route::get('download', 'YoutubeController@download')->name('download');

//     Route::post('', 'YoutubeController@convert')->name('convert');
// });
