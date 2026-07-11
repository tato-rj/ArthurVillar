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

Route::prefix('waiting-list')->name('waiting-list.')->group(function() {
	Route::get('', 'WaitingListController@index')->name('index');

	Route::post('', 'WaitingListController@store')->name('store');

	Route::prefix('{waitingList}')->group(function() {
		Route::get('edit', 'WaitingListController@edit')->name('edit');
		Route::post('convert', 'WaitingListController@convert')->name('convert');

		Route::patch('', 'WaitingListController@update')->name('update');
		Route::delete('', 'WaitingListController@destroy')->name('destroy');
	});
});

Route::prefix('lesson-plans')->name('lesson-plans.')->group(function() {
	Route::get('', 'LessonPlansController@index')->name('index');

	Route::post('', 'LessonPlansController@store')->name('store');

	Route::post('reschedule', 'LessonPlansController@reschedule')->name('reschedule');

	Route::prefix('{lessonPlan}')->group(function() {
		Route::get('edit', 'LessonPlansController@edit')->name('edit');

		Route::post('duplicate', 'LessonPlansController@duplicate')->name('duplicate');

		Route::patch('', 'LessonPlansController@update')->name('update');
		Route::delete('', 'LessonPlansController@destroy')->name('destroy');
	});
});

Route::prefix('single-lesson-plans')->name('single-lesson-plans.')->group(function() {
	Route::get('', 'SingleLessonPlansController@index')->name('index');

	Route::post('', 'SingleLessonPlansController@store')->name('store');

	Route::post('reschedule', 'SingleLessonPlansController@reschedule')->name('reschedule');

	Route::prefix('{singleLessonPlan}')->group(function() {
		Route::get('edit', 'SingleLessonPlansController@edit')->name('edit');

		Route::patch('', 'SingleLessonPlansController@update')->name('update');

		Route::delete('', 'SingleLessonPlansController@destroy')->name('destroy');
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

Route::prefix('holidays')->name('holidays.')->group(function() {
	Route::get('', 'HolidaysController@index')->name('index');

	Route::prefix('{holiday}')->group(function() {
		Route::patch('', 'HolidaysController@update')->name('update');
	});
});

Route::prefix('locations')->name('locations.')->group(function() {
	Route::get('', 'LocationsController@index')->name('index');

	Route::post('', 'LocationsController@store')->name('store');

	Route::prefix('{location}')->group(function() {
		Route::get('edit', 'LocationsController@edit')->name('edit');

		Route::patch('', 'LocationsController@update')->name('update');

		Route::delete('', 'LocationsController@destroy')->name('destroy');
	});
});

Route::prefix('lessons')->name('lessons.')->group(function() {
	Route::get('', 'LessonsController@index')->name('index');

	Route::get('students/{student}', 'LessonsController@student')->name('student');

	Route::post('', 'LessonsController@store')->name('store');

	Route::post('cancel', 'LessonsController@cancel')->name('cancel');

	Route::post('revert', 'LessonsController@revert')->name('revert');

	Route::prefix('{lesson}')->group(function() {
		Route::get('', 'LessonsController@edit')->name('edit');

		Route::prefix('payments')->name('payment.')->group(function() {
			Route::post('', 'PaymentsController@store')->name('store');
		});
	});
});

Route::prefix('tables')->name('tables.')->group(function() {
	Route::get('breaks', 'TablesController@breaks')->name('breaks');
	Route::get('lesson-plans', 'TablesController@lessonPlans')->name('lesson-plans');
	Route::get('lessons', 'TablesController@lessons')->name('lessons');
	Route::get('locations', 'TablesController@locations')->name('locations');
	Route::get('single-lesson-plans', 'TablesController@singleLessonPlans')->name('single-lesson-plans');

	Route::get('students', 'TablesController@students')->name('students');
	Route::get('waiting-list', 'TablesController@waitingList')->name('waiting-list');
});
