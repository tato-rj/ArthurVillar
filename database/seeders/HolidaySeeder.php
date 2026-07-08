<?php

namespace Database\Seeders;

use App\Models\Holiday;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class HolidaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            [
                'slug' => 'new-years-day',
                'title' => "New Year's Day",
                'rule' => Holiday::FIXED_DATE,
                'month' => 1,
                'day' => 1,
            ],
            [
                'slug' => 'martin-luther-king-jr-day',
                'title' => 'Martin Luther King Jr. Day',
                'rule' => Holiday::NTH_WEEKDAY,
                'month' => 1,
                'weekday' => Carbon::MONDAY,
                'week_number' => 3,
            ],
            [
                'slug' => 'presidents-day',
                'title' => "Presidents' Day",
                'rule' => Holiday::NTH_WEEKDAY,
                'month' => 2,
                'weekday' => Carbon::MONDAY,
                'week_number' => 3,
            ],
            [
                'slug' => 'easter-sunday',
                'title' => 'Easter Sunday',
                'rule' => Holiday::EASTER,
                'observes_substitute_date' => false,
            ],
            [
                'slug' => 'memorial-day',
                'title' => 'Memorial Day',
                'rule' => Holiday::LAST_WEEKDAY,
                'month' => 5,
                'weekday' => Carbon::MONDAY,
            ],
            [
                'slug' => 'juneteenth',
                'title' => 'Juneteenth',
                'rule' => Holiday::FIXED_DATE,
                'month' => 6,
                'day' => 19,
            ],
            [
                'slug' => 'independence-day',
                'title' => 'Independence Day',
                'rule' => Holiday::FIXED_DATE,
                'month' => 7,
                'day' => 4,
            ],
            [
                'slug' => 'labor-day',
                'title' => 'Labor Day',
                'rule' => Holiday::NTH_WEEKDAY,
                'month' => 9,
                'weekday' => Carbon::MONDAY,
                'week_number' => 1,
            ],
            [
                'slug' => 'columbus-day',
                'title' => 'Columbus Day',
                'rule' => Holiday::NTH_WEEKDAY,
                'month' => 10,
                'weekday' => Carbon::MONDAY,
                'week_number' => 2,
            ],
            [
                'slug' => 'veterans-day',
                'title' => 'Veterans Day',
                'rule' => Holiday::FIXED_DATE,
                'month' => 11,
                'day' => 11,
            ],
            [
                'slug' => 'thanksgiving-day',
                'title' => 'Thanksgiving Day',
                'rule' => Holiday::NTH_WEEKDAY,
                'month' => 11,
                'weekday' => Carbon::THURSDAY,
                'week_number' => 4,
            ],
            [
                'slug' => 'christmas-day',
                'title' => 'Christmas Day',
                'rule' => Holiday::FIXED_DATE,
                'month' => 12,
                'day' => 25,
            ],
        ])->each(function (array $holiday) {
            Holiday::updateOrCreate(
                ['slug' => $holiday['slug']],
                array_merge([
                    'day' => null,
                    'weekday' => null,
                    'week_number' => null,
                    'is_observed' => true,
                    'observes_substitute_date' => true,
                ], $holiday)
            );
        });
    }
}
