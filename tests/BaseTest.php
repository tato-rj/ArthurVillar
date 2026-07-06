<?php

namespace Tests;

use App\Models\User;

class BaseTest extends TestCase
{   
	public function setUp() : void
	{
		parent::setUp();

        \Storage::fake('public');
	}

    protected function signIn($role = null, $user = null)
    {
        $user = $user ?? User::factory()->create();

        $this->actingAs($user);

        return $user;
    }

    protected function logout()
    {
        \Auth::logout();
    }
}
