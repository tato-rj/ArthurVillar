<?php

namespace App\Models;

class Track extends BaseModel
{
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
