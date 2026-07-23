<?php 

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for('calendar.home', function (BreadcrumbTrail $trail) {
    $trail->push('Calendar', route('calendar.home'));
});

Breadcrumbs::for('calendar.breaks.index', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('Breaks', route('calendar.breaks.index'));
});

Breadcrumbs::for('calendar.events.index', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('General Events', route('calendar.events.index'));
});

Breadcrumbs::for('calendar.events.google', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('Google Events', route('calendar.events.google'));
});

Breadcrumbs::for('calendar.expenses.index', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('Expenses', route('calendar.expenses.index'));
});

Breadcrumbs::for('calendar.expenses.report', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.expenses.index');
    $trail->push('Financial Report', route('calendar.expenses.report'));
});

Breadcrumbs::for('calendar.holidays.index', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('Holidays', route('calendar.holidays.index'));
});

Breadcrumbs::for('calendar.invitations.index', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('Invitations', route('calendar.invitations.index'));
});

Breadcrumbs::for('calendar.invitations.create', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.invitations.index');
    $trail->push('New Invitation', route('calendar.invitations.create'));
});

Breadcrumbs::for('calendar.invitations.edit', function (BreadcrumbTrail $trail, $invitation) {
    $trail->parent('calendar.invitations.index');
    $trail->push('Edit Invitation', route('calendar.invitations.edit', $invitation));
});

Breadcrumbs::for('calendar.lesson-plans.index', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('Recurring Lesson Plans', route('calendar.lesson-plans.index'));
});

Breadcrumbs::for('calendar.lessons.index', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('Lessons', route('calendar.lessons.index'));
});

Breadcrumbs::for('calendar.lessons.student', function (BreadcrumbTrail $trail, $student) {
    $trail->parent('calendar.lessons.index');
    $trail->push($student->full_name, route('calendar.lessons.student', $student));
});

Breadcrumbs::for('calendar.locations.index', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('Locations', route('calendar.locations.index'));
});

Breadcrumbs::for('calendar.recitals.index', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('Recitals', route('calendar.recitals.index'));
});

Breadcrumbs::for('calendar.students.index', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('Students', route('calendar.students.index'));
});

Breadcrumbs::for('calendar.students.edit', function (BreadcrumbTrail $trail, $student) {
    $trail->parent('calendar.students.index');
    $trail->push($student->full_name, route('calendar.students.edit', $student));
});

Breadcrumbs::for('calendar.venues.index', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('Venues', route('calendar.venues.index'));
});

Breadcrumbs::for('calendar.waiting-list.index', function (BreadcrumbTrail $trail) {
    $trail->parent('calendar.home');
    $trail->push('Waiting List', route('calendar.waiting-list.index'));
});

Breadcrumbs::for('listening.home', function (BreadcrumbTrail $trail) {
    $trail->push('Recordings', route('listening.home'));
});

Breadcrumbs::for('listening.recordings.edit', function (BreadcrumbTrail $trail, $recording) {
    $trail->parent('listening.home');
    $trail->push('Edit', route('listening.recordings.edit', $recording));
});

Breadcrumbs::for('listening.composers.index', function (BreadcrumbTrail $trail) {
    $trail->push('Composers', route('listening.composers.index'));
});

Breadcrumbs::for('listening.composers.edit', function (BreadcrumbTrail $trail, $composer) {
    $trail->parent('listening.composers.index');
    $trail->push('Edit', route('listening.composers.edit', $composer));
});

Breadcrumbs::for('listening.playlists.index', function (BreadcrumbTrail $trail) {
    $trail->push('Playlists', route('listening.playlists.index'));
});

Breadcrumbs::for('listening.playlists.recordings', function (BreadcrumbTrail $trail, $playlist) {
    $trail->parent('listening.playlists.index');
    $trail->push('Recordings', route('listening.playlists.recordings', $playlist));
});
