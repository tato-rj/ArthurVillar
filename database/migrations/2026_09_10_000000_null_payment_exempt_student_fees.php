<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        $studentIds = DB::table('students')
            ->where('payment_exempt', true)
            ->pluck('id');

        if ($studentIds->isEmpty()) {
            return;
        }

        DB::table('lesson_plans')
            ->whereIn('student_id', $studentIds)
            ->update(['fee_amount' => null]);

        DB::table('single_lesson_plans')
            ->whereIn('student_id', $studentIds)
            ->update(['fee_amount' => null]);

        DB::table('lessons')
            ->whereIn('student_id', $studentIds)
            ->update(['fee_amount' => null]);
    }

    public function down()
    {
        // Cleared exempt-student fees cannot be reconstructed safely.
    }
};
