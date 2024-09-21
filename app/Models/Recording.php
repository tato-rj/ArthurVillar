<?php

namespace App\Models;

use getID3 as AudioAnalyzer;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class Recording extends BaseModel
{
    protected static function boot()
    {
        parent::boot();

        self::deleting(function($recording) {
            if (\Storage::disk('public')->exists($recording->cover_path))
                \Storage::disk('public')->delete($recording->cover_path);
            
            if (\Storage::disk('public')->exists($recording->audio_path))
                \Storage::disk('public')->delete($recording->audio_path);
        });
    }

    public function period()
    {
        return $this->belongsTo(Period::class);
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

    public function playUrl()
    {
        return route('recordings.play', ['recording' => $this, 'token' => env('APP_TOKEN')]);
    }

    public function file($file)
    {
        if (production())
            return asset('storage/'.$this->$file);

        return asset($this->$file);
    }

    public function getNameWithComposerAttribute()
    {
        return $this->name . ' by ' . $this->composer;
    }

    public function qrcode($format = null)
    {
        $qrcode = QrCode::size(500)->margin(1);
        
        if ($format)
            $qrcode->format($format);

        return $qrcode->errorCorrection('M')
               ->generate(route('recordings.play', $this));
    }
}
