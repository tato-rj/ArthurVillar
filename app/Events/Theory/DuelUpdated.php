<?php

namespace App\Events\Theory;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class DuelUpdated implements ShouldBroadcastNow
{
    public function __construct(public array $state, public string $change) {}

    public function broadcastOn(): array
    {
        return [new PrivateChannel('theory.duel.'.$this->state['id'])];
    }

    public function broadcastAs(): string
    {
        return 'DuelUpdated';
    }

    public function broadcastWith(): array
    {
        return ['change' => $this->change, 'state' => $this->state];
    }
}
