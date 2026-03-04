<?php

namespace App\Games;

class ToneTrailSettings extends GameFactory
{   
    public function gameName(): string
    {
        return 'Tone Trail';
    }
    
    public function gameIcon(): string
    {
        return 'signs-post';
    }
    
    public function gameDescription() : string
    {
        return 'Chase and collect the sounding note by ear.';
    }

    public function gameTheme(): string
    {
        return 'red';
    }

    public function gameUrl(): string 
    {
        return route('theory.tone-trail.play');
    }

    protected function requiredToggleKeys(): array
    {
        return ['sound', 'solfege', 'allowInitialAccidentals'];
    }

    protected function defaults(): array
    {
        return [
            'timeLimit' => 40,
            'practiceMode' => false,
            'timer' => false,
            'numOfChallenges' => 4,
            'intervals' => ['M2', 'm3', 'M3', 'P5', 'P8'],
            'initialNotes' => [],
            'sound' => true,
            'solfege' => false,
            'allowInitialAccidentals' => false,
        ];
    }

    public function options($key = null)
    {
        $options = $this->applyUserPreferences();

        $weights = $this->getAccidentalWeights()[(bool) $options['allowInitialAccidentals']];
        $array = array_merge($options, ['accidentalWeights' => $weights]);

        return $key ? $array[$key] : $array;
    }
}