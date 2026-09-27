<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Process\Process;
use Tests\CreatesApplication;

class YoutubeToMp3Test extends TestCase
{
    use CreatesApplication;

    private string $toolsDirectory;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
        Log::spy();

        $this->toolsDirectory = sys_get_temp_dir().'/youtube conversion '.bin2hex(random_bytes(8));
        File::makeDirectory($this->toolsDirectory, 0700, true);

        // Run real child processes without making requests to YouTube.
        $script = '#!'.PHP_BINARY."\n".<<<'PHP'
<?php
$tool = basename(__FILE__);
$directory = dirname(__FILE__);
if ($tool === 'deno') {
    echo 'deno '.(is_file($directory.'/old-deno') ? '2.2.0' : '2.3.0')."\n";
    exit(0);
}
if ($tool === 'ffprobe') {
    echo "5.0\n";
    exit(0);
}
if ($tool === 'ffmpeg') {
    if (is_file($directory.'/fail-fade')) {
        fwrite(STDERR, 'Fade failed');
        exit(1);
    }
    file_put_contents(end($argv), 'faded mp3');
    exit(0);
}
$cookieIndex = array_search('--cookies', $argv, true);
$cookies = $cookieIndex === false ? null : $argv[$cookieIndex + 1];
file_put_contents($directory.'/call.json', json_encode([
    'arguments' => $argv,
    'cookies' => $cookies,
    'cookie_contents' => $cookies ? file_get_contents($cookies) : null,
]));
if ($cookies) {
    file_put_contents($cookies, 'rewritten cookie jar');
}
if (is_file($directory.'/fail-download')) {
    fwrite(STDERR, "WARNING: No title found\nERROR: [youtube] Sign in to confirm you're not a bot\n");
    exit(1);
}
$outputIndex = array_search('-o', $argv, true);
file_put_contents(str_replace('%(ext)s', 'mp3', $argv[$outputIndex + 1]), 'downloaded mp3');
PHP;

        foreach (['deno', 'yt-dlp', 'ffmpeg', 'ffprobe'] as $tool) {
            file_put_contents($this->toolsDirectory.'/'.$tool, $script);
            chmod($this->toolsDirectory.'/'.$tool, 0700);
        }

        config([
            'youtube.yt_dlp_path' => $this->toolsDirectory.'/yt-dlp',
            'youtube.ffmpeg_path' => $this->toolsDirectory.'/ffmpeg',
            'youtube.deno_path' => $this->toolsDirectory.'/deno',
            'youtube.cookies_path' => $this->toolsDirectory.'/cookies.txt',
        ]);
        file_put_contents(config('youtube.cookies_path'), "# Netscape HTTP Cookie File\n");
        chmod(config('youtube.cookies_path'), 0400);
    }

    protected function tearDown(): void
    {
        File::deleteDirectory($this->toolsDirectory);
        parent::tearDown();
    }

    private function convert(array $arguments = []): int
    {
        return Artisan::call('youtube:mp3', array_merge([
            'url' => 'https://youtube.com/shorts/lBCWzz8ZbZA',
            'folder' => 'recordings/audio',
        ], $arguments));
    }

    private function downloadCall(): array
    {
        return json_decode(file_get_contents($this->toolsDirectory.'/call.json'), true);
    }

    public function test_conversion_uses_configured_tools_and_preserves_the_source_cookies(): void
    {
        $this->assertSame(0, $this->convert(['start' => '00:01', 'end' => '00:04']));
        $path = trim(Artisan::output());
        Storage::disk('public')->assertExists($path);
        $this->assertSame('faded mp3', Storage::disk('public')->get($path));

        $call = $this->downloadCall();
        $this->assertSame("# Netscape HTTP Cookie File\n", $call['cookie_contents']);
        $this->assertNotSame(config('youtube.cookies_path'), $call['cookies']);
        $this->assertFileDoesNotExist($call['cookies']);
        $this->assertSame("# Netscape HTTP Cookie File\n", file_get_contents(config('youtube.cookies_path')));
        $this->assertContains('deno:'.$this->toolsDirectory.'/deno', $call['arguments']);
        $this->assertContains('*00:01-00:04', $call['arguments']);
        $this->assertSame('https://youtube.com/watch?v=lBCWzz8ZbZA', end($call['arguments']));
    }

    public function test_blank_cookie_configuration_does_not_pass_an_empty_cookie_argument(): void
    {
        config(['youtube.cookies_path' => '']);
        $this->assertSame(0, $this->convert());
        $this->assertNotContains('--cookies', $this->downloadCall()['arguments']);
    }

    public function test_conversion_uses_cached_configuration_when_environment_paths_are_different(): void
    {
        config(['filesystems.disks.public.root' => $this->toolsDirectory.'/audio']);
        $cachePath = $this->toolsDirectory.'/config.php';
        file_put_contents($cachePath, '<?php return '.var_export(config()->all(), true).';');

        // A fresh Laravel process loads cached config and skips loading .env.
        $process = new Process([
            PHP_BINARY, base_path('artisan'), 'youtube:mp3',
            'https://youtube.com/watch?v=lBCWzz8ZbZA', 'recordings/audio',
        ], base_path(), [
            'APP_CONFIG_CACHE' => $cachePath,
            'YT_PATH' => '/missing/yt-dlp',
            'FFMPEG_PATH' => '/missing/ffmpeg',
            'DENO_PATH' => '/missing/deno',
            'YT_COOKIES_PATH' => '/missing/cookies.txt',
        ]);
        $process->setTimeout(30);
        $process->run();

        $this->assertSame(0, $process->getExitCode(), $process->getErrorOutput().$process->getOutput());
        $this->assertFileExists($this->toolsDirectory.'/audio/'.trim($process->getOutput()));
        $this->assertSame("# Netscape HTTP Cookie File\n", $this->downloadCall()['cookie_contents']);
        $this->assertFileDoesNotExist($this->downloadCall()['cookies']);
    }

    public function test_missing_cookies_fail_before_downloading(): void
    {
        config(['youtube.cookies_path' => $this->toolsDirectory.'/missing.txt']);
        $this->assertSame(1, $this->convert());
        $this->assertStringContainsString('YT_COOKIES_PATH', Artisan::output());
        $this->assertFileDoesNotExist($this->toolsDirectory.'/call.json');
    }

    public function test_bot_checks_produce_an_actionable_error_and_remove_temporary_cookies(): void
    {
        touch($this->toolsDirectory.'/fail-download');
        $this->assertSame(1, $this->convert());
        $this->assertStringContainsString('Refresh the server', Artisan::output());
        $this->assertStringNotContainsString('WARNING:', Artisan::output());
        $this->assertFileDoesNotExist($this->downloadCall()['cookies']);
        Log::shouldHaveReceived('warning')->withArgs(fn ($message, $context) =>
            str_contains($context['details'], 'Sign in to confirm')
        )->once();
    }

    public function test_an_unsupported_deno_version_fails_with_a_runtime_error(): void
    {
        touch($this->toolsDirectory.'/old-deno');
        $this->assertSame(1, $this->convert());
        $this->assertStringContainsString('Deno 2.3 or newer', Artisan::output());
        $this->assertFileDoesNotExist($this->toolsDirectory.'/call.json');
    }

    public function test_fade_failures_report_the_failing_process_and_clean_up_cookies(): void
    {
        touch($this->toolsDirectory.'/fail-fade');
        $this->assertSame(1, $this->convert());
        $this->assertStringContainsString('Fade failed', Artisan::output());
        $this->assertFileDoesNotExist($this->downloadCall()['cookies']);
    }
}
