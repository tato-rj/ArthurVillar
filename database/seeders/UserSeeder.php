<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'Arthur',
            'email' => 'arthurvillar@gmail.com',
            'password' => '$2y$10$JyVLTCENCpzgI85JERAdBehQ.iuR9l/dnRzGgSG.g2IjbRT3B0Gh6'
        ]);
    }
}
