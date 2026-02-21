<?php

namespace App\Games;

class DictationSettings extends GameFactory
{
    protected function requiredToggleKeys(): array
    {
        return ['sound', 'showLetterNames', 'allowInitialAccidentals', 'initialRoot', 'only7thChords'];
    }

    protected function defaults(): array
    {
        return [
            'maxUserNotes' => 1,
            'numOfChallenges' => 4,
            'intervals' => ['M2', 'm3', 'M3', 'P5', 'P8'],
            'clefs' => ['treble', 'bass'],
            'fixedNotes' => [],
            'sound' => false,
            'showLetterNames' => false,
            'allowInitialAccidentals' => false,
            'initialNoteRange' => 1,
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