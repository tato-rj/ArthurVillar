<?php

namespace App\Models\Theory;

use App\Models\BaseModel;
use App\Models\Traits\Usernames;
use Carbon\CarbonInterval;

class Player extends BaseModel
{
    use Usernames;
    
    public function scopeByGame($query, $name)
    {
        return $query->where('game', $name);
    }

    public function scopeRange($query, $range = null)
    {
        switch ($range) {
            case 'week':
                return $query->whereBetween('created_at', [
                    now()->subDays(7),
                    now()
                ]);
            default:
                return $query;
        }
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

    $accuracyFactor = pow($model->accuracy / 1000, 1.2);
    $timeFactor = pow(55 / ($model->duration + 35), 0.25);

    $result =
        (
            pow($model->score, 1.06) *
            $accuracyFactor *
            pow($model->rounds + 1, 0.32) *
            $timeFactor
        ) * 85;

    return $results
        ? (int) round($result)
        : $this->update(['finalScore' => (int) round($result)]);
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
