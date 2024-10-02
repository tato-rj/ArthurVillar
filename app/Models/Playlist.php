<?php

namespace App\Models;

class Playlist extends BaseModel
{
    public function recordings()
    {
        return $this->belongsToMany(Recording::class)->orderBy('composed_in');
    }
}
