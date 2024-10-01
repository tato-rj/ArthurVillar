<?php

namespace App\Models\Traits;

trait HasFilesInStorage
{
    public function storage($attr)
    {
        if (production())
            return asset('storage/'.$this->$attr);

        return asset($this->$attr);
    }
}