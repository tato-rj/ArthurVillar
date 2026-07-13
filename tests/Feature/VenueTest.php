<?php

namespace Tests\Feature;

use App\Models\Venue;
use Tests\BaseTest;

class VenueTest extends BaseTest
{
    /** @test */
    public function it_generates_a_google_maps_url_for_its_address()
    {
        $venue = new Venue([
            'name' => 'Performance & Arts Center',
            'address_line_1' => '10 Music Avenue',
            'address_line_2' => 'Second Floor',
            'city' => 'Brooklyn',
            'state' => 'NY',
            'postal_code' => '11201',
        ]);

        $this->assertSame(
            'https://www.google.com/maps/search/?api=1&query=10%20Music%20Avenue%2C%20Second%20Floor%2C%20Brooklyn%2C%20NY%2C%2011201',
            $venue->googleMapsUrl()
        );
    }

    /** @test */
    public function it_uses_its_name_for_the_google_maps_url_when_it_has_no_address()
    {
        $venue = new Venue(['name' => 'Performance & Arts Center']);

        $this->assertSame(
            'https://www.google.com/maps/search/?api=1&query=Performance%20%26%20Arts%20Center',
            $venue->googleMapsUrl()
        );
    }

    /** @test */
    public function it_shows_the_venues_page_and_create_modal()
    {
        $this->signIn();

        $this->get(route('studio.venues.index'))
            ->assertOk()
            ->assertSee('New venue')
            ->assertSee('create-venue-modal', false);
    }

    /** @test */
    public function it_creates_updates_and_deletes_a_venue()
    {
        $this->signIn();

        $this->post(route('studio.venues.store'), [
            'name' => 'Carnegie Room',
            'address_line_1' => '10 Music Avenue',
            'address_line_2' => 'Second Floor',
            'city' => 'Brooklyn',
            'state' => 'NY',
            'postal_code' => '11201',
        ])->assertRedirect();

        $venue = Venue::where('name', 'Carnegie Room')->firstOrFail();

        $this->patch(route('studio.venues.update', $venue), [
            'name' => 'Carnegie Hall',
            'address_line_1' => '11 Music Avenue',
            'city' => 'New York',
            'state' => 'NY',
            'postal_code' => '10001',
        ])->assertRedirect();

        $this->assertDatabaseHas('venues', [
            'id' => $venue->id,
            'name' => 'Carnegie Hall',
            'address_line_1' => '11 Music Avenue',
            'city' => 'New York',
        ]);

        $this->delete(route('studio.venues.destroy', $venue))->assertRedirect();
        $this->assertDatabaseMissing('venues', ['id' => $venue->id]);
    }

    /** @test */
    public function it_serves_venues_to_the_studio_table()
    {
        $venue = Venue::factory()->create([
            'name' => 'Performance Space',
            'address_line_1' => '50 Broadway',
            'city' => 'New York',
            'state' => 'NY',
            'postal_code' => '10004',
        ]);
        $this->signIn();

        $row = collect($this->getJson(route('studio.tables.venues'))->assertOk()->json('data'))
            ->firstWhere('id', $venue->id);

        $this->assertSame('Performance Space', $row['name']);
        $this->assertSame('50 Broadway', $row['address']);
        $this->assertSame(
            'https://www.google.com/maps/search/?api=1&query=50%20Broadway%2C%20New%20York%2C%20NY%2C%2010004',
            $row['google_maps_url']
        );
    }
}
