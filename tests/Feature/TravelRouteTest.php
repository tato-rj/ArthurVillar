<?php

namespace Tests\Feature;

use App\Models\Calendar\Lesson;
use App\Models\Calendar\LessonPlan;
use App\Models\Calendar\Location;
use App\Models\Calendar\TravelRoute;
use App\Services\CalendarTravelOrigin;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\BaseTest;

class TravelRouteTest extends BaseTest
{
    protected function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    /** @test */
    public function it_calculates_and_caches_a_walking_route_from_home()
    {
        Carbon::setTestNow('2026-07-23 10:00:00');
        config(['calendar.google_routes.api_key' => 'test-key']);
        $user = $this->signIn();

        Location::factory()->create([
            'name' => 'Home',
            'address' => '80 Erie St',
            'city' => 'Jersey City',
            'state' => 'NJ',
            'postal_code' => '07302',
        ]);

        Http::fake([
            'routes.googleapis.com/*' => Http::response([
                'routes' => [[
                    'duration' => '600s',
                    'distanceMeters' => 800,
                    'legs' => [[
                        'steps' => [[
                            'travelMode' => 'WALK',
                            'staticDuration' => '600s',
                        ]],
                    ]],
                ]],
            ]),
        ]);

        $payload = [
            'event_key' => 'general-event-50-2026-07-24',
            'arrival_at' => '2026-07-24T17:00:00',
            'destination_address' => '100 Montgomery St, Jersey City, NJ',
            'destination_label' => '100 Montgomery St, Jersey City',
        ];

        $this->postJson(route('calendar.travel-route.show'), $payload)
            ->assertOk()
            ->assertJsonPath('route.mode', 'WALK')
            ->assertJsonPath('route.duration_seconds', 600)
            ->assertJsonPath('route.origin', 'Home')
            ->assertJsonPath('route.arrival_at', '2026-07-24T21:00:00+00:00')
            ->assertJsonPath('route.steps.0.mode', 'WALK');

        $this->postJson(route('calendar.travel-route.show'), $payload)
            ->assertOk()
            ->assertJsonPath('route.duration_seconds', 600);

        Http::assertSentCount(1);
        Http::assertSent(function (Request $request) {
            return $request['travelMode'] === 'WALK'
                && $request['origin']['address'] === '80 Erie St, Jersey City, NJ, 07302'
                && $request->hasHeader('X-Goog-Api-Key', 'test-key');
        });
        $this->assertDatabaseHas('travel_routes', [
            'user_id' => $user->id,
            'event_key' => $payload['event_key'],
            'travel_mode' => 'WALK',
        ]);
    }

    /** @test */
    public function it_uses_transit_when_the_walking_route_exceeds_the_threshold()
    {
        Carbon::setTestNow('2026-07-23 10:00:00');
        config(['calendar.google_routes.api_key' => 'test-key']);
        $this->signIn();

        Location::factory()->create([
            'name' => 'Home',
            'address' => '80 Erie St',
            'city' => 'Jersey City',
            'state' => 'NJ',
        ]);

        Http::fake(function (Request $request) {
            if ($request['travelMode'] === 'WALK') {
                return Http::response([
                    'routes' => [[
                        'duration' => '2400s',
                        'distanceMeters' => 3500,
                        'legs' => [['steps' => [[
                            'travelMode' => 'WALK',
                            'staticDuration' => '2400s',
                        ]]]],
                    ]],
                ]);
            }

            return Http::response([
                'routes' => [[
                    'duration' => '1800s',
                    'distanceMeters' => 4000,
                    'legs' => [['steps' => [
                        ['travelMode' => 'WALK', 'staticDuration' => '180s'],
                        [
                            'travelMode' => 'TRANSIT',
                            'staticDuration' => '1200s',
                            'transitDetails' => [
                                'transitLine' => [
                                    'nameShort' => 'PATH',
                                    'color' => '#d71920',
                                    'textColor' => '#ffffff',
                                    'vehicle' => ['type' => 'SUBWAY'],
                                ],
                                'stopCount' => 3,
                            ],
                        ],
                        ['travelMode' => 'WALK', 'staticDuration' => '420s'],
                    ]]],
                ]],
            ]);
        });

        $this->postJson(route('calendar.travel-route.show'), [
            'event_key' => 'google-event-1',
            'arrival_at' => '2026-07-24T17:00:00',
            'destination_address' => 'Lincoln Center, New York, NY',
            'destination_label' => 'Lincoln Center, New York',
        ])
            ->assertOk()
            ->assertJsonPath('route.mode', 'TRANSIT')
            ->assertJsonPath('route.duration_seconds', 1800)
            ->assertJsonPath('route.steps.1.line_name', 'PATH')
            ->assertJsonPath('route.steps.1.vehicle_type', 'SUBWAY');

        Http::assertSentCount(2);
        Http::assertSent(fn (Request $request) => $request['travelMode'] === 'TRANSIT'
            && $request['arrivalTime'] === '2026-07-24T21:00:00Z');
    }

    /** @test */
    public function it_uses_the_last_non_canceled_calendar_event_as_the_origin()
    {
        Carbon::setTestNow('2026-07-23 10:00:00');
        $home = Location::factory()->create([
            'name' => 'Home',
            'address' => '80 Erie St',
            'city' => 'Jersey City',
            'state' => 'NJ',
        ]);
        $studio = Location::factory()->create([
            'name' => 'BKCM',
            'address' => '58 7th Ave',
            'city' => 'Brooklyn',
            'state' => 'NY',
        ]);
        $date = CarbonImmutable::parse('2026-07-24', config('calendar.timezone'));
        $lessonPlan = LessonPlan::factory()->create([
            'location_id' => $studio->id,
            'weekday' => LessonPlan::fromCarbonWeekday($date->dayOfWeek),
            'starts_on' => $date->toDateString(),
            'start_time' => '12:00',
            'duration_minutes' => 60,
        ]);

        $origin = app(CalendarTravelOrigin::class)->before(
            $date->setTime(17, 0),
            null
        );

        $this->assertSame('58 7th Ave, Brooklyn, NY', $origin['address']);

        Lesson::factory()->lessonPlan($lessonPlan)->create([
            'starts_at' => '2026-07-24 12:00:00',
            'ends_at' => '2026-07-24 13:00:00',
            'canceled_at' => '2026-07-23 12:00:00',
        ]);

        $origin = app(CalendarTravelOrigin::class)->before(
            $date->setTime(17, 0),
            null
        );

        $this->assertSame($home->full_address, $origin['address']);
    }

    /** @test */
    public function it_does_not_call_google_when_the_routes_api_is_not_configured()
    {
        Carbon::setTestNow('2026-07-23 10:00:00');
        config(['calendar.google_routes.api_key' => null]);
        $this->signIn();
        Location::factory()->create([
            'name' => 'Home',
            'address' => '80 Erie St',
            'city' => 'Jersey City',
            'state' => 'NJ',
        ]);
        Http::fake();

        $this->postJson(route('calendar.travel-route.show'), [
            'event_key' => 'event-1',
            'arrival_at' => '2026-07-24T17:00:00',
            'destination_address' => '100 Montgomery St, Jersey City, NJ',
            'destination_label' => '100 Montgomery St, Jersey City',
        ])->assertNoContent();

        Http::assertNothingSent();
        $this->assertSame(0, TravelRoute::count());
    }
}
