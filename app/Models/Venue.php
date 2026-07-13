<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venue extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function recitals()
    {
        return $this->hasMany(Recital::class);
    }

    public function getFullAddressAttribute()
    {
        return collect([
            $this->address_line_1,
            $this->address_line_2,
            collect([$this->city, $this->state])->filter()->implode(', '),
            $this->postal_code,
        ])->filter()->implode(', ');
    }
}
