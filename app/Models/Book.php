<?php

namespace App\Models;

use App\Models\Traits\{FindBySlug, CanPreventDeletion};

class Book extends BaseModel
{
    use FindBySlug, CanPreventDeletion;

    public function tracks()
    {
        return $this->hasMany(Track::class);
    }
}
