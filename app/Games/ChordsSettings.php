<?php

namespace App\Games;

class ChordsSettings extends GameFactory
{
    protected function requiredToggleKeys(): array
    {
        return ['sound', 'showLetterNames', 'allowInitialAccidentals', 'initialRoot', 'only7thChords'];
    }

    protected function defaults(): array
    {
        return [
            'maxUserNotes' => 2,
            'numOfChallenges' => 4,
            'triadQualities' => ['major', 'minor'],
            'clefs' => ['treble', 'bass'],
            'fixedNotes' => [],
            'sound' => true,
            'showLetterNames' => false,
            'allowInitialAccidentals' => false,
            'initialRoot' => true,
            'only7thChords' => false,
            'initialNoteRange' => 0,
        ];
    }

    public function options($key = null)
    {
        $options = $this->applyUserPreferences();

        $options['maxUserNotes'] = !empty($options['only7thChords']) ? 3 : 2;

        $weights = $this->getAccidentalWeights()[(bool) $options['allowInitialAccidentals']];
        $array = array_merge($options, ['accidentalWeights' => $weights]);

        return $key ? $array[$key] : $array;
    }
}