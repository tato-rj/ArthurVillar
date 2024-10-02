<?php

namespace App\Models;

use App\Models\Traits\HasFilesInStorage;

class Composer extends BaseModel
{
    use HasFilesInStorage;

    protected $dates = ['born_in', 'died_in'];

    protected static function boot()
    {
        parent::boot();

        self::deleting(function($composer) {
            if (\Storage::disk('public')->exists($composer->cover_path))
                \Storage::disk('public')->delete($composer->cover_path);
        });
    }

    public function period()
    {
        return $this->belongsTo(Period::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function recordings()
    {
        return $this->hasMany(Recording::class);
    }

    function shortName() {
        $parts = explode(' ', $this->name);
        
        if (count($parts) >= 2) {
            $initials = strtoupper($parts[0][0]) . '.' . strtoupper($parts[1][0]) . '.';
            $lastName = array_pop($parts); // Get the last name
            return $initials . ' ' . $lastName;
        }
        
        return $this->name;
    }
}
