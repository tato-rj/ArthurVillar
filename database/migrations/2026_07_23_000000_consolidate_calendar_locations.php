<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        $this->addLocationFields();

        if (! Schema::hasColumn('recitals', 'location_id')) {
            Schema::table('recitals', function (Blueprint $table) {
                $table->foreignId('location_id')
                    ->nullable()
                    ->after('start_time')
                    ->constrained()
                    ->nullOnDelete();
            });
        }

        if (Schema::hasTable('venues')) {
            DB::table('venues')->orderBy('id')->each(function ($venue) {
                $location = DB::table('locations')
                    ->where('name', $venue->name)
                    ->first();
                $locationId = $location && $location->usage === 'recital'
                    ? $location->id
                    : null;

                if (! $locationId) {
                    $name = $location
                        ? $this->availableRecitalLocationName($venue->name)
                        : $venue->name;
                    $locationId = DB::table('locations')->insertGetId([
                        'name' => $name,
                        'fee_amount' => null,
                        'tax_withheld_percentage' => 0,
                        'address' => $venue->address,
                        'city' => $venue->city,
                        'state' => $venue->state,
                        'postal_code' => $venue->postal_code,
                        'usage' => 'recital',
                        'is_active' => true,
                        'notes' => null,
                        'created_at' => $venue->created_at,
                        'updated_at' => $venue->updated_at,
                    ]);
                }

                DB::table('recitals')
                    ->where('venue_id', $venue->id)
                    ->update(['location_id' => $locationId]);
            });
        }

        if (Schema::hasColumn('recitals', 'venue_id')) {
            Schema::table('recitals', function (Blueprint $table) {
                $table->dropConstrainedForeignId('venue_id');
            });
        }

        Schema::dropIfExists('venues');
    }

    public function down()
    {
        // This migration permanently consolidates legacy location records.
    }

    private function addLocationFields()
    {
        $columns = [
            'address' => fn (Blueprint $table) => $table->string('address')->nullable(),
            'city' => fn (Blueprint $table) => $table->string('city')->nullable(),
            'state' => fn (Blueprint $table) => $table->string('state', 100)->nullable(),
            'postal_code' => fn (Blueprint $table) => $table->string('postal_code', 20)->nullable(),
            'usage' => fn (Blueprint $table) => $table->string('usage')->default('teaching'),
        ];

        foreach ($columns as $column => $definition) {
            if (! Schema::hasColumn('locations', $column)) {
                Schema::table('locations', $definition);
            }
        }
    }

    private function availableRecitalLocationName($name)
    {
        $candidate = "{$name} (Recital)";
        $suffix = 2;

        while (DB::table('locations')->where('name', $candidate)->exists()) {
            $candidate = "{$name} (Recital {$suffix})";
            $suffix++;
        }

        return $candidate;
    }
};
