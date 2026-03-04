<?php

use Illuminate\Support\Facades\Route;

Route::prefix('theory')->name('theory.')->group(function() {
	Route::get('', 'TheoryController@index')->name('index');

	Route::get('intervals', 'TheoryController@intervals')->name('intervals.play');

	Route::get('tone-trek', 'TheoryController@toneTrek')->name('tone-trek.play');

	Route::get('chords', 'TheoryController@chords')->name('chords.play');

	Route::get('dictation', 'TheoryController@dictation')->name('dictation.play');
});