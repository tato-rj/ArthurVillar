<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function() {
    Route::get('', 'ListeningController@home')->name('home');

    Route::prefix('recordings')->name('recordings.')->group(function() {
        Route::get('', 'RecordingsController@index')->name('index');

        Route::post('', 'RecordingsController@store')->name('store');

        Route::prefix('{recording}')->group(function() {
            Route::get('', 'RecordingsController@edit')->name('edit');

            Route::patch('', 'RecordingsController@update')->name('update');

            Route::patch('sync-playlists', 'RecordingsController@syncPlaylists')->name('sync-playlists');

            Route::delete('', 'RecordingsController@destroy')->name('destroy');
        });
    });

    Route::prefix('composers')->name('composers.')->group(function() {
        Route::get('', 'ComposersController@index')->name('index');

        Route::post('', 'ComposersController@store')->name('store');

        Route::prefix('{composer}')->group(function() {
            Route::get('', 'ComposersController@edit')->name('edit');

            Route::patch('', 'ComposersController@update')->name('update');

            Route::delete('', 'ComposersController@destroy')->name('destroy');
        });
    });

    Route::prefix('playlists')->name('playlists.')->group(function() {
        Route::get('', 'PlaylistsController@index')->name('index');

        Route::post('', 'PlaylistsController@store')->name('store');

        Route::prefix('{playlist}')->group(function() {
            Route::get('recordings', 'PlaylistsController@recordings')->name('recordings');

            Route::patch('secret', 'PlaylistsController@secret')->name('secret');

            Route::patch('', 'PlaylistsController@update')->name('update');

            Route::delete('', 'PlaylistsController@destroy')->name('destroy');
        });
    });
});

Route::get('url/{recording}', 'PlayerController@url')->name('url');

Route::get('qrcode', 'PlayerController@qrcode')->name('qrcode');

Route::middleware('token.play')->get('{token}', 'PlayerController@show')->name('show');

