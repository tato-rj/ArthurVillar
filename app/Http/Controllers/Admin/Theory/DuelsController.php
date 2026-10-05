<?php

namespace App\Http\Controllers\Admin\Theory;

use App\Http\Controllers\Controller;
use App\Theory\Duels\Duel;
use App\Theory\Duels\DuelArchive;
use App\Theory\Duels\DuelDetails;
use App\Theory\Duels\GameRegistry;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Yajra\DataTables\Facades\DataTables;

class DuelsController extends Controller
{
    public function index()
    {
        $games = $this->games();

        return view('admin.theory.duels.index', compact('games'));
    }

    public function table(Request $request)
    {
        $filters = $request->validate([
            'game' => ['nullable', Rule::in(array_keys(GameRegistry::GAMES))],
            'completed' => ['nullable', Rule::in(['yes', 'no'])],
        ]);
        $games = $this->games();
        $current = Duel::query()->select(['id', 'game', 'status'])
            ->selectRaw('COALESCE(starts_at, created_at) as played_at, 0 as archived');
        $history = DuelArchive::query()->select(['id', 'game', 'status', 'played_at'])
            ->selectRaw('1 as archived');
        $duels = DB::query()->fromSub($current->unionAll($history)->toBase(), 'duel_history')
            ->when($filters['game'] ?? null, fn ($query, $game) => $query->where('game', $game))
            ->when($filters['completed'] ?? null, function ($query, $completed) {
                $completed === 'yes'
                    ? $query->where('status', Duel::FINISHED)
                    : $query->where('status', '!=', Duel::FINISHED);
            });

        return DataTables::query($duels)
            ->editColumn('played_at', fn ($duel) => Carbon::parse($duel->played_at)->toIso8601String())
            ->addColumn('completed', fn ($duel) => $duel->status === Duel::FINISHED)
            ->addColumn('status_label', fn ($duel) => $this->statusLabel($duel->status))
            ->editColumn('game', fn ($duel) => $games[$duel->game] ?? str($duel->game)->headline()->toString())
            ->addColumn('info_url', fn ($duel) => route($duel->archived
                ? 'admin.theory.duels.history.show' : 'admin.theory.duels.show', $duel->id))
            ->addColumn('delete_url', fn ($duel) => route($duel->archived
                ? 'admin.theory.duels.history.destroy' : 'admin.theory.duels.destroy', $duel->id))
            ->filterColumn('game', function ($query, $keyword) use ($games) {
                $matching = array_keys(array_filter($games, fn ($name, $slug) =>
                    str_contains(strtolower($name.' '.$slug), strtolower($keyword)), ARRAY_FILTER_USE_BOTH));
                $query->whereIn('game', $matching);
            })
            ->filterColumn('status', function ($query, $keyword) {
                $matching = array_filter($this->statuses(), fn ($status) =>
                    str_contains(strtolower($this->statusLabel($status)), strtolower($keyword)));
                $query->whereIn('status', $matching);
            })
            ->filterColumn('played_at', fn ($query, $keyword) =>
                $query->where('played_at', 'like', '%'.$keyword.'%'))
            ->orderColumn('played_at', 'played_at $1')
            ->orderColumn('status', "CASE WHEN status = 'finished' THEN 1 ELSE 0 END $1")
            ->toJson();
    }

    public function show(Duel $duel)
    {
        return $this->details($duel->load('players'));
    }

    public function showArchive(DuelArchive $archive)
    {
        return $this->details($archive->recordedDuel(), true);
    }

