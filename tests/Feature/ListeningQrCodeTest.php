<?php

namespace Tests\Feature;

use App\Models\Listening\Composer;
use App\Models\Listening\Recording;
use App\Token\Token;
use Tests\BaseTest;

class ListeningQrCodeTest extends BaseTest
{
    public function test_authenticated_user_can_download_a_qr_code_for_the_piece_url(): void
    {
        $composer = Composer::create([
            'name' => 'Johann Sebastian Bach',
            'period_id' => 1,
            'country_id' => 1,
            'biography' => '',
            'curiosity' => '',
            'born_in' => '1685',
            'died_in' => '1750',
        ]);
        $recording = Recording::create([
            'name' => 'Cello Suite',
            'composer_id' => $composer->id,
            'period_id' => 1,
        ]);
        $token = Token::generate($recording->id);
        $downloadUrl = route('listening.qrcode', ['token' => $token]);

        $this->get($downloadUrl)->assertRedirect(route('login'));

        $this->signIn();

        $response = $this->get($downloadUrl);

        $response->assertOk()
            ->assertHeader('Content-Type', 'image/svg+xml')
            ->assertDownload('cello-suite-by-johann-sebastian-bach.svg');
        $this->assertStringContainsString('<svg', $response->streamedContent());
    }
}
