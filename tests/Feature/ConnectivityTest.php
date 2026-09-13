<?php

namespace Tests\Feature;

use Tests\TestCase;

class ConnectivityTest extends TestCase
{
    public function test_connectivity_probes_return_uncacheable_success_responses()
    {
        foreach (['calendar.connectivity', 'theory.connectivity'] as $route) {
            $response = $this->get(route($route))
                ->assertNoContent()
                ->assertHeader('X-Connectivity', 'online');

            $this->assertStringContainsString(
                'no-store',
                $response->headers->get('Cache-Control')
            );
        }

        $this->get('http://'.config('app.domain').'/_connectivity')
            ->assertNotFound();
    }

    public function test_offline_state_is_only_rendered_on_supported_subdomains()
    {
        $this->get(route('home'))
            ->assertOk()
            ->assertDontSee('data-offline-state', false)
            ->assertDontSee(mix('css/offline.css'), false)
            ->assertDontSee(mix('js/offline.js'), false);

        $this->get(route('calendar.about'))
            ->assertOk()
            ->assertSee('data-offline-state', false)
            ->assertSee(mix('css/offline.css'), false)
            ->assertSee(mix('js/offline.js'), false)
            ->assertSee('btn btn-primary offline-state__retry', false);

        $this->get(route('theory.home'))
            ->assertOk()
            ->assertSee('data-offline-state', false)
            ->assertSee(mix('css/offline.css'), false)
            ->assertSee(mix('js/offline.js'), false)
            ->assertSee('btn btn-primary offline-state__retry', false);
    }
}
