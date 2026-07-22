<?php

use Illuminate\Support\Facades\Route;

Route::view('about', 'calendar.public.about')->name('about');
Route::view('privacy', 'calendar.public.privacy')->name('privacy');
Route::view('terms', 'calendar.public.terms')->name('terms');

Route::middleware('signed')->prefix('invitations')->name('invitations.')->group(function () {
    Route::get('{invitation:public_id}/respond', 'PublicInvitationsController@show')
        ->whereUuid('invitation')
        ->name('public');

    Route::post('{invitation:public_id}/respond', 'PublicInvitationsController@store')
        ->whereUuid('invitation')
        ->name('responses.store');
});
