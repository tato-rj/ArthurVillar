<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;
use Illuminate\Support\Facades\DB;

class WaitingList extends BaseModel
{
    protected $casts = ['is_adult' => 'boolean'];

    public function convertToStudent()
    {
        return DB::transaction(function () {
            $student = Student::create([
                'first_name' => $this->first_name,
                'last_name' => $this->last_name,
                'parent_name' => $this->parent_name,
                'email' => $this->email,
                'phone' => $this->phone,
                'is_adult' => $this->is_adult,
                'notes' => $this->notes,
            ]);

            $this->delete();

            return $student;
        });
    }
}
