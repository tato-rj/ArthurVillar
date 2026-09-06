<?php

use Illuminate\Support\Facades\Route;

Route::get('', 'PianoController@index')->name('home');
