<?php

namespace App\Models;

use App\Models\Traits\Usernames;
use Carbon\CarbonInterval;

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

    public function calculateFinalScore($results = null)
    {
        $model = $results ?? $this;

        $acc = $model->accuracy / 1000;

        $timeFactor = pow(40 / ($model->duration + 10), 1.25);

        $result =
            (
                pow($model->score, 1.08) *
                $acc *
                pow($model->rounds + 1, 0.35) *
                $timeFactor
            ) * 18.7;

        return $results ? 
            (int) round($result) : 
            $this->update(['finalScore' => (int) round($result)]);
    }

    public function getAccuracyForHumansAttribute()
    {
        return rtrim(rtrim(number_format((float) $this->accuracy, 2), '0'), '.') . '%';
    }

    public function getDurationForHumansAttribute()
    {
        return CarbonInterval::seconds($this->duration)->cascade()->format('%I:%S');
    }
}
