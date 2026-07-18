<?php

namespace App\Notifications;

use App\Models\Calendar\Event;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushChannel;
use NotificationChannels\WebPush\WebPushMessage;

class EventReminder extends Notification
{
    public Event $event;

    public function __construct(Event $event)
    {
        $this->event = $event;
    }

    public function via($notifiable): array
    {
        return [WebPushChannel::class];
    }

    public function toWebPush($notifiable, $notification): WebPushMessage
    {
        $time = Event::timeLabel(substr($this->event->starts_at, 0, 5));
        $url = route('calendar.home', [
            'view' => 'day',
            'date' => $this->event->scheduled_date->toDateString(),
        ]);

        return (new WebPushMessage)
            ->title($this->event->name)
            ->body('Starts at '.$time)
            ->icon('/favicon/calendar/android-icon-192x192.png')
            ->badge('/favicon/calendar/android-icon-192x192.png')
            ->tag('event-reminder-'.$this->event->id)
            ->data(['url' => $url])
            ->options(['TTL' => 3600]);
    }
}
