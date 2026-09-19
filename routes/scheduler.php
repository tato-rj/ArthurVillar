<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'SchedulersController@index')
    ->middleware('auth')
    ->name('home');

Route::middleware('signed')->prefix('schedulers')->name('schedulers.')->group(function () {
    Route::get('{scheduler:public_id}/respond', 'PublicSchedulersController@show')
        ->whereUuid('scheduler')
        ->name('public');

    Route::post('{scheduler:public_id}/respond', 'PublicSchedulersController@store')
        ->whereUuid('scheduler')
        ->name('responses.store');
});

Route::middleware('auth')->prefix('schedulers')->name('schedulers.')->group(function () {
    Route::get('index', 'SchedulersController@index')->name('index');
    Route::get('table', 'SchedulerTablesController@index')->name('table');
    Route::get('', 'CreateSchedulerController')->name('create');
    Route::post('', 'SchedulersController@store')->name('store');

    Route::prefix('{scheduler}')->group(function () {
        Route::get('responses', 'SchedulersController@results')->name('results');
        Route::delete('participants/{participant}', 'SchedulersController@destroyParticipant')
            ->name('participants.destroy');
        Route::get('', 'SchedulersController@edit')->name('edit');
        Route::patch('', 'SchedulersController@update')->name('update');
        Route::delete('', 'SchedulersController@destroy')->name('destroy');
    });
});
