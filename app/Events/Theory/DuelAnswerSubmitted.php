<?php

namespace App\Events\Theory;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class DuelAnswerSubmitted implements ShouldBroadcastNow
{
    public function __construct(public string $duelId, public string $role, public bool $correct, public string $id) {}

    public function broadcastOn(): array
    {
        return [new PrivateChannel('theory.duel.'.$this->duelId)];
    }

    public function broadcastAs(): string
    {
        return 'DuelAnswerSubmitted';
    }

    public function broadcastWith(): array
    {
        return ['duel_id' => $this->duelId, 'role' => $this->role, 'correct' => $this->correct, 'id' => $this->id];
    }
}
