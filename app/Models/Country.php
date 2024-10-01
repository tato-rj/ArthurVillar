<?php

namespace App\Models;

use App\Models\Traits\FindBySlug;

class Country extends BaseModel
{
    use FindBySlug;

    protected $needsThe = [
        'United States',
        'United Kingdom',
        'United Arab Emirates',
        'Netherlands',
        'Bahamas',
        'Gambia',
        'Philippines',
        'Congo',
        'Ivory Coast',
        'Czech Republic',
        'Dominican Republic',
        'Maldives'
    ];
    
    public function continent()
    {
        return $this->belongsTo(Continent::class);
    }
    
    public function composers()
    {
        return $this->hasMany(Composer::class);
    }

    public function pieces()
    {
        return $this->hasManyThrough(Piece::class, Composer::class);
    }

    public function flag($width = 21.33, $classes = null) {
        $ratio = 21.33 / 16;
        $height = $width / $ratio;

        return view('components.country.flag', ['country' => $this, 'width' => $width, 'height' => $height, 'classes' => $classes])->render();
    }

    public function css()
    {
        if ($this->name == 'Japan')
            return 'border';   
    }

    // public function url()
    // {
    //     return route('nationalities.show', $this);
    // }

    // public function scopeByName($query, $name)
    // {
    //     return $query->where('name', 'LIKE', '%'.$name.'%');
    // }

    public function nameForHumans()
    {
        if (in_array($this->name, $this->needsThe))
            return 'the ' . $this->name;
        
        return $this->name;
    }
}
