<?php

namespace Tests\Feature;

use App\Models\Listening\Recording;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\BaseTest;

class ListeningRecordingAudioUploadTest extends BaseTest
{
    public function test_an_mp3_creates_a_recording_without_a_youtube_url_or_conversion(): void
    {
        $this->signIn();

        $this->post(route('listening.recordings.store'), [
            'name' => 'Manually uploaded piece',
            'composer_id' => 1,
            'period_id' => 1,
            'audio' => UploadedFile::fake()->create('piece.mp3', 100, 'audio/mpeg'),
        ])->assertSessionHasNoErrors();

        $recording = Recording::sole();
        $this->assertNull($recording->source_url);
        Storage::disk('public')->assertExists($recording->audio_path);
        $this->assertStringStartsWith('recordings/audio/', $recording->audio_path);
    }

    public function test_creating_a_recording_still_requires_an_audio_source(): void
    {
        $this->signIn();

        $this->post(route('listening.recordings.store'), [
            'name' => 'No audio source',
            'composer_id' => 1,
            'period_id' => 1,
        ])->assertSessionHasErrors('youtube_url');

        $this->assertDatabaseCount('recordings', 0);
    }

    public function test_an_uploaded_mp3_takes_precedence_over_a_youtube_url(): void
    {
        $this->signIn();

        $this->post(route('listening.recordings.store'), [
            'name' => 'Piece with both sources',
            'composer_id' => 1,
            'period_id' => 1,
            'youtube_url' => 'https://www.youtube.com/watch?v=example',
            'audio' => UploadedFile::fake()->create('piece.mp3', 100, 'audio/mpeg'),
        ])->assertSessionHasNoErrors();

        $recording = Recording::sole();
        $this->assertSame('https://www.youtube.com/watch?v=example', $recording->source_url);
        Storage::disk('public')->assertExists($recording->audio_path);
    }

    public function test_an_mp3_can_replace_the_audio_on_an_existing_recording(): void
    {
        $this->signIn();
        $recording = Recording::create([
            'name' => 'Existing piece',
            'composer_id' => 1,
            'period_id' => 1,
            'audio_path' => 'recordings/audio/old.mp3',
        ]);

        $this->patch(route('listening.recordings.update', $recording), [
            'name' => $recording->name,
            'composer_id' => 1,
            'period_id' => 1,
            'audio' => UploadedFile::fake()->create('replacement.mp3', 100, 'audio/mpeg'),
        ])->assertSessionHasNoErrors();

        $recording->refresh();
        $this->assertNotSame('recordings/audio/old.mp3', $recording->audio_path);
        Storage::disk('public')->assertExists($recording->audio_path);
    }
}
