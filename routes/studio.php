<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'StudioController@index')->name('home');

Route::get('financial-report', 'StudioController@report')->name('financial.report');

Route::prefix('students')->name('students.')->group(function() {
	Route::get('', 'StudentsController@index')->name('index');

	Route::get('create', 'StudentsController@create')->name('create');

	Route::post('', 'StudentsController@store')->name('store');

	Route::prefix('{student}')->group(function() {
		Route::get('edit', 'StudentsController@edit')->name('edit');

		Route::patch('', 'StudentsController@update')->name('update');

		Route::delete('', 'StudentsController@destroy')->name('destroy');
	});
});

Route::prefix('lesson-plans')->name('lesson-plans.')->group(function() {
	Route::post('', 'LessonPlansController@store')->name('store');

	Route::post('reschedule', 'LessonPlansController@reschedule')->name('reschedule');

	Route::prefix('{lessonPlan}')->group(function() {
		Route::post('close', 'LessonPlansController@close')->name('close');
		Route::post('duplicate', 'LessonPlansController@duplicate')->name('duplicate');

		Route::patch('', 'LessonPlansController@update')->name('update');
		Route::delete('', 'LessonPlansController@destroy')->name('destroy');
	});
});

Route::prefix('breaks')->name('breaks.')->group(function() {
	Route::get('', 'TeachingBreaksController@index')->name('index');
	Route::get('impact', 'TeachingBreaksController@impact')->name('impact');

	Route::post('', 'TeachingBreaksController@store')->name('store');

	Route::prefix('{break}')->group(function() {
		Route::patch('', 'TeachingBreaksController@update')->name('update');

		Route::delete('', 'TeachingBreaksController@destroy')->name('destroy');
	});
});

Route::prefix('payments')->name('payments.')->group(function() {
	Route::get('', 'PaymentsController@index')->name('index');
});

Route::prefix('lessons')->name('lessons.')->group(function() {
	Route::get('', 'LessonsController@index')->name('index');

	Route::get('students/{student}', 'LessonsController@student')->name('student');

	Route::post('', 'LessonsController@store')->name('store');

	Route::post('cancel', 'LessonsController@cancel')->name('cancel');

	Route::prefix('{lesson}')->group(function() {
		Route::get('', 'LessonsController@edit')->name('edit');

		Route::prefix('payments')->name('payment.')->group(function() {
			Route::post('', 'PaymentsController@store')->name('store');
		});
	});
});

Route::prefix('tables')->name('tables.')->group(function() {
	Route::get('breaks', 'TablesController@breaks')->name('breaks');
	Route::get('lessons', 'TablesController@lessons')->name('lessons');
	Route::get('payments', 'TablesController@payments')->name('payments');

	Route::get('students', 'TablesController@students')->name('students');
});
