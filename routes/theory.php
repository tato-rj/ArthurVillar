<?php

use Illuminate\Support\Facades\Route;

Route::prefix('theory')->name('theory.')->group(function() {
	Route::get('', 'TheoryController@index')->name('index');

	Route::get('intervals', 'TheoryController@intervalsLab');

	Route::get('intervals-lab', 'TheoryController@intervalsLab')->name('intervals-lab.play');

	Route::get('tone-trek', 'TheoryController@toneTrek')->name('tone-trek.play');

	Route::get('chords-lab', 'TheoryController@chordsLab')->name('chords-lab.play');

	Route::get('pitch-detective', 'TheoryController@pitchDetective')->name('pitch-detective.play');

	Route::get('tone-snake', 'TheoryController@toneSnake')->name('tone-snake.play');
});