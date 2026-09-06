<?php

use Illuminate\Support\Facades\Route;

Route::get('', 'PianoAtlasController@grand')->name('grand');

Route::get('upright', 'PianoAtlasController@upright')->name('upright');

Route::get('action', 'PianoAtlasController@action')->name('action');
