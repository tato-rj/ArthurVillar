<?php

namespace App\Games;

class BasicsSettings extends GameFactory
{   
    public function gameName(): string 
    {
        return 'Learn the Basics';
    }

    public function gameIcon(): string
    {
        return 'seedling';
    }
    
    public function gameDescription() : string 
    {
        return 'Explore the staff by tapping on lines and spaces.';
    }

    public function gameTheme(): string 
    {
        return 'stone';
    }

    public function gameUrl(): string 
    {
        return route('theory.basics.play');
    }

    protected function defaults(): array
    {
        return [
            'maxUserNotes' => 1,
            'clefs' => ['treble'],
            'sound' => true,
            'showNoteNames' => true,
            'solfege' => true,
        ];
    }

    public function screens(): array
    {
        return [
            [
                'instructions' => [
                    "This is the <u>staff</u>.",
                    "We count lines and spaces from bottom to top.",
                    "Without a clef, lines and spaces have no name.",
                    "<strong class='text-dark'>Tap on the staff</strong> to highlight a line or a space."
                ],
                'success' => [
                    "Great! Now click continue for the next lesson."
                ],
                'clef' => null,
                'playSound' => false,
                'logNoteName' => false,
                'showLabels' => true,
                'solfege' => true,
            ],
            [
                'instructions' => [
                    "Clefs give names to the lines and spaces.",
                    "Here, the <u>Treble clef</u> gives line 2 the name Sol, or G.",
                    "<strong class='text-dark'>Drag the note on the staff</strong> to see and hear the notes now.",
                ],
                'success' => [
                    "Excellent! Click continue for the next lesson."
                ],
                'clef' => ['treble'],
                'playSound' => true,
                'logNoteName' => true,
                'showLabels' => true,
                'solfege' => true,
                'initialStep' => 2,
            ],
            [
                'instructions' => [
                    "Different clefs are used to represent a wide range of pitches.",
                    "The <u>Bass clef</u> represents lower notes, and gives line 4 the name Fa, or F.",
                    "<strong class='text-dark'>Drag the note on the staff</strong> to see and hear the new notes.",
                ],
                'success' => [
                    "Nice! You are ready to start reading notes on the staff."
                ],
                'clef' => ['bass'],
                'playSound' => true,
                'logNoteName' => true,
                'showLabels' => true,
                'solfege' => true,
                'initialStep' => 6,
            ]
        ];
    }

    public function options($key = null)
    {
        $options = $this->applyUserPreferences();

        return $key ? $options[$key] : $options;
    }
}