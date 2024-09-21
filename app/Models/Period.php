<?php

namespace App\Models;

class Period extends BaseModel
{
    public function getColorAttribute()
    {
        switch ($this->name) {
            case 'Renaissance':
                return 'red';
                break;
            
            default:
                return 'blue';
                break;
        }
    }
}
