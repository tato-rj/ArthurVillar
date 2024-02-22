<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Book::create([
            'series' => 'Suzuki Piano Series',
            'name' => 'Suzuki Book 1', 
            'slug' => str_slug('Suzuki Book 1'), 
            'cover_path' => 'covers/PDUlr5JBHGJou6osdNDKTsOqJ6CXtqgSygnrzagZ.jpg']);

            Book::create([
            'series' => 'Suzuki Piano Series',
            'name' => 'Suzuki Book 2', 
            'slug' => str_slug('Suzuki Book 2'), 
            'cover_path' => 'covers/wqeHewQiB93Pl7yk8fktwGYUGcO2P1QhhrUdJPKn.jpg']);
    }
}
