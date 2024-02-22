<?php

namespace App\Models;

use App\Models\Traits\{FindBySlug, CanPreventDeletion};

class Book extends BaseModel
{
    use FindBySlug, CanPreventDeletion;

    protected $withCount = ['tracks'];

    public function tracks()
    {
        return $this->hasMany(Track::class)->orderBy('order');
    }
}
