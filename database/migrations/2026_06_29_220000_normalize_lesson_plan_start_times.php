<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        $driver = DB::connection()->getDriverName();

        DB::table('lesson_plans')->update([
            'start_time' => DB::raw($driver === 'sqlite' ? "substr(start_time, 1, 5)" : "LEFT(start_time, 5)")
        ]);

        if ($driver === 'mysql') {
            DB::statement('ALTER TABLE lesson_plans MODIFY start_time CHAR(5) NOT NULL');
        }
    }

    public function down()
    {
        if (DB::connection()->getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE lesson_plans MODIFY start_time TIME NOT NULL');
        }
    }
};
