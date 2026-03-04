<?php

namespace App\Games;

class PitchDetectiveSettings extends GameFactory
{
    public function gameName(): string
    {
        return 'Pitch Detective';
    }
    
    public function gameDescription() : string
    {
        return 'Hear an interval and write the note on the staff.';
    }

    public function gameTheme(): string
    {
        return 'green';
    }

    public function gameUrl(): string 
    {
        return route('theory.dictation.play');
    }

    protected function requiredToggleKeys(): array
    {
        return ['sound', 'showLetterNames', 'allowInitialAccidentals', 'initialRoot', 'only7thChords'];
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
            'showLetterNames' => false,
            'allowInitialAccidentals' => false,
            'initialNoteRange' => 0,
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