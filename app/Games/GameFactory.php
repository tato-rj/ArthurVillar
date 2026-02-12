<?php

namespace App\Games;

abstract class GameFactory 
{
    protected $intervals = ['m2', 'M2', 'm3', 'M3', 'P4', 'A4', 'd5', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'];
    protected $clefs = ['treble', 'bass', 'alto', 'tenor'];
    protected $accidentalWeights = [
        	['natural' => 20, 'sharp' => 0, 'flat' => 0],
        	['natural' => 8, 'sharp' => 6, 'flat' => 6]
        ];

    public function getIntervals()
    {
    	return $this->intervals;
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