<?php

use Illuminate\Support\Facades\Route;

Route::prefix('theory')->name('theory.')->group(function() {
	Route::get('', 'TheoryController@index')->name('index');

	Route::get('intervals', 'TheoryController@intervals')->name('intervals.play');

	Route::get('chords', 'TheoryController@chords')->name('chords.play');
});