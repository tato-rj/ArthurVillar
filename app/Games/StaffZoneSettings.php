<?php

namespace App\Games;

class StaffZoneSettings extends GameFactory
{   
    public function gameName(): string 
    {
        return 'Staff Zone';
    }

    public function gameIcon(): string
    {
        return 'seedling';
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
        return route('theory.staff-zone.play');
    }

    protected function requiredToggleKeys(): array
    {
        return ['sound', 'showNoteNames', 'solfege'];
    }

    protected function defaults(): array
    {
        return [
            'maxUserNotes' => 1,
            'clefs' => ['treble'],
            'sound' => true,
            'showNoteNames' => true,
            'solfege' => true,
        ];
    }

    public function options($key = null)
    {
        $options = $this->applyUserPreferences();

        return $key ? $options[$key] : $options;
    }
}