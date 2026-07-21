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

        DB::statement(<<<'SQL'
            ALTER TABLE google_calendar_events
                MODIFY starts_at DATETIME NULL,
                MODIFY ends_at DATETIME NULL,
                MODIFY google_updated_at DATETIME NULL
        SQL);
    }

    public function down()
    {
        // Keep the wider, non-destructive date range if this migration is rolled back.
    }
};
