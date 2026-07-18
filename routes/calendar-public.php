<?php

use Illuminate\Support\Facades\Route;

Route::prefix('invitations')->name('invitations.')->group(function () {
    Route::get('{invitation:public_id}', 'PublicInvitationsController@show')
        ->whereUuid('invitation')
        ->name('public');

    Route::post('{invitation:public_id}', 'PublicInvitationsController@store')
        ->whereUuid('invitation')
        ->name('responses.store');
});
