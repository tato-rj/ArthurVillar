<?php

namespace App\Games;

class KeysLabSettings extends GameFactory
{   
    public function gameName(): string 
    {
        return 'Keys Lab';
    }

    public function gameIcon(): string
    {
        return 'flask';
    }
    
    public function gameDescription() : string 
    {
        return 'Find the key signature and add accidentals on the staff.';
    }

    public function gameTheme(): string 
    {
        return 'pink';
    }

    public function gameUrl(): string 
    {
        return route('theory.keys-lab.play');
    }

    protected function requiredToggleKeys(): array
    {
        return ['sound'];
    }

    protected function defaults(): array
    {
        return [
            'timeLimit' => 20,
            'practiceMode' => false,
            'timer' => false,
            'numOfChallenges' => 4,
            'keyQualities' => ['major', 'minor'],
            'numberOfAccidentals' => 0,
            'clefs' => ['treble', 'bass'],
            'sound' => true
        ];
    }

    public function options($key = null)
    {
        $options = $this->applyUserPreferences();

        return $key ? $options[$key] : $options;
    }
}