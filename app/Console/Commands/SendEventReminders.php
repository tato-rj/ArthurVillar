<?php

namespace App\Console\Commands;

use App\Models\Event;
use App\Notifications\EventReminder;
use Carbon\CarbonImmutable;
use Illuminate\Console\Command;
use Throwable;

class SendEventReminders extends Command
{
    protected $signature = 'studio:send-event-reminders';

    protected $description = 'Send due Web Push reminders for general events';

    public function handle(): int
    {
        $now = CarbonImmutable::now(config('studio.timezone'));
        $sent = 0;

        Event::query()
            ->with(['notificationUser.pushSubscriptions'])
            ->whereNotNull('notification_user_id')
            ->whereNotNull('notification_minutes_before')
            ->whereNull('notification_sent_at')
            ->orderBy('id')
            ->chunkById(100, function ($events) use ($now, &$sent) {
                foreach ($events as $event) {
                    $startsAt = CarbonImmutable::createFromFormat(
                        'Y-m-d H:i',
                        $event->scheduled_date->toDateString().' '.substr($event->starts_at, 0, 5),
                        config('studio.timezone')
                    );
                    $remindAt = $startsAt->subMinutes($event->notification_minutes_before);

                    if ($now->lt($remindAt) || $now->gte($startsAt->addMinute())) {
                        continue;
                    }

                    $user = $event->notificationUser;

                    if (! $user || $user->pushSubscriptions->isEmpty()) {
                        continue;
                    }

                    try {
                        $user->notify(new EventReminder($event));
                        $event->forceFill(['notification_sent_at' => now()])->save();
                        $sent++;
                    } catch (Throwable $exception) {
                        report($exception);
                        $this->error('Could not send reminder for event '.$event->id.': '.$exception->getMessage());
                    }
                }
            });

        $this->info("Sent {$sent} event reminder(s).");

        return self::SUCCESS;
    }
}
