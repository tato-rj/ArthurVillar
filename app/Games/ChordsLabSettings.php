<?php

namespace App\Games;

class ChordsLabSettings extends GameFactory
{
    public function gameName(): string
    {
        return 'Chords Lab';
    }

    public function gameIcon(): string
    {
        return 'flask';
    }

    public function gameDescription() : string
    {
        return 'Build triads, suspended and 7th chords on the staff.';
    }

    public function gameTheme(): string
    {
        return 'orange';
    }

    public function gameUrl(): string 
    {
        return route('theory.chords-lab.play');
    }

    protected function requiredToggleKeys(): array
    {
        return ['sound', 'showNoteNames', 'solfege', 'allowAccidentals', 'initialRoot', 'only7thChords'];
    }

    protected function defaults(): array
    {
        return [
            'timerLimit' => 20,
            'practiceMode' => false,
            'timer' => false,
            'maxUserNotes' => 2,
            'numOfChallenges' => 4,
            'triadQualities' => ['major', 'minor'],
            'clefs' => ['treble', 'bass'],
            'fixedNotes' => [],
            'sound' => true,
            'showNoteNames' => false,
            'allowAccidentals' => false,
            'initialRoot' => true,
            'only7thChords' => false,
            'initialNoteRange' => 0,
            'strictDirection' => false,
            'solfege' => false
        ];
    }

    public function options($key = null)
    {
        $options = $this->applyUserPreferences();

        $options['maxUserNotes'] = !empty($options['only7thChords']) ? 3 : 2;

        $weights = $this->getAccidentalWeights()[(bool) $options['allowAccidentals']];
        $array = array_merge($options, ['accidentalWeights' => $weights]);

        return $key ? $array[$key] : $array;
    }
}