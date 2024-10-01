<?php

namespace App\Models;

class Period extends BaseModel
{
    public function composers()
    {
        return $this->hasMany(Composer::class)->orderBy('name');    
    }

    public function getColorAttribute()
    {
        switch ($this->name) {
            case 'Renaissance':
                return 'blue';
                break;

            case 'Baroque':
                return 'orange';
                break;
            
            case 'Classical':
                return 'green';
                break;

            case 'Romantic':
                return 'red';
                break;

            default:
                return 'grey';
                break;
        }
    }
}
