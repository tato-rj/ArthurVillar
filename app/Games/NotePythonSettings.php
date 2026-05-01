<?php

namespace App\Games;

class NotePythonSettings extends GameFactory
{   
    public function gameName(): string
    {
        return 'Note Python';
    }
    
    public function gameIcon(): string
    {
        return 'signs-post';
    }
    
    public function gameDescription() : string
    {
        return 'Chase and collect the note by intervals.';
    }

    public function gameTheme(): string
    {
        return 'red';
    }

    public function gameUrl(): string 
    {
        return route('theory.note-python.play');
    }

    protected function requiredToggleKeys(): array
    {
        return ['sound', 'solfege', 'allowAccidentals', 'strictDirection', 'showBombs'];
    }

    protected function snakeSpeeds(): array
    {
        return [600, 400, 200];
    }

    protected function defaults(): array
    {
        return [
            'speedIndex' => 0,
            'timeLimit' => 40,
            'practiceMode' => false,
            'timer' => false,
            'numOfChallenges' => 4,
            'intervals' => ['M2', 'm3', 'M3', 'P5', 'P8'],
            'initialNotes' => [],
            'sound' => true,
            'solfege' => false,
            'allowAccidentals' => false,
            'strictDirection' => false,
            'showBombs' => false,
            'realWalls' => false,
        ];
    }

    public function options($key = null)
    {
        $options = $this->applyUserPreferences();

        $speeds = $this->snakeSpeeds();
        $idx = (int) ($options['speedIndex'] ?? 0);
        $idx = max(0, min($idx, count($speeds) - 1));
        $options['snakeSpeed'] = $speeds[$idx];

        $weights = $this->getAccidentalWeights()[(bool) $options['allowAccidentals']];
        $array = array_merge($options, ['accidentalWeights' => $weights]);

        return $key ? $array[$key] : $array;
    }
}