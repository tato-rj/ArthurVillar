<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('invitation_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('invitation_votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_participant_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId('invitation_option_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('status', 10);
            $table->timestamps();

            $table->unique(
                ['invitation_participant_id', 'invitation_option_id'],
                'invitation_votes_participant_option_unique'
            );
        });
    }

    public function down()
    {
        Schema::dropIfExists('invitation_votes');
        Schema::dropIfExists('invitation_participants');
    }
};
