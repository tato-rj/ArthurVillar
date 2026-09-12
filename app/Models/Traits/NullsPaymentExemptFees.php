<?php

namespace App\Models\Traits;

use App\Models\Calendar\Student;

trait NullsPaymentExemptFees
{
    protected static function bootNullsPaymentExemptFees()
    {
        static::saving(function ($model) {
            if (
                $model->student_id
                && Student::query()
                    ->whereKey($model->student_id)
                    ->where('payment_exempt', true)
                    ->exists()
            ) {
                $model->fee_amount = null;
            }
        });
    }
}
