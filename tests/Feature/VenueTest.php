<?php

namespace Tests\Feature;

use App\Models\Venue;
use Tests\BaseTest;

class VenueTest extends BaseTest
{
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
            'address' => '10 Music Avenue',
            'city' => 'Brooklyn',
            'state' => 'NY',
            'postal_code' => '11201',
            'map_url' => 'https://maps.google.com/?q=Carnegie+Room',
        ])->assertRedirect();

        $venue = Venue::where('name', 'Carnegie Room')->firstOrFail();

        $this->patch(route('studio.venues.update', $venue), [
            'name' => 'Carnegie Hall',
            'address' => '11 Music Avenue',
            'city' => 'New York',
            'state' => 'NY',
            'postal_code' => '10001',
            'map_url' => 'https://maps.google.com/?q=Carnegie+Hall',
        ])->assertRedirect();

        $this->assertDatabaseHas('venues', [
            'id' => $venue->id,
            'name' => 'Carnegie Hall',
            'address' => '11 Music Avenue',
            'city' => 'New York',
            'map_url' => 'https://maps.google.com/?q=Carnegie+Hall',
        ]);

        $this->delete(route('studio.venues.destroy', $venue))->assertRedirect();
        $this->assertDatabaseMissing('venues', ['id' => $venue->id]);
    }

    /** @test */
    public function it_serves_venues_to_the_studio_table()
    {
        $venue = Venue::factory()->create([
            'name' => 'Performance Space',
            'address' => '50 Broadway',
            'city' => 'New York',
            'state' => 'NY',
            'postal_code' => '10004',
            'map_url' => 'https://maps.google.com/?q=Performance+Space',
        ]);
        $this->signIn();

        $row = collect($this->getJson(route('studio.tables.venues'))->assertOk()->json('data'))
            ->firstWhere('id', $venue->id);

        $this->assertSame('Performance Space', $row['name']);
        $this->assertSame('50 Broadway', $row['address']);
        $this->assertSame('https://maps.google.com/?q=Performance+Space', $row['map_url']);
    }
}
