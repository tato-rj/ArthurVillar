<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'UsersController@index')->name('home');

Route::prefix('accounts')->name('accounts.')->group(function () {
    Route::get('{user}', 'UsersController@show')->name('show');
    Route::get('{user}/edit', 'UsersController@edit')->name('edit');
    Route::patch('{user}', 'UsersController@update')->name('update');
    Route::delete('{user}', 'UsersController@destroy')->name('destroy');
});
