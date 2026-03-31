<?php

namespace App\Games;

class NoteNestSettings extends GameFactory
{   
    public function gameName(): string 
    {
        return 'Note Nest';
    }

    public function gameIcon(): string
    {
        return 'graduation-cap';
    }
    
    public function gameDescription() : string 
    {
        return 'Write the note in the correct spot on the staff.';
    }

    public function gameTheme(): string 
    {
        return 'teal';
    }

    public function gameUrl(): string 
    {
        return route('theory.note-nest.play');
    }

    protected function requiredToggleKeys(): array
    {
        return ['sound', 'showNoteNames', 'solfege', 'allowAccidentals', 'showLineNames'];
    }

    protected function defaults(): array
    {
        return [
            'timeLimit' => 15,
            'practiceMode' => false,
            'timer' => false,
            'maxUserNotes' => 1,
            'numOfChallenges' => 4,
            'intervals' => ['M2', 'm3', 'M3', 'P5', 'P8'],
            'clefs' => ['treble', 'bass'],
            'fixedNotes' => [],
            'sound' => true,
            'showNoteNames' => false,
            'allowAccidentals' => false,
            'initialNoteRange' => 0,
            'solfege' => false,
            'strictDirection' => false,
            'showLineNames' => false
        ];
    }

    public function options($key = null)
    {
        $options = $this->applyUserPreferences();

        $weights = $this->getAccidentalWeights()[(bool) $options['allowAccidentals']];
        $array = array_merge($options, ['accidentalWeights' => $weights]);

        return $key ? $array[$key] : $array;
    }
}