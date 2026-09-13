<?php

use Illuminate\Support\Facades\Route;

Route::get('/_connectivity', function () {
    return response('', 204)
        ->header('X-Connectivity', 'online')
        ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
})->name('connectivity');

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
