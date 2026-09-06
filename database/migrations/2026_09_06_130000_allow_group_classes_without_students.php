<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        if (DB::connection()->getDriverName() !== 'mysql') {
            return;
        }

        DB::statement('ALTER TABLE lesson_plans MODIFY student_id BIGINT UNSIGNED NULL');
        DB::statement('ALTER TABLE single_lesson_plans MODIFY student_id BIGINT UNSIGNED NULL');
        DB::statement('ALTER TABLE lessons MODIFY student_id BIGINT UNSIGNED NULL');
    }

    public function down()
    {
        if (DB::connection()->getDriverName() !== 'mysql') {
            return;
        }

        DB::statement('ALTER TABLE lesson_plans MODIFY student_id BIGINT UNSIGNED NOT NULL');
        DB::statement('ALTER TABLE single_lesson_plans MODIFY student_id BIGINT UNSIGNED NOT NULL');
        DB::statement('ALTER TABLE lessons MODIFY student_id BIGINT UNSIGNED NOT NULL');
    }
};
