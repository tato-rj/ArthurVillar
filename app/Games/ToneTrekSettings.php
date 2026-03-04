<?php

namespace App\Games;

class ToneTrekSettings extends GameFactory
{   
    public function gameName(): string
    {
        return 'Tone Trek';
    }

    public function gameDescription() : string
    {
        return 'Follow the interval path and fill in missing notes.';
    }

    public function gameTheme(): string
    {
        return 'purple';
    }

    public function gameUrl(): string 
    {
        return route('theory.tone-trek.play');
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