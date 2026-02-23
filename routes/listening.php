<?php

use Illuminate\Support\Facades\Route;

Route::prefix('listening')->name('recordings.')->group(function() {
    Route::post('url/{recording}', 'PlayerController@url')->name('url');

    Route::get('qrcode', 'PlayerController@qrcode')->name('qrcode');
    
    Route::domain(config('app.url'))->middleware('token.play')->get('{token}', 'PlayerController@show')->name('show');
});
