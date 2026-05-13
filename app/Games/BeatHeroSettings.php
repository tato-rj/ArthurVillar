<?php

namespace App\Games;

class BeatHeroSettings extends GameFactory
{
    protected array $categories = ['rhythm', 'reading'];

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

    public function categories()
    {
        return collect($this->categories);
    }

    public function gameUrl(): string 
    {
        return route('theory.beat-hero.play');
    }

    protected function requiredToggleKeys(): array
    {
        return ['sound', 'showNoteNames', 'solfege', 'allowDottedRhythms', 'showDetails'];
    }

    protected function defaults(): array
    {
        return [
            'practiceMode' => false,
            'numOfChallenges' => 4,
            'bpm' => 80,
            'timeSignatures' => ['4/4'],
            'notesValues' => ['half', 'quarter', 'eigth'],
            'sound' => true,
            'includeRests' => false
        ];
    }

    public function options($key = null)
    {
        $options = $this->applyUserPreferences();

        return $key ? $options[$key] : $options;
    }
}
