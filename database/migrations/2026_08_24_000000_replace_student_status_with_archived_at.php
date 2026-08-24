<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if (! Schema::hasColumn('students', 'archived_at')) {
            Schema::table('students', function (Blueprint $table) {
                $table->timestamp('archived_at')->nullable()->after('payment_method');
            });
        }

        if (Schema::hasColumn('students', 'status')) {
            DB::table('students')
                ->whereNotNull('status')
                ->where('status', '!=', 'active')
                ->whereNull('archived_at')
                ->update(['archived_at' => now()]);

            Schema::table('students', function (Blueprint $table) {
                $table->dropColumn('status');
            });
        }
    }

    public function down()
    {
        if (! Schema::hasColumn('students', 'status')) {
            Schema::table('students', function (Blueprint $table) {
                $table->string('status')->default('active')->after('payment_method');
            });
        }

        DB::table('students')
            ->whereNotNull('archived_at')
            ->update(['status' => 'archived']);

        if (Schema::hasColumn('students', 'archived_at')) {
            Schema::table('students', function (Blueprint $table) {
                $table->dropColumn('archived_at');
            });
        }
    }
};
