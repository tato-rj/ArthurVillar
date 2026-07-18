<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('duration_minutes');
            $table->timestamps();
        });

        Schema::create('invitation_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->dateTime('starts_at');
            $table->timestamps();

            $table->unique(['invitation_id', 'starts_at']);
            $table->index('starts_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invitation_options');
        Schema::dropIfExists('invitations');
    }
};
