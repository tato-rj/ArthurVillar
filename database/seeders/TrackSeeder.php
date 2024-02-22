<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{Track, Book};

class TrackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Track::create([
        //     'book_id' => Book::find(1)->id,
        //     'name' => 'Variation A', 
        //     'order' => 0,
        //     'audio_path' => 'tracks/eb2d39e2-9065-461d-aefb-cbcc6a8f95bd.mp3']);

        // Track::create([
        //     'book_id' => Book::find(1)->id,
        //     'name' => 'Variation B', 
        //     'order' => 1,
        //     'audio_path' => 'tracks/3d483d6f-6dc2-4f5c-87dd-2c2da842b164.mp3']);

        // Track::create([
        //     'book_id' => Book::find(1)->id,
        //     'name' => 'Variation C', 
        //     'order' => 2,
        //     'audio_path' => 'tracks/1662c9dd-4c03-42ed-83e5-8517098b3d9c.mp3']);

        // Track::create([
        //     'book_id' => Book::find(1)->id,
        //     'name' => 'Twinkle Theme', 
        //     'order' => 3,
        //     'audio_path' => 'tracks/844d3d7a-3731-49a4-926b-58206ec8de3c.mp3']);
    }
}
