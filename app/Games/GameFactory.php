<?php

namespace App\Games;

abstract class GameFactory 
{
    protected array $request = [];
    protected $intervals = ['m2', 'M2', 'm3', 'M3', 'P4', 'A4', 'd5', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'];
    protected $triadQualities = ['major', 'minor', 'diminished', 'augmented'];
    protected $initialNoteRanges = ['Few notes', 'More notes', 'All notes'];
    protected $clefs = ['treble', 'bass', 'alto', 'tenor'];
    protected $numOfChallenges = [0,2,4,6,8,10,12];
    protected $accidentalWeights = [
        	['natural' => 20, 'sharp' => 0, 'flat' => 0],
        	['natural' => 8, 'sharp' => 6, 'flat' => 6]
        ];

    abstract protected function defaults(): array;

    public function __construct(array $request = [])
    {
        $this->request = $this->normalizeRequest($request);
    }

    protected function requiredToggleKeys(): array
    {
        return [];
    }

    protected function normalizeRequest(array $request)
    {
        if ($request === []) return $request;

        foreach ($this->requiredToggleKeys() as $key) {
            if (!array_key_exists($key, $request)) {
                $request[$key] = false;
            }
        }

        return $request;
    }

    protected function applyUserPreferences()
    {
        return array_replace($this->defaults(), $this->request);
    }

    public function getIntervals()
    {
    	return $this->intervals;
    }

    public function getTriadQualities()
    {
        return $this->triadQualities;
    }

    public function getNumOfChallenges()
    {
        return $this->numOfChallenges;
    }

    public function getInitialNoteRanges()
    {
        return $this->initialNoteRanges;
    }

    public function getClefs()
    {
    	return $this->clefs;
    }

    public function getAccidentalWeights()
    {
    	return $this->accidentalWeights;
    }
}