<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\CanPreventDeletion;

class BaseModel extends Model
{
    use HasFactory, CanPreventDeletion;

    protected $guarded = [];

    public function formatDate($attr, $format)
    {
        if (! $this->$attr)
            return null;

        if (method_exists($this->$attr, $format))
            return $this->$attr->$format();

        return $this->$attr->format($format);
    }
}