    private function details(Duel $duel, bool $archived = false)
    {
        $game = $this->games()[$duel->game] ?? str($duel->game)->headline()->toString();
        $gameSettings = isset(GameRegistry::GAMES[$duel->game]) ? GameRegistry::settings($duel->game) : null;
        $gameIcon = $gameSettings?->gameIcon() ?? 'gamepad';
        $gameTheme = $gameSettings?->gameTheme() ?? 'blue';
        $status = $this->statusLabel($duel->status);
        $terminal = in_array($duel->status, [Duel::FINISHED, Duel::CANCELLED, Duel::EXPIRED]);
        $timezone = config('calendar.timezone');
        $day = ($duel->starts_at ?? $duel->created_at)->copy()->timezone($timezone);
        $formatTime = function ($time) use ($day, $timezone) {
            if (! $time) {
                return '—';
            }
            $local = $time->copy()->timezone($timezone);
            $format = $local->isSameDay($day) ? 'g:i:s A'
                : ($local->year === $day->year ? 'M j, g:i:s A' : 'M j, Y, g:i:s A');

            return $local->format($format);
        };
        $duration = function ($finishedAt) use ($duel) {
            if (! $duel->starts_at || ! $finishedAt) {
                return '—';
            }
            $seconds = max(0, (int) floor(($finishedAt->getTimestampMs() - $duel->starts_at->getTimestampMs()) / 1000));

            if ($seconds < 60) {
                return $seconds.' sec';
            }
            if ($seconds < 3600) {
                return intdiv($seconds, 60).' min'.($seconds % 60 ? ' '.($seconds % 60).' sec' : '');
            }

            return intdiv($seconds, 3600).' hr'.(intdiv($seconds % 3600, 60) ? ' '.intdiv($seconds % 3600, 60).' min' : '');
        };
        $winner = null;
        $outcome = $duel->status === Duel::FINISHED ? 'Completed' : 'Not completed';
        $outcomeNote = match ($duel->status) {
            Duel::WAITING => 'Waiting for an opponent to join.',
            Duel::READY => 'Both players joined. The game has not started yet.',
            Duel::COUNTDOWN => 'Both players are getting ready to play.',
            Duel::PLAYING => 'The duel is still in progress.',
            Duel::CANCELLED => $duel->left_by ? ucfirst($duel->left_by).' left before the duel was completed.' : 'This duel was cancelled.',
            Duel::EXPIRED => 'This duel expired before both players finished.',
            default => 'Results were not recorded for both players.',
        };
        if ($duel->status === Duel::FINISHED && $duel->players->count() === 2
            && $duel->players->every(fn ($player) => $player->finished_at && isset($player->result['accuracy']))) {
            $host = $duel->players->firstWhere('role', 'host');
            $guest = $duel->players->firstWhere('role', 'guest');
            if ($host && $guest) {
                $difference = ($host->score - $guest->score) ?: ($host->result['accuracy'] - $guest->result['accuracy']);
                $winner = $difference > 0 ? 'host' : ($difference < 0 ? 'guest' : null);
                $outcome = $winner ? ucfirst($winner).' won' : 'Draw';
                $points = abs($host->score - $guest->score);
                $outcomeNote = $points ? 'A lead of '.$points.' '.str('point')->plural($points).'.'
                    : ($winner ? 'Same score — higher accuracy broke the tie.' : 'Both players earned the same score and accuracy.');
            }
        }

        $settingFields = DuelDetails::fields($duel->settings ?? [], $formatTime);
        $activityFields = $duel->players->mapWithKeys(fn ($player) => [$player->role => [
            'result' => DuelDetails::fields(array_diff_key($player->result ?? [], array_flip(['score', 'accuracy'])), $formatTime),
            'checkpoint' => DuelDetails::fields($player->checkpoint ?? [], $formatTime),
        ]]);

        return view('admin.theory.duels.show', compact('duel', 'game', 'gameIcon', 'gameTheme', 'status', 'timezone',
            'day', 'formatTime', 'duration', 'outcome', 'outcomeNote', 'winner', 'settingFields', 'activityFields', 'archived', 'terminal'));
    }

    public function destroy(Request $request, Duel $duel)
    {
        $id = $duel->id;
        $duel->delete();

        return $request->expectsJson()
            ? response()->json(['deleted' => true, 'id' => $id])
            : back()->with('success', 'The duel was successfully deleted');
    }

    public function destroyArchive(Request $request, DuelArchive $archive)
    {
        $id = $archive->id;
        $archive->delete();

        return $request->expectsJson()
            ? response()->json(['deleted' => true, 'id' => $id])
            : back()->with('success', 'The duel was successfully deleted');
    }

    private function games(): array
    {
        $games = [];
        foreach (GameRegistry::GAMES as $slug => $class) {
            $games[$slug] = (new $class)->gameName();
        }

        return $games;
    }

    private function statuses(): array
    {
        return [Duel::WAITING, Duel::READY, Duel::COUNTDOWN, Duel::PLAYING, Duel::FINISHED, Duel::CANCELLED, Duel::EXPIRED];
    }

    private function statusLabel(string $status): string
    {
        return match ($status) {
            Duel::WAITING => 'Waiting for opponent',
            Duel::FINISHED => 'Completed',
            Duel::CANCELLED => 'Cancelled',
            default => str($status)->headline()->toString(),
        };
    }
}
