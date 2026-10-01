<?php

use Illuminate\Support\Facades\Route;

Route::get('/_connectivity', function () {
	return response('', 204)
		->header('X-Connectivity', 'online')
		->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
})->name('connectivity');

Route::middleware('auth')->group(function() {
	Route::get('audio', 'TheoryController@audio')->name('audio.index');

	Route::get('tournaments', 'TheoryController@home')->name('tournaments.index');

	Route::get('stats', 'TheoryController@home')->name('stats.index');

	Route::prefix('mic')->name('mic.')->middleware('arthur')->group(function() {
		Route::get('', 'MicrophoneController@index')->name('index');

		Route::patch('', 'MicrophoneController@update')->name('update');
	});

	Route::prefix('leaderboard')->name('leaderboard.')->group(function() {
		Route::get('', 'LeaderboardsController@index')->name('index');

		Route::delete('{player}', 'LeaderboardsController@destroy')->name('destroy');
	});
});

Route::get('', 'TheoryController@home')->name('home');

Route::get('open-staff', 'TheoryController@openStaff')->name('open-staff.play');

Route::get('intervals', 'TheoryController@intervalsLab');

Route::get('intervals-lab', 'TheoryController@intervalsLab')->name('intervals-lab.play');

Route::get('keys-lab', 'TheoryController@keysLab')->name('keys-lab.play');

Route::get('tone-trek', 'TheoryController@toneTrek')->name('tone-trek.play');

Route::get('chords-lab', 'TheoryController@chordsLab')->name('chords-lab.play');

Route::get('pitch-detective', 'TheoryController@pitchDetective')->name('pitch-detective.play');

Route::get('chord-detective', 'TheoryController@chordDetective')->name('chord-detective.play');

Route::get('note-python', 'TheoryController@notePython')->name('note-python.play');

Route::get('note-nest', 'TheoryController@noteNest')->name('note-nest.play');

Route::get('note-match', 'TheoryController@noteMatch')->name('note-match.play');

Route::get('memory-wizard', 'TheoryController@memoryWizard')->name('memory-wizard.play');

Route::get('beat-hero', 'TheoryController@beatHero')->name('beat-hero.play');

Route::prefix('leaderboard')->name('leaderboard.')->group(function() {
	Route::get('show', 'LeaderboardsController@show')->name('show');

	Route::get('final-points', 'LeaderboardsController@finalPoints')->name('final-points');
	
	Route::post('', 'LeaderboardsController@store')->name('store');
});

// Anonymous Duel endpoints use the web session and CSRF protection, not auth middleware.
Route::prefix('duels')->name('duels.')->group(function () {
    Route::post('', 'DuelController@store')->middleware('throttle:10,1,duel-create:')->block(10, 10)->name('store');
    Route::post('join', 'DuelController@join')->middleware('throttle:15,1,duel-join:')->block(10, 10)->name('join');
    Route::post('broadcast-auth', 'DuelController@authorizeChannel')->middleware('throttle:60,1,duel-auth:')->name('broadcast-auth');
    Route::get('{duel}', 'DuelController@show')->middleware('throttle:120,1,duel-state:')->name('show');
    Route::post('{duel}/answer', 'DuelController@answer')->middleware('throttle:120,1,duel-answer:')->name('answer');
    Route::post('{duel}/{action}', 'DuelController@update')
        ->where('action', 'ready|progress|finish|rematch|cancel|leave|heartbeat|connect|depart')->middleware('throttle:120,1,duel-update:')->name('update');
});
