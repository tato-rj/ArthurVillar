<?php

use Illuminate\Support\Facades\Route;


Route::get('', 'AdminController@index')->name('index');

Route::namespace('Listening\\')->group(function() {
	Route::prefix('recordings')->name('recordings.')->group(function() {
	    Route::get('', 'RecordingsController@index')->name('index');

	    Route::post('', 'RecordingsController@store')->name('store');

	    Route::post('listen', 'RecordingsController@listen')->name('listen');

	    Route::prefix('{recording}')->group(function() {
	        Route::get('', 'RecordingsController@edit')->name('edit');

	        Route::get('qrcode', 'RecordingsController@qrcode')->name('qrcode');

	        Route::patch('playlists', 'RecordingsController@playlists')->name('playlists');

	        Route::patch('', 'RecordingsController@update')->name('update');

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

	Route::prefix('youtube')->name('youtube.')->group(function() {
	    Route::get('', 'YoutubeController@create')->name('create');

	    Route::get('download', 'YoutubeController@download')->name('download');

	    Route::post('', 'YoutubeController@convert')->name('convert');
	});
});
