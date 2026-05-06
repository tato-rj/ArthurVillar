<?php

namespace App\Models;

class Player extends BaseModel
{
    public function scopeByGame($query, $name)
    {
        return $query->where('game', $name);
    }
}
