<?php

namespace Database\Seeders;

use App\Models\Calendar\Invitation;
use App\Models\Calendar\InvitationOption;
use Illuminate\Database\Seeder;

class InvitationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Invitation::factory()
            ->count(8)
            ->create()
            ->each(function (Invitation $invitation) {
                InvitationOption::factory()
                    ->count(4)
                    ->for($invitation)
                    ->create();
            });
    }
}
