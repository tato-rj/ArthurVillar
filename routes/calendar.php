<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'CalendarController@index')->name('home');

Route::patch('settings', 'SettingsController@update')->name('settings.update');

Route::prefix('google-calendar')->name('google-calendar.')->group(function() {
	Route::get('connect', 'GoogleCalendarController@connect')->name('connect');
	Route::get('callback', 'GoogleCalendarController@callback')->name('callback');
	Route::post('{connection}/sync', 'GoogleCalendarController@sync')->name('sync');
	Route::delete('{connection}', 'GoogleCalendarController@disconnect')->name('disconnect');
});

Route::get('financial-report', 'CalendarController@report')->name('financial.report');

Route::prefix('invitations')->name('invitations.')->group(function() {
	Route::get('index', 'InvitationsController@index')->name('index');
	Route::get('', 'CreateInvitationController')->name('create');
	Route::post('', 'InvitationsController@store')->name('store');

	Route::prefix('{invitation}')->group(function() {
		Route::get('responses', 'InvitationsController@results')->name('results');
		Route::get('', 'InvitationsController@edit')->name('edit');
		Route::patch('', 'InvitationsController@update')->name('update');
		Route::delete('', 'InvitationsController@destroy')->name('destroy');
	});
});

Route::prefix('push-subscriptions')->name('push-subscriptions.')->group(function() {
	Route::post('', 'PushSubscriptionsController@store')->name('store');
	Route::delete('', 'PushSubscriptionsController@destroy')->name('destroy');
});

Route::prefix('students')->name('students.')->group(function() {
	Route::get('', 'StudentsController@index')->name('index');

	Route::get('create', 'StudentsController@create')->name('create');

	Route::post('', 'StudentsController@store')->name('store');

	Route::prefix('{student}')->group(function() {
		Route::get('missed-lessons', 'StudentsController@missedLessons')->name('missed-lessons');

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

Route::prefix('recitals')->name('recitals.')->group(function() {
	Route::get('', 'RecitalsController@index')->name('index');

	Route::post('', 'RecitalsController@store')->name('store');

	Route::prefix('{recital}')->group(function() {
		Route::get('edit', 'RecitalsController@edit')->name('edit');
		Route::patch('students', 'RecitalsController@updateStudents')->name('students.update');

		Route::patch('', 'RecitalsController@update')->name('update');

		Route::delete('', 'RecitalsController@destroy')->name('destroy');
	});
});

Route::prefix('venues')->name('venues.')->group(function() {
	Route::get('', 'VenuesController@index')->name('index');
	Route::post('', 'VenuesController@store')->name('store');

	Route::prefix('{venue}')->group(function() {
		Route::get('edit', 'VenuesController@edit')->name('edit');
		Route::patch('', 'VenuesController@update')->name('update');
		Route::delete('', 'VenuesController@destroy')->name('destroy');
	});
});

Route::prefix('expenses')->name('expenses.')->group(function() {
	Route::get('', 'ExpensesController@index')->name('index');

	Route::get('report', 'ExpensesController@report')->name('report');

	Route::post('', 'ExpensesController@store')->name('store');

	Route::prefix('{expense}')->group(function() {
		Route::get('edit', 'ExpensesController@edit')->name('edit');

		Route::patch('', 'ExpensesController@update')->name('update');

		Route::delete('', 'ExpensesController@destroy')->name('destroy');
	});
});

Route::prefix('events')->name('events.')->group(function() {
	Route::get('', 'EventsController@index')->name('index');
	Route::get('google', 'EventsController@google')->name('google');

	Route::post('', 'EventsController@store')->name('store');

	Route::prefix('{event}')->group(function() {
		Route::get('edit', 'EventsController@edit')->name('edit');
		Route::patch('reschedule', 'EventsController@reschedule')->name('reschedule');
		Route::post('revert', 'EventsController@revert')->name('revert');

		Route::patch('', 'EventsController@update')->name('update');

		Route::delete('', 'EventsController@destroy')->name('destroy');
	});
});

Route::prefix('lessons')->name('lessons.')->group(function() {
	Route::get('', 'LessonsController@index')->name('index');

	Route::get('students/{student}', 'LessonsController@student')->name('student');

	Route::post('', 'LessonsController@store')->name('store');

	Route::post('cancel', 'LessonsController@cancel')->name('cancel');

	Route::post('revert', 'LessonsController@revert')->name('revert');

	Route::post('early-payments', 'EarlyPaymentsController@store')->name('early-payments.store');

	Route::prefix('{lesson}')->group(function() {
		Route::get('', 'LessonsController@edit')->name('edit');

		Route::prefix('payments')->name('payment.')->group(function() {
			Route::post('', 'PaymentsController@store')->name('store');
		});
	});
});

Route::prefix('tables')->name('tables.')->group(function() {
	Route::get('invitations', 'TablesController@invitations')->name('invitations');
	Route::get('breaks', 'TablesController@breaks')->name('breaks');
	Route::get('expenses', 'TablesController@expenses')->name('expenses');
	Route::get('events', 'TablesController@events')->name('events');
	Route::get('google-events', 'TablesController@googleEvents')->name('google-events');
	Route::get('lesson-plans', 'TablesController@lessonPlans')->name('lesson-plans');
	Route::get('lessons', 'TablesController@lessons')->name('lessons');
	Route::get('locations', 'TablesController@locations')->name('locations');
	Route::get('recitals', 'TablesController@recitals')->name('recitals');
	Route::get('venues', 'TablesController@venues')->name('venues');
	Route::get('students', 'TablesController@students')->name('students');
	Route::get('waiting-list', 'TablesController@waitingList')->name('waiting-list');
});
