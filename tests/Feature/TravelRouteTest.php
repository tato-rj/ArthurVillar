<?php

namespace Tests\Feature;

use App\Models\Calendar\Event;
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
    public function setUp(): void
    {
        parent::setUp();

        CarbonImmutable::setTestNow('2026-07-23 10:00:00');
        $token = 'travel-route-csrf-token';
        $this->withSession(['_token' => $token]);
        $this->withHeader('X-CSRF-TOKEN', $token);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        CarbonImmutable::setTestNow();

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
            'travel_mode' => 'WALK',
        ];

        $this->postJson(route('calendar.travel-route.show'), $payload)
            ->assertOk()
            ->assertJsonPath('route.mode', 'WALK')
            ->assertJsonPath('route.duration_seconds', 600)
            ->assertJsonPath('route.origin', 'Home')
            ->assertJsonPath('route.origin_is_home', true)
            ->assertJsonPath('route.arrival_at', '2026-07-24T21:00:00+00:00')
            ->assertJsonPath('route.steps.0.mode', 'WALK');

        $this->postJson(route('calendar.travel-route.show'), array_merge($payload, [
            'destination_label' => 'Montgomery Office',
        ]))
            ->assertOk()
            ->assertJsonPath('route.duration_seconds', 600)
            ->assertJsonPath('route.destination', 'Montgomery Office');

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
    public function it_uses_public_transit_by_default_without_checking_a_walking_route()
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

        Http::assertSentCount(1);
        Http::assertSent(fn (Request $request) => $request['travelMode'] === 'TRANSIT'
            && $request['arrivalTime'] === '2026-07-24T21:00:00Z');
    }

    /** @test */
    public function it_calculates_a_driving_route_when_the_event_requests_driving_directions()
    {
        config(['calendar.google_routes.api_key' => 'test-key']);
        $this->signIn();

        Location::factory()->create([
            'name' => 'Home',
            'address' => '80 Erie St',
            'city' => 'Jersey City',
            'state' => 'NJ',
        ]);
        Http::fake([
            'routes.googleapis.com/*' => Http::response([
                'routes' => [[
                    'duration' => '900s',
                    'distanceMeters' => 6400,
                    'legs' => [['steps' => [[
                        'travelMode' => 'DRIVE',
                        'staticDuration' => '900s',
                    ]]]],
                ]],
            ]),
        ]);

        $this->postJson(route('calendar.travel-route.show'), [
            'event_key' => 'general-event-51-2026-07-24',
            'arrival_at' => '2026-07-24T17:00:00',
            'destination_address' => 'Lincoln Center, New York, NY',
            'destination_label' => 'Lincoln Center',
            'travel_mode' => 'DRIVE',
        ])
            ->assertOk()
            ->assertJsonPath('route.mode', 'DRIVE')
            ->assertJsonPath('route.duration_seconds', 900)
            ->assertJsonPath('route.steps.0.mode', 'DRIVE');

        Http::assertSentCount(1);
        Http::assertSent(fn (Request $request) => $request['travelMode'] === 'DRIVE');
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

        $nextMorningOrigin = app(CalendarTravelOrigin::class)->before(
            $date->addDay()->setTime(9, 0),
            null
        );

        $this->assertSame($home->full_address, $nextMorningOrigin['address']);

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

    /** @test */
    public function it_hides_travel_information_when_the_event_is_already_at_the_origin()
    {
        Carbon::setTestNow('2026-07-23 10:00:00');
        config(['calendar.google_routes.api_key' => 'test-key']);
        $this->signIn();
        Location::factory()->create([
            'name' => 'Home',
            'address' => '80 Erie St',
            'city' => 'Jersey City',
            'state' => 'NJ',
            'postal_code' => '07302',
        ]);
        Http::fake();

        $this->postJson(route('calendar.travel-route.show'), [
            'event_key' => 'planned-lesson-home',
            'arrival_at' => '2026-07-24T17:00:00',
            'destination_address' => '80 Erie St, Jersey City, NJ 07302',
            'destination_label' => '80 Erie St, Jersey City',
        ])->assertNoContent();

        Http::assertNothingSent();
        $this->assertSame(0, TravelRoute::count());
    }

    /** @test */
    public function it_uses_the_location_of_a_back_to_back_event_as_the_origin()
    {
        Carbon::setTestNow('2026-07-23 10:00:00');
        config(['calendar.google_routes.api_key' => 'test-key']);
        $this->signIn();
        $home = Location::factory()->create([
            'name' => 'Home',
            'address' => '80 Erie St',
            'city' => 'Jersey City',
            'state' => 'NJ',
            'postal_code' => '07302',
        ]);
        $studio = Location::factory()->create([
            'name' => 'BKCM',
            'address' => '58 7th Ave',
            'city' => 'Brooklyn',
            'state' => 'NY',
        ]);
        $date = CarbonImmutable::parse('2026-07-24', config('calendar.timezone'));

        LessonPlan::factory()->create([
            'location_id' => $studio->id,
            'weekday' => LessonPlan::fromCarbonWeekday($date->dayOfWeek),
            'starts_on' => $date->toDateString(),
            'start_time' => '14:00',
            'duration_minutes' => 60,
        ]);
        Event::factory()->create([
            'scheduled_date' => $date->toDateString(),
            'starts_at' => '16:00',
            'ends_at' => '17:00',
            'address' => $home->address,
            'city' => $home->city,
            'state' => $home->state,
            'postal_code' => $home->postal_code,
        ]);
        Http::fake();

        $this->postJson(route('calendar.travel-route.show'), [
            'event_key' => 'lesson-after-home-event',
            'arrival_at' => '2026-07-24T16:55:00',
            'destination_address' => $home->full_address,
            'destination_label' => 'Home',
        ])->assertNoContent();

        Http::assertNothingSent();
        $this->assertSame(0, TravelRoute::count());
    }

    /** @test */
    public function it_keeps_travel_information_for_a_location_change_even_after_a_long_gap()
    {
        config(['calendar.google_routes.api_key' => 'test-key']);
        $user = $this->signIn();

        Event::factory()->create([
            'scheduled_date' => '2026-07-24',
            'starts_at' => '12:20',
            'ends_at' => '13:20',
            'address' => '58 7th Ave',
            'city' => 'Brooklyn',
            'state' => 'NY',
        ]);
        Http::fake([
            'routes.googleapis.com/*' => Http::response([
                'routes' => [[
                    'duration' => '1200s',
                    'distanceMeters' => 2500,
                    'legs' => [[
                        'steps' => [[
                            'travelMode' => 'WALK',
                            'staticDuration' => '1200s',
                        ]],
                    ]],
                ]],
            ]),
        ]);

        $this->postJson(route('calendar.travel-route.show'), [
            'event_key' => 'event-after-long-gap',
            'arrival_at' => '2026-07-24T13:55:00',
            'destination_address' => '80 Erie St, Jersey City, NJ',
            'destination_label' => 'Home',
            'travel_mode' => 'WALK',
        ])
            ->assertOk()
            ->assertJsonPath('route.origin', '58 7th Ave, Brooklyn, NY')
            ->assertJsonPath('route.destination', 'Home')
            ->assertJsonPath('route.duration_seconds', 1200)
            ->assertJsonPath('route.origin_ends_at', '2026-07-24T13:20:00-04:00');

        Http::assertSentCount(1);
        $this->assertDatabaseHas('travel_routes', [
            'user_id' => $user->id,
            'event_key' => 'event-after-long-gap',
            'duration_seconds' => 1200,
        ]);
    }

    /** @test */
    public function it_calculates_a_return_home_route_departing_after_the_last_away_event()
    {
        config(['calendar.google_routes.api_key' => 'test-key']);
        $user = $this->signIn();

        Location::factory()->create([
            'name' => 'Home',
            'address' => '80 Erie St',
            'city' => 'Jersey City',
            'state' => 'NJ',
            'postal_code' => '07302',
        ]);
        Http::fake(function (Request $request) {
            if ($request['travelMode'] === 'WALK') {
                return Http::response([
                    'routes' => [[
                        'duration' => '2400s',
                        'distanceMeters' => 9000,
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
                    'distanceMeters' => 10000,
                    'legs' => [['steps' => [[
                        'travelMode' => 'TRANSIT',
                        'staticDuration' => '1800s',
                    ]]]],
                ]],
            ]);
        });

        $this->postJson(route('calendar.travel-route.return-home'), [
            'event_key' => 'general-event-50-2026-07-24',
            'departure_at' => '2026-07-24T17:00:00',
            'origin_address' => '58 7th Ave, Brooklyn, NY',
            'origin_label' => 'BKCM',
        ])
            ->assertOk()
            ->assertJsonPath('route.mode', 'TRANSIT')
            ->assertJsonPath('route.origin', 'BKCM')
            ->assertJsonPath('route.destination', 'Home')
            ->assertJsonPath('route.return_home', true)
            ->assertJsonPath('route.departure_at', '2026-07-24T21:00:00+00:00')
            ->assertJsonPath('route.arrival_at', '2026-07-24T21:30:00+00:00');

        Http::assertSent(function (Request $request) {
            return $request['travelMode'] === 'TRANSIT'
                && $request['departureTime'] === '2026-07-24T21:00:00Z'
                && ! isset($request['arrivalTime']);
        });
        $this->assertDatabaseHas('travel_routes', [
            'user_id' => $user->id,
            'event_key' => 'return-home:general-event-50-2026-07-24',
            'origin_label' => 'BKCM',
            'destination_label' => 'Home',
            'duration_seconds' => 1800,
        ]);
    }
}
