<?php

namespace App\Models;

class Playlist extends BaseModel
{
    protected static function boot()
    {
        parent::boot();

        self::created(function($playlist) {
            $playlist->renewSecret();
        });

        self::deleting(function($playlist) {
            $playlist->recordings()->sync([]);
        });
    }

    public function recordings()
    {
        return $this->belongsToMany(Recording::class)->orderBy('composed_in');
    }

    public function renewSecret()
    {
        $this->update(['secret' => uuid()]);   
    }
}
