<?php

namespace App\Models;

class Player extends BaseModel
{
    public function scopeByGame($query, $name)
    {
        return $query->where('game', $name);
    }

    public function fake($game)
    {
        $player = $this->create([
            'game' => $game,
            'username' => fake()->userName(),
            'avatar_url' => 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed='.fake()->numberBetween(1, 24),
            'score' => fake()->numberBetween(10, 30),
            'accuracy' => fake()->randomFloat(2, 60, 100),
            'rounds' => fake()->numberBetween(2, 8),
            'duration' => fake()->numberBetween(10, 40)
        ]);

        $player->calculateFinalScore();

        return $player;
    }

    public function calculateFinalScore()
    {
        $acc = $this->accuracy / 1000;

        $result =
            (
                pow($this->score, 1.08) *
                $acc *
                pow($this->rounds + 1, 0.35) *
                (30 / ($this->duration + 10))
            ) * 18.7;

        return $this->update(['finalScore' => (int) round($result)]);
    }
}
