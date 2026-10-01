<?php

namespace Tests\Feature;

use App\Theory\Duels\Duel;
use App\Theory\Duels\DuelService;
use Illuminate\Http\Request;
use Illuminate\Session\ArraySessionHandler;
use Illuminate\Session\Store;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class TheoryDuelConcurrencyTest extends TestCase
{
    public function test_two_simultaneous_guests_cannot_claim_the_same_slot(): void
    {
        if (! function_exists('pcntl_fork')) {
            $this->markTestSkipped('The concurrency test requires pcntl (run on macOS/Linux CI).');
        }
        $path = tempnam(sys_get_temp_dir(), 'duel-race-');
        $original = config('database.default');
        config(['database.connections.duel_race' => ['driver' => 'sqlite', 'database' => $path, 'prefix' => '', 'foreign_key_constraints' => true, 'busy_timeout' => 5000], 'database.default' => 'duel_race']);
        $migration = require database_path('migrations/2026_09_26_200000_create_theory_duels.php');
        $migration->up();
        (require database_path('migrations/2026_09_26_220000_add_left_by_to_theory_duels.php'))->up();
        (require database_path('migrations/2026_09_27_000000_add_browser_presence_to_theory_duel_players.php'))->up();
        (require database_path('migrations/2026_10_01_000000_add_rematch_to_theory_duel_players.php'))->up();
        $request = Request::create('/', 'POST');
        $request->setLaravelSession(new Store('host', new ArraySessionHandler(120)));
        $room = app(DuelService::class)->create($request, 'intervals-lab', ['numOfChallenges' => 2]);
        // Close the parent PDO before forking. Each guest opens an independent connection.
        DB::purge('duel_race');
        $children = [];
        try {
            for ($index = 0; $index < 2; $index++) {
                $pid = pcntl_fork();
                if ($pid === 0) {
                    touch($path.'.ready'.$index);
                    while (! file_exists($path.'.go')) {
                        usleep(1000);
                    }
                    $guest = Request::create('/', 'POST');
                    $guest->setLaravelSession(new Store('guest'.$index, new ArraySessionHandler(120)));
                    try {
                        app(DuelService::class)->join($guest, $room->code);
                        $outcome = 'joined';
                    } catch (ValidationException $exception) {
                        $outcome = 'rejected';
                    } catch (\Throwable $exception) {
                        $outcome = get_class($exception).': '.$exception->getMessage();
                    }
                    file_put_contents($path.'.result'.$index, $outcome);
                    exit(0);
                }
                $children[] = $pid;
            }
            $deadline = microtime(true) + 5;
            while ((! file_exists($path.'.ready0') || ! file_exists($path.'.ready1')) && microtime(true) < $deadline) {
                usleep(1000);
            }
            touch($path.'.go');
            foreach ($children as $pid) {
                pcntl_waitpid($pid, $status);
            }
            $outcomes = [file_get_contents($path.'.result0'), file_get_contents($path.'.result1')];
            sort($outcomes);
            $this->assertSame(['joined', 'rejected'], $outcomes);
            $this->assertSame(2, Duel::find($room->id)->players()->count());
        } finally {
            DB::purge('duel_race');
            config(['database.default' => $original]);
            foreach (glob($path.'*') as $file) {
                unlink($file);
            }
        }
    }
}
