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

    public function size()
    {
        return formatBytes($this->tracks->sum('size'));
    }

    public function duration()
    {
        $total = $this->tracks->sum('duration');

        return sprintf("%d:%02d", floor($total / 60), $total % 60);
    }
}
