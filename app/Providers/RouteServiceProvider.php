<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/';

    protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::middleware('api')
                ->domain(config('app.domain'))
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->domain('listening.'.config('app.domain'))
                ->namespace($this->namespace.'\\Listening')
                ->name('listening.')
                ->group(base_path('routes/listening.php'));

            Route::middleware('web')
                ->domain('theory.'.config('app.domain'))
                ->namespace($this->namespace.'\\Theory')
                ->name('theory.')
                ->group(base_path('routes/theory.php'));

            Route::middleware(['web', 'signed'])
                ->domain('calendar.'.config('app.domain'))
                ->namespace($this->namespace.'\\Calendar')
                ->name('calendar.')
                ->group(base_path('routes/calendar-public.php'));

            Route::middleware(['web', 'auth'])
                ->domain('calendar.'.config('app.domain'))
                ->namespace($this->namespace.'\\Calendar')
                ->name('calendar.')
                ->group(base_path('routes/calendar.php'));

            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
