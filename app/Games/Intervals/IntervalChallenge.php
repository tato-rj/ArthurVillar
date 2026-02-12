<?php

namespace App\Games\Intervals;

use App\Games\GameFactory;

class IntervalChallenge extends GameFactory
{
	protected $options = [];
    protected $defaults = [
        	'maxUserNotes' => 1,
        	'numOfChallenges' => 4,
        	'intervals' => ['M2', 'm3', 'M3', 'P5', 'P8'],
        	'clefs' => ['treble', 'bass'],
        	'fixedNotes' => [],
        	'sound' => true,
        	'showLetterNames' => false,
        	'allowInitialAccidentals' => false
        ];

    public function __construct(array $request = [])
    {
    	$this->options = array_replace($this->defaults, $request);
    }

    public function options($key = null)
    {
        $weights = $this->getAccidentalWeights()[(bool) $this->options['allowInitialAccidentals']];

    	$array = array_merge($this->options, ['accidentalWeights' => $weights]);

		return $key ? $array[$key] : $array;
    }
}