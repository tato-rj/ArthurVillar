<?php

use Illuminate\Support\Facades\Route;

Route::get('', 'AdminController@index')->name('home');

Route::prefix('users')->name('users.')->group(function() {
	Route::get('', 'UsersController@index')->name('index');

	Route::prefix('accounts')->name('accounts.')->group(function () {
	    Route::get('{user}', 'UsersController@show')->name('show');
	    Route::get('{user}/edit', 'UsersController@edit')->name('edit');
	    Route::patch('{user}', 'UsersController@update')->name('update');
	    Route::delete('{user}', 'UsersController@destroy')->name('destroy');
	});
});

Route::prefix('theory')->name('theory.')->namespace('Theory')->group(function () {
    Route::get('audio', 'TheoryController@audio')->name('audio.index');
    Route::get('tournaments', 'TheoryController@tournaments')->name('tournaments.index');
    Route::get('stats', 'TheoryController@stats')->name('stats.index');

    Route::prefix('mic')->name('mic.')->group(function () {
        Route::get('', 'MicrophoneController@index')->name('index');
        Route::patch('', 'MicrophoneController@update')->name('update');
    });

    Route::prefix('leaderboard')->name('leaderboard.')->group(function () {
        Route::get('', 'LeaderboardsController@index')->name('index');
        Route::get('show', 'LeaderboardsController@show')->name('show');
        Route::delete('{player}', 'LeaderboardsController@destroy')->name('destroy');
    });
});

// Route::name('listening.')->group(function() {
// 	Route::prefix('recordings')->name('recordings.')->group(function() {
		
		
// 		Route::post('', 'RecordingsController@store')->name('store');

// 	    Route::prefix('{recording}')->group(function() {
// 	        Route::get('', 'RecordingsController@edit')->name('edit');

// 	        Route::get('qrcode', 'RecordingsController@qrcode')->name('qrcode');

// 	        Route::patch('', 'RecordingsController@update')->name('update');

//     		Route::patch('playlists', 'RecordingsController@playlists')->name('playlists');
	        		
// 	        Route::delete('', 'RecordingsController@destroy')->name('destroy');
// 	    });
// 	});
// });

