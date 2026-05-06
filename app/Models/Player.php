<?php

namespace App\Models;

use App\Models\Traits\Usernames;

class Player extends BaseModel
{
    use Usernames;
    
    public function scopeByGame($query, $name)
    {
        return $query->where('game', $name);
    }

    public function fake($game)
    {
        $player = $this->create([
            'game' => $game,
            'username' => $this->randomUsername(),
            'avatar_url' => 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed='.random_int(1, 24),
            'score' => random_int(10, 30),
            'accuracy' => random_int(6000, 10000) / 100,
            'rounds' => random_int(2, 8),
            'duration' => random_int(10, 40)
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
