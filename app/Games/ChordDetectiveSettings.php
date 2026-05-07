<?php

namespace App\Games;

class ChordDetectiveSettings extends GameFactory
{
    protected array $bonusPoints = ['timer'];

    public function gameName(): string
    {
        return 'Chord Detective';
    }
    
    public function gameIcon(): string
    {
        return 'magnifying-glass';
    }
    
    public function gameDescription() : string
    {
        return 'Hear a chord and write the notes on the staff.';
    }

    public function gameTheme(): string
    {
        return 'green';
    }

    public function categories()
    {
        return collect(['ear training']);
    }

    public function gameUrl(): string 
    {
        return route('theory.chord-detective.play');
    }

    protected function requiredToggleKeys(): array
    {
        return ['sound', 'showNoteNames', 'solfege', 'allowAccidentals'];
    }

    protected function defaults(): array
    {
        return [
            'timerLimit' => 20,
            'practiceMode' => false,
            'timer' => false,
            'maxUserNotes' => 1,
            'numOfChallenges' => 4,
            'intervals' => ['M2', 'm3', 'M3', 'P5', 'P8'],
            'clefs' => ['treble', 'bass'],
            'fixedNotes' => [],
            'sound' => true,
            'showNoteNames' => false,
            'allowAccidentals' => false,
            'direction' => ['up', 'down'],
            'solfege' => false
        ];
    }

    public function options($key = null)
    {
        $options = $this->applyUserPreferences();

        $weights = $this->getAccidentalWeights()[(bool) $options['allowAccidentals']];
        $array = $this->buildOptions($options, ['accidentalWeights' => $weights]);

        return $key ? $array[$key] : $array;
    }
}
