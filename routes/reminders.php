<?php

use Illuminate\Support\Facades\Route;

Route::get('', 'RemindersController@index')->name('index');
