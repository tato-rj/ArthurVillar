<?php

use Illuminate\Support\Facades\Route;

Route::namespace('Theory')->prefix('theory')->name('theory.')->group(function() {
	Route::get('', 'TheoryController@index')->name('index');

	Route::get('intervals', 'IntervalsController@index')->name('intervals.index');
});