<?php

namespace App\Games;

use App\Models\Player;

abstract class GameFactory 
{
    protected array $request = [];
    protected array $bonusPoints = [];
    protected array $categories = [];
    protected $intervals = ['m2', 'M2', 'm3', 'M3', 'P4', 'A4', 'd5', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'];
    protected $triadQualities = ['major', 'minor', 'diminished', 'augmented'];
    protected $timeSignatures = ['2/4', '3/4', '4/4'];
    protected $keyQualities = ['major', 'minor'];
    protected $numberOfAccidentals = ['2 or less', '4 or less', 'Any number'];
    protected $clefs = ['treble', 'bass', 'alto', 'tenor'];
    protected $notesValues = ['whole', 'half', 'quarter', 'eigth'];
    protected $numOfChallenges = [0,2,4,6,8,10,12];
    protected $accidentalWeights = [
        	['natural' => 20, 'sharp' => 0, 'flat' => 0],
        	['natural' => 8, 'sharp' => 6, 'flat' => 6]
        ];

    abstract public function gameName(): string;
    abstract public function gameIcon(): string;
    abstract public function gameTheme(): string;
    abstract public function gameDescription(): string;
    abstract public function gameUrl(): string;
    abstract protected function defaults(): array;

    public function __construct(array $request = [])
    {
        $this->request = $this->normalizeRequest($request);
    }

    public function leaderboard()
    {
        return Player::byGame($this->gameName())->orderBy('finalScore', 'DESC')->get();
    }

    protected function requiredToggleKeys(): array
    {
        return [];
    }

    public function hasBonus($key)
    {
        return in_array($key, $this->bonusPoints);
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
        $defaults = $this->defaults();

        return array_replace($defaults, array_intersect_key($this->request, $defaults));
    }

    protected function buildOptions(array $options, array $extra = []): array
    {
        return array_merge($options, $extra, ['bonusPoints' => $this->bonusPoints]);
    }

    public function getIntervals()
    {
    	return $this->intervals;
    }

    public function getTriadQualities()
    {
        return $this->triadQualities;
    }

    public function getKeyQualities()
    {
        return $this->keyQualities;
    }

    public function getPositions()
    {
        return $this->positions;
    }

    public function getNotesValues()
    {
        return $this->notesValues;
    }

    public function getTimeSignatures()
    {
        return $this->timeSignatures;
    }

    public function getNumOfChallenges()
    {
        return $this->numOfChallenges;
    }

    public function getNumberOfAccidentals()
    {
        return $this->numberOfAccidentals;
    }

    public function getClefs()
    {
    	return $this->clefs;
    }

    public function getSpeeds()
    {
        return $this->speeds;
    }

    public function getAccidentalWeights()
    {
    	return $this->accidentalWeights;
    }
}
