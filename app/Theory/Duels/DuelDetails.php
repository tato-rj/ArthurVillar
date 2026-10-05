<?php

namespace App\Theory\Duels;

use Illuminate\Support\Str;

class DuelDetails
{
    private const LABELS = [
        'numOfChallenges' => 'Number of rounds', 'timeLimit' => 'Time per round',
        'practiceMode' => 'Practice mode', 'timer' => 'Timer', 'maxUserNotes' => 'Notes per answer',
        'fixedNotes' => 'Starting notes', 'showNoteNames' => 'Note names', 'showLineNames' => 'Staff line names',
        'allowAccidentals' => 'Sharps and flats', 'solfege' => 'Solfège', 'strictDirection' => 'Match interval direction',
        'initialRoot' => 'Show root note', 'only7thChords' => 'Seventh chords only', 'allowInversions' => 'Chord inversions',
        'triadQualities' => 'Chord types', 'keyQualities' => 'Key types', 'numberOfAccidentals' => 'Key signature accidentals',
        'hideLastNote' => 'Hide last note', 'showBombs' => 'Bombs', 'speedUpEachRound' => 'Speed up each round',
        'blockNote' => 'Blocked note', 'bpm' => 'Tempo', 'notesValues' => 'Note values',
        '_stats' => 'Answers', 'checksTotal' => 'Attempts', 'checksCorrect' => 'Correct answers',
        'finishedAtMs' => 'Finished at', '_correctStreak' => 'Current streak', '_madeAnyMistake' => 'Any mistakes',
        '_targetSequence' => 'Note sequence', '_lastTargetSignature' => 'Last target', '_lastTargetName' => 'Last target name',
        '_previousAnswerIds' => 'Previous rhythm choices', '_roundRecords' => 'Rounds',
        '_correctTaps' => 'Correct taps', '_wrongTaps' => 'Wrong taps', '_duelClef' => 'Clef',
    ];

    private const INTERVALS = [
        'm2' => 'Minor 2nd', 'M2' => 'Major 2nd', 'm3' => 'Minor 3rd', 'M3' => 'Major 3rd',
        'P4' => 'Perfect 4th', 'A4' => 'Augmented 4th', 'd5' => 'Diminished 5th', 'P5' => 'Perfect 5th',
        'm6' => 'Minor 6th', 'M6' => 'Major 6th', 'm7' => 'Minor 7th', 'M7' => 'Major 7th', 'P8' => 'Octave',
    ];

    // Keep the original structure, but give arrays, keys and values a readable presentation.
    public static function fields(array $values, callable $formatTime): array
    {
        $fields = [];
        foreach ($values as $key => $value) {
            $label = self::LABELS[$key] ?? Str::headline(ltrim((string) $key, '_'));
            if (is_int($key)) {
                $label = 'Item '.($key + 1);
            }
            $field = ['label' => $label, 'children' => [], 'items' => [], 'value' => null];
            if (is_array($value) && $value !== []) {
                if (array_is_list($value) && ! collect($value)->contains(fn ($item) => is_array($item))) {
                    $field['items'] = array_map(fn ($item) => self::value((string) $key, $item, $formatTime), $value);
                } else {
                    $field['children'] = self::fields($value, $formatTime);
                }
            } else {
                $field['value'] = self::value((string) $key, $value, $formatTime);
            }
            $fields[] = $field;
        }

        return $fields;
    }

    private static function value(string $key, mixed $value, callable $formatTime): string
    {
        if ($key === 'finishedAtMs' && is_numeric($value) && $value >= 0 && $value <= 253402300799999) {
            return $formatTime(\Carbon\Carbon::createFromTimestampMs($value));
        }
        if (is_bool($value)) {
            return $value ? 'Yes' : 'No';
        }
        if ($value === null) {
            return 'Not recorded';
        }
        if ($value === []) {
            return $key === 'fixedNotes' ? 'Random notes' : 'None selected';
        }
        if ($key === 'timeLimit' && is_numeric($value)) {
            return $value.' sec';
        }
        if ($key === 'bpm' && is_numeric($value)) {
            return $value.' BPM';
        }
        if ($key === 'accuracy' && is_numeric($value)) {
            return $value.'%';
        }
        if ($key === 'intervals' && is_string($value)) {
            return self::INTERVALS[$value] ?? $value;
        }
        // Preserve music notation (C4, M2, 4/4) and arbitrary saved text as supplied.
        $names = ['treble' => 'Treble', 'bass' => 'Bass', 'alto' => 'Alto', 'tenor' => 'Tenor',
            'major' => 'Major', 'minor' => 'Minor', 'diminished' => 'Diminished', 'augmented' => 'Augmented',
            'whole' => 'Whole note', 'half' => 'Half note', 'quarter' => 'Quarter note', 'eigth' => 'Eighth note'];

        return is_string($value) ? ($names[$value] ?? $value) : (string) $value;
    }
}
