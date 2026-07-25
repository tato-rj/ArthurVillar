<?php

namespace Tests;

use Illuminate\Contracts\Console\Kernel;
use RuntimeException;

trait CreatesApplication
{
    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        /*
         * Never load the application's local/production config cache in tests.
         * A cached database connection would otherwise override phpunit.xml and
         * allow DatabaseMigrations to operate on the developer's real database.
         */
        $testingConfigCache = dirname(__DIR__).'/bootstrap/cache/config-testing.php';

        putenv('APP_CONFIG_CACHE='.$testingConfigCache);
        $_ENV['APP_CONFIG_CACHE'] = $testingConfigCache;
        $_SERVER['APP_CONFIG_CACHE'] = $testingConfigCache;

        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Kernel::class)->bootstrap();

        $connection = $app['config']->get('database.default');
        $database = $app['config']->get("database.connections.{$connection}.database");

        if (! $app->environment('testing') || $connection !== 'sqlite' || $database !== ':memory:') {
            throw new RuntimeException(
                'Unsafe test database configuration. Tests must use the in-memory SQLite database.'
            );
        }

        return $app;
    }
}
