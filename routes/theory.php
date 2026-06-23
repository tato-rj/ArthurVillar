<?php

use Illuminate\Support\Facades\Route;

Route::name('theory.')->group(function() {
	Route::get('', 'TheoryController@index')->name('index');

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
});
