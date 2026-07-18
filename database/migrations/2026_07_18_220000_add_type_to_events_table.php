<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if (! Schema::hasColumn('events', 'type')) {
            Schema::table('events', function (Blueprint $table) {
                $table->text('type')->nullable()->after('ends_at');
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('events', 'type')) {
            Schema::table('events', function (Blueprint $table) {
                $table->dropColumn('type');
            });
        }
    }
};
