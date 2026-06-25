<?php 

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

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