<?php

function tags()
{
    return [
        'search' => ['mood', 'genre', 'ranking', 'season'],
        'core' => ['level', 'period', 'length']
    ];
}

function periods()
{
    return [
        'Periods' => ['Baroque', 'Classical', 'Romantic', 'Impressionist', 'Modern', 'Contemporary'],
        'Styles' => ['Jazz', 'Popular', 'Minimalist', 'Folklore']
    ];
}

function keys()
{
    return [
        'Tonal' => ['C major', 'C minor', 'C# major', 'C# minor', 'Db major', 'Db minor', 'D major', 'D minor', 'D# major', 'D# minor', 'Eb major', 'Eb minor', 'E major', 'E minor', 'F major', 'F minor', 'F# major', 'F# minor', 'Gb major', 'Gb minor', 'G major', 'G minor', 'G# major', 'G# minor', 'Ab major', 'Ab minor', 'A major', 'A minor', 'A# major', 'A# minor', 'Bb major', 'Bb minor', 'B major', 'B minor'],
        'Non-tonal' => ['Atonal', 'Modal', 'Serial', 'Experimental']
    ];
}

function catalogues()
{
    $catalogues = ['Op.', 'B', 'KV', 'K', 'H', 'HWV', 'D', 'Hob', 'BWV', 'WoO', 'Op. posth.', 'Anh', 'Sz', 'S', 'L', 'RH', 'EngK'];
    
    sort($catalogues);

    return $catalogues;
}