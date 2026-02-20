<?php

namespace App\Games;

class ChordsChallenge extends GameFactory
{
    protected function requiredToggleKeys(): array
    {
        return ['sound', 'showLetterNames', 'allowInitialAccidentals', 'initialRoot'];
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