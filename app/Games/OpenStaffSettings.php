<?php

namespace App\Games;

class OpenStaffSettings extends GameFactory
{   
    public function gameName(): string 
    {
        return 'Open Staff';
    }

    public function gameIcon(): string
    {
        return 'chalkboard';
    }
    
    public function gameDescription() : string 
    {
        return 'Explore the staff by tapping on lines and spaces.';
    }

    public function gameTheme(): string 
    {
        return 'stone';
    }

    public function gameUrl(): string 
    {
        return route('theory.open-staff.play');
    }

    protected function defaults(): array
    {
        return [
            'maxUserNotes' => 1,
            'clefs' => [],
            'sound' => true,
            'solfege' => false,
        ];
    }

    public function options($key = null)
    {
        $options = $this->applyUserPreferences();

        return $key ? $options[$key] : $options;
    }
}