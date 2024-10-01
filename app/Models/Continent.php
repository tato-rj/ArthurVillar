<?php

namespace App\Models;

class Continent extends BaseModel
{
    protected $withCount = ['composers'];
    
    public function composers()
    {
        return $this->hasManyThrough(Composer::class, Country::class);    
    }

    public function countries()
    {
        return $this->hasMany(Country::class);    
    }

    public function hasIcon()
    {
        return (bool) $this->icon;
    }

    public function scopeNorthAmerica($query)
    {
        return $query->where('name', 'North America')->first();
    }

    public function scopeCentralAmerica($query)
    {
        return $query->where('name', 'Central America')->first();
    }

    public function scopeSouthAmerica($query)
    {
        return $query->where('name', 'South America')->first();
    }

    public function scopeEurope($query)
    {
        return $query->where('name', 'Europe')->first();
    }

    public function scopeAsia($query)
    {
        return $query->where('name', 'Asia')->first();
    }

    public function scopeAfrica($query)
    {
        return $query->where('name', 'Africa')->first();
    }

    public function scopeOceania($query)
    {
        return $query->where('name', 'Oceania')->first();
    }
}
