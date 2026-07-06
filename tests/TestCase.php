<?php

namespace Tests;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\ExceptionHandling;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, DatabaseMigrations, ExceptionHandling;
}
