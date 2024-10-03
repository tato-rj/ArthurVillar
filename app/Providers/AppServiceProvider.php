<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\Paginator;
use App\Models\{Period, Country};

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        \View::composer(['recordings.create', 'recordings.edit.index'], function($view) {
            $view->with([
                'periods' => Period::with('composers')->orderBy('starts_in')->get(),
                'ensembles' => sort(['solo', 'vocal', 'orchestral', 'chamber', 'concerto', 'string quartet'])
            ]);
        });

        \View::composer(['composers.create', 'composers.edit'], function($view) {
            $view->with([
                'countries' => Country::orderBy('name')->get()->groupByFirstLetter('name')
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
        \Blade::include('components.flag');

        \Blade::include('components.delete');
        \Blade::include('components.pagetitle');
        \Blade::include('components.cropper');
    }
}
