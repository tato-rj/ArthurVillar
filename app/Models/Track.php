<?php

namespace App\Models;

use getID3 as AudioAnalyzer;

class Track extends BaseModel
{
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function duration()
    {
        return sprintf("%d:%02d", floor($this->duration / 60), $this->duration % 60);
    }

    public function size()
    {
        return formatBytes($this->size);
    }

    public function saveAudio($path)
    {
        $info = (new AudioAnalyzer)->analyze(storage_path('app/public/').$path);

        $this->update([
            'audio_path' => $path,
            'duration' => $info['playtime_seconds'],
            'size' => $info['filesize']
        ]);
    }

    public function getComposerShortNameAttribute()
    {
        if (! $this->composer)
            return null;
        
            $namesArray = explode(' ', $this->composer);

            $initials = '';

            $lastName = array_pop($namesArray);

            foreach ($namesArray as $name) {
                $initials .= $name[0].'.';
            }

            return "$initials $lastName";
    }
}
