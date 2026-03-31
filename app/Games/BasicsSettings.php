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
                    "Without a clef, they have no name yet.",
                    "<strong class='text-dark'>Tap on the staff</strong> to highlight a line or a space!"
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
                    "<strong class='text-dark'>Drag the note on the staff</strong> to see and hear the notes now!",
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
                    "The <u>Bass clef</u> gives line 4 the name Fa, or F.",
                    "From there, we find all the other notes.",
                    "<strong class='text-dark'>Drag the note on the staff</strong> to see and hear the new notes!",
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