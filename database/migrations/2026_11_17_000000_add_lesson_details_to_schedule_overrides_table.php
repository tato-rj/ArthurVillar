<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('schedule_overrides', function (Blueprint $table) {
            $table->foreignId('location_id')->nullable()->constrained()->nullOnDelete();
            $table->json('lesson_details')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('schedule_overrides', function (Blueprint $table) {
            $table->dropConstrainedForeignId('location_id');
            $table->dropColumn('lesson_details');
        });
    }
};
