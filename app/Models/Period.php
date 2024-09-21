<?php

namespace App\Models;

class Period extends BaseModel
{
    public function getColorAttribute()
    {
        switch ($this->name) {
            case 'Renaissance':
                'red';
                break;
            
            default:
                'blue';
                break;
        }
    }
}
