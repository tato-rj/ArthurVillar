<?php

namespace Tests\Feature;

use Tests\BaseTest;

class CalendarPublicPagesTest extends BaseTest
{
    /** @test */
    public function calendar_information_pages_are_public_and_linked_together()
    {
        $pages = [
            'calendar.about' => 'A private scheduling application',
            'calendar.privacy' => 'Privacy Policy',
            'calendar.terms' => 'Terms of Service',
        ];

        foreach ($pages as $route => $content) {
            $this->get(route($route))
                ->assertOk()
                ->assertSee($content)
                ->assertSee(route('calendar.about'), false)
                ->assertSee(route('calendar.privacy'), false)
                ->assertSee(route('calendar.terms'), false);
        }
    }

    /** @test */
    public function the_privacy_policy_discloses_google_calendar_data_practices()
    {
        $this->get(route('calendar.privacy'))
            ->assertOk()
            ->assertSee('Google Calendar event information')
            ->assertSee('read-only')
            ->assertSee('encrypted at rest')
            ->assertSee('does not sell Google user data')
            ->assertSee('Limited Use requirements')
            ->assertSee('Disconnecting an account');
    }
}
