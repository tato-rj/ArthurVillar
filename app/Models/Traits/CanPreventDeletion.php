<?php

namespace App\Models\Traits;

use Illuminate\Validation\ValidationException;

trait CanPreventDeletion
{
    public function preventDeletionWith(array $relations)
    {
        foreach ($relations as $relation) {
            if ($this->$relation()->exists()) {
            	$message = 'Cannot delete this while it has any ' . $relation;

                throw ValidationException::withMessages(['error' => $message]);
            }
        }

        return $this;
    }
}