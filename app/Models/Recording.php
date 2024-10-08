<?php

namespace App\Models;

use getID3 as AudioAnalyzer;
use App\Models\Traits\HasFilesInStorage;

class Recording extends BaseModel
{
    use HasFilesInStorage;

    protected $withCount = ['playlists'];
    
    protected static function boot()
    {
        parent::boot();

        self::deleting(function($recording) {
            if ($recording->cover_path && \Storage::disk('public')->exists($recording->cover_path))
                \Storage::disk('public')->delete($recording->cover_path);
            
            if ($recording->audio_path && \Storage::disk('public')->exists($recording->audio_path))
                \Storage::disk('public')->delete($recording->audio_path);
        });
    }

    public function period()
    {
        return $this->belongsTo(Period::class);
    }

    public function composer()
    {
        return $this->belongsTo(Composer::class);
    }

    public function playlists()
    {
        return $this->belongsToMany(Playlist::class);
    }

    public function duration()
    {
        return sprintf("%d:%02d", floor($this->duration / 60), $this->duration % 60);
    }

    public function getPeriodNameAttribute()
    {
        return $this->period->name;
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

    public function getNameWithComposerAttribute()
    {
        return $this->name . ' by ' . $this->composer->name;
    }
}
