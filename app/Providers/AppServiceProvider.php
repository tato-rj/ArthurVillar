<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\Paginator;
use App\Models\{Location, Student};
use App\Models\Listening\{Period, Country};

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        \View::composer('layouts.menu.nav', function($view) {
            $protocol = local() ? 'http://' : 'https://';

            $view->with([
                'subdomains' => [
                    [
                        'icon' => 'headphones',
                        'label' => 'Listening',
                        'url' => $protocol . 'listening.' . config('app.domain')
                    ],
                    [
                        'icon' => 'calendar-days',
                        'label' => 'Studio',
                        'url' => $protocol . 'studio.' . config('app.domain')
                    ],
                    [
                        'icon' => 'book',
                        'label' => 'Theory',
                        'url' => $protocol . 'theory.' . config('app.domain')
                    ]
                ]
            ]);
        });

        \View::composer(['listening.recordings.create', 'listening.recordings.edit.index', 'listening.playlists.recordings.index'], function($view) {
            $ensembles = ['solo', 'opera', 'vocal', 'choir', 'orchestral', 'chamber', 'concerto'];
            sort($ensembles);

            $view->with([
                'periods' => Period::with('composers')->orderBy('starts_in')->get(),
                'ensembles' => $ensembles
            ]);
        });

        \View::composer(['listening.composers.create', 'listening.composers.edit'], function($view) {
            $view->with([
                'countries' => Country::orderBy('name')->get()->groupByFirstLetter('name')
            ]);
        });

        \View::composer(['studio.lessonPlans.create', 'studio.lessonPlans.edit', 'studio.singleLessonPlans.create', 'studio.students.create', 'studio.students.edit'], function($view) {
            $view->with([
                'locations' => Location::query()
                    ->where('is_active', true)
                    ->orderBy('name')
                    ->get()
            ]);
        });

        \View::composer('studio.singleLessonPlans.create', function($view) {
            $view->with([
                'students' => Student::query()
                    ->with('location')
                    ->orderBy('first_name')
                    ->orderBy('last_name')
                    ->get()
            ]);
        });

        \View::composer(['theory.leaderboards.index', 'theory.index'], function($view) {
            $view->with([
                'games' => collect([
                    new \App\Games\IntervalsLabSettings,
                    new \App\Games\ChordsLabSettings,
                    new \App\Games\PitchDetectiveSettings,
                    new \App\Games\ChordDetectiveSettings,
                    new \App\Games\ToneTrekSettings,
                    new \App\Games\NotePythonSettings,
                    new \App\Games\KeysLabSettings,
                    new \App\Games\NoteNestSettings,
                    new \App\Games\NoteMatchSettings,
                    new \App\Games\MemoryWizardSettings,
                    new \App\Games\BeatHeroSettings
                ])
            ]);
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Paginator::useBootstrapFive();
        Model::unguard();
        
        Collection::macro('groupByFirstLetter', function ($column) {
            return $this->groupBy(function($item,$key) use ($column) {
                return $item->$column[0];
            })->sortBy(function($item,$key) {
                return $key;
            });
        });

        \Blade::include('components.core.alert');
        \Blade::include('components.core.btn');
        \Blade::include('components.core.fontawesome', 'fa');
        \Blade::aliasComponent('components.core.modal');
        \Blade::aliasComponent('components.core.form', 'form');
        \Blade::include('components.core.forms.input');
        \Blade::include('components.core.forms.toggle');
        \Blade::include('components.core.forms.textarea');
        \Blade::aliasComponent('components.core.forms.select');
        \Blade::aliasComponent('components.core.forms.checkbox');
        \Blade::include('components.core.forms.radio');
        \Blade::include('components.core.forms.option');
        \Blade::include('components.core.forms.submit');
        \Blade::include('components.core.forms.label');
        \Blade::include('components.core.forms.feedback');
        \Blade::include('components.core.forms.password');
        \Blade::include('components.table.layout', 'table');
        \Blade::include('components.table.filters');
        \Blade::include('components.flag');

        \Blade::include('components.delete');
        \Blade::include('components.pagetitle');
        \Blade::include('components.cropper');
    }
}
