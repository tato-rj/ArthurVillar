<?php

namespace App\Games;

class BeatHeroSettings extends GameFactory
{
    public function gameName(): string
    {
        return 'Beat Hero';
    }

    public function gameIcon(): string
    {
        return 'drum';
    }

    public function gameDescription() : string
    {
        return 'Tap the notated rhythms shown within each measure.';
    }

    public function gameTheme(): string
    {
        return 'yellow';
    }

    public function gameUrl(): string 
    {
        return route('theory.beat-hero.play');
    }

    protected function speedsInBPM(): array
    {
        return [60, 80, 100, 120];
    }

    protected function requiredToggleKeys(): array
    {
        return ['sound', 'showNoteNames', 'solfege', 'allowDottedRhythms', 'showDetails'];
    }

    protected function defaults(): array
    {
        return [
            'speedIndex' => 0,
            'practiceMode' => false,
            'numOfChallenges' => 4,
            'sound' => true,
            'showDetails' => false
        ];
    }

    public function options($key = null)
    {
        $options = $this->applyUserPreferences();

        $speeds = $this->speedsInBPM();
        $idx = (int) ($options['speedIndex'] ?? 0);
        $idx = max(0, min($idx, count($speeds) - 1));
        $options['bpm'] = $speeds[$idx];

        return $key ? $options[$key] : $options;
    }
}