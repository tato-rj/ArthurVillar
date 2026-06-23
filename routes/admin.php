<?php

use Illuminate\Support\Facades\Route;

Route::name('admin.')->group(function() {
	Route::get('', 'AdminController@index')->name('index');

	Route::name('theory.')->group(function() {
		Route::get('sound-effects', 'SoundController@index')->name('sound-effects.index');

		// Route::prefix('leaderboard')->name('leaderboard.')->group(function() {
		// 	Route::get('', 'LeaderboardsController@index')->name('index');

		// 	Route::get('edit', 'LeaderboardsController@edit')->name('edit');

		// 	Route::post('fake', 'LeaderboardsController@fake')->name('fake');

		// 	Route::delete('{player}', 'LeaderboardsController@destroy')->name('destroy');
		// });
	});

	Route::name('listening.')->group(function() {
		Route::prefix('recordings')->name('recordings.')->group(function() {
			Route::get('', 'RecordingsController@index')->name('index');
			
			Route::post('', 'RecordingsController@store')->name('store');

		    Route::prefix('{recording}')->group(function() {
		        Route::get('', 'RecordingsController@edit')->name('edit');

		        Route::get('qrcode', 'RecordingsController@qrcode')->name('qrcode');

		        Route::patch('', 'RecordingsController@update')->name('update');

        		Route::patch('playlists', 'RecordingsController@playlists')->name('playlists');
		        		
		        Route::delete('', 'RecordingsController@destroy')->name('destroy');
		    });
		});
	});
});
