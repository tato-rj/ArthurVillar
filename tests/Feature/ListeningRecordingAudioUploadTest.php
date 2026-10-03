<?php

namespace Tests\Feature;

use App\Models\Listening\Recording;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use PHPUnit\Framework\Attributes\DataProvider;
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

    public function test_the_edit_form_can_replace_an_mp3_larger_than_two_megabytes(): void
    {
        $this->signIn();
        Storage::disk('public')->put('recordings/audio/old.mp3', 'original audio');
        $recording = Recording::create([
            'name' => 'Existing piece',
            'composer_id' => 1,
            'period_id' => 1,
            'audio_path' => 'recordings/audio/old.mp3',
        ]);

        $this->post(route('listening.recordings.update', $recording), [
            '_method' => 'PATCH',
            'name' => 'Updated piece',
            'composer_id' => 1,
            'period_id' => 1,
            'audio' => UploadedFile::fake()->create('replacement.mp3', 8192, 'audio/mpeg'),
        ])->assertSessionHasNoErrors();

        $recording->refresh();
        $this->assertSame('Updated piece', $recording->name);
        $this->assertNotSame('recordings/audio/old.mp3', $recording->audio_path);
        Storage::disk('public')->assertExists($recording->audio_path);
    }

    #[DataProvider('failedUploads')]
    public function test_a_failed_replacement_explains_the_problem_and_preserves_the_recording(int $error, string $message): void
    {
        $this->signIn();
        Storage::disk('public')->put('recordings/audio/old.mp3', 'original audio');
        $recording = Recording::create([
            'name' => 'Existing piece',
            'composer_id' => 1,
            'period_id' => 1,
            'audio_path' => 'recordings/audio/old.mp3',
        ]);

        $this->post(route('listening.recordings.update', $recording), [
            '_method' => 'PATCH',
            'name' => 'Updated piece',
            'composer_id' => 1,
            'period_id' => 1,
            'audio' => new UploadedFile('', 'replacement.mp3', 'audio/mpeg', $error, true),
        ])->assertSessionHasErrors([
            'audio' => $error === UPLOAD_ERR_INI_SIZE
                ? 'The MP3 exceeds the server upload limit of ' . formatBytes(UploadedFile::getMaxFilesize()) . '. Please choose a smaller file or increase the server upload limit.'
                : $message,
        ]);

        $recording->refresh();
        $this->assertSame('Existing piece', $recording->name);
        $this->assertSame('recordings/audio/old.mp3', $recording->audio_path);
        $this->assertSame('original audio', Storage::disk('public')->get($recording->audio_path));
        $this->assertCount(1, Storage::disk('public')->allFiles('recordings/audio'));
    }

    public static function failedUploads(): array
    {
        return [
            'PHP size limit' => [UPLOAD_ERR_INI_SIZE, ''],
            'interrupted upload' => [UPLOAD_ERR_PARTIAL, 'The MP3 upload was interrupted. Please select the file and try again.'],
            'temporary storage failure' => [UPLOAD_ERR_CANT_WRITE, 'The server could not receive the MP3. Please select the file and try again.'],
        ];
    }

    public function test_a_failed_upload_does_not_create_a_recording_or_convert_youtube(): void
    {
        $this->signIn();

        $this->post(route('listening.recordings.store'), [
            'name' => 'Failed upload',
            'composer_id' => 1,
            'period_id' => 1,
            'youtube_url' => 'https://www.youtube.com/watch?v=example',
            'audio' => new UploadedFile('', 'piece.mp3', 'audio/mpeg', UPLOAD_ERR_PARTIAL, true),
        ])->assertSessionHasErrors([
            'audio' => 'The MP3 upload was interrupted. Please select the file and try again.',
        ]);

        $this->assertDatabaseCount('recordings', 0);
        $this->assertSame([], Storage::disk('public')->allFiles());
    }
}
