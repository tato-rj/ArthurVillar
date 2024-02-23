<?php

namespace App\Models;

use App\Models\Traits\{FindBySlug, CanPreventDeletion};

class Method extends BaseModel
{
    use FindBySlug, CanPreventDeletion;

    protected $with = ['books'];
    protected $withCount = ['books'];
    
    public function books()
    {
        return $this->hasMany(Book::class);
    }

    public function scopeByName($query, $name)
    {
        return $query->where('name', $name);
    }
}
