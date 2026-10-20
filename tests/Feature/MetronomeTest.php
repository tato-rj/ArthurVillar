<?php

namespace Tests\Feature;

use Tests\TestCase;

class MetronomeTest extends TestCase
{
    public function test_guests_can_open_the_metronome_on_its_own_subdomain()
    {
        $url = 'http://metronome.'.config('app.domain');

        $this->assertSame($url, route('metronome.index'));
        $this->get($url)
            ->assertOk()
            ->assertViewIs('metronome.index')
            ->assertSee('data-metronome', false)
            ->assertSee('120')
            ->assertSee(mix('js/music/metronome.js'), false)
            ->assertSee(mix('css/metronome.css'), false);
    }

    public function test_the_main_domain_keeps_its_homepage()
    {
        $this->get('http://'.config('app.domain').'/')
            ->assertOk()
            ->assertViewIs('welcome')
            ->assertDontSee('data-metronome', false);
    }
}
