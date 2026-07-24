<?php

namespace App\Services;

use App\Calendar\Scheduler;
use App\Models\Calendar\Location;
use Carbon\CarbonImmutable;

class CalendarTravelOrigin
{
    public function __construct(private Scheduler $scheduler)
    {
    }

    public function before(CarbonImmutable $targetAt, ?int $userId): ?array
    {
        $range = [
            'start' => $targetAt->toDateString(),
            'end' => $targetAt->toDateString(),
        ];
        $home = $this->home();
        $candidates = collect();

        $this->appendLessons($candidates, $this->scheduler->plannedLessons($range), $targetAt, $home);
        $this->appendLessons($candidates, $this->scheduler->singleLessonPlans($range), $targetAt, $home);
        $this->appendGeneralEvents($candidates, $this->scheduler->generalEvents($range, $userId), $targetAt, $home);
        $this->appendRecitals($candidates, $this->scheduler->recitals($range), $targetAt, $home);

        return $candidates->sortByDesc('ends_at')->first() ?: $home;
    }

    public function home(): ?array
    {
        $location = Location::query()
            ->whereRaw('LOWER(name) = ?', ['home'])
            ->first();

        return $location ? $this->locationPayload($location->toArray()) : null;
    }

    private function appendLessons($candidates, $lessonPlans, CarbonImmutable $targetAt, ?array $home): void
    {
        foreach ($lessonPlans as $lessonPlan) {
            $location = $this->locationPayload($lessonPlan['location'] ?? [], $home);

            foreach ($lessonPlan['occurrences'] ?? [] as $occurrence) {
                if (($occurrence['calendar_status'] ?? $occurrence['lesson_status'] ?? null) === 'canceled') {
                    continue;
                }

                $endsAt = $this->dateTime($occurrence['date'] ?? null, $occurrence['end'] ?? null);

                if (! $endsAt || $endsAt->gt($targetAt)) {
                    continue;
                }

                $candidates->push([
                    'address' => $location['address'] ?? ($home['address'] ?? null),
                    'label' => $location['label'] ?? ($home['label'] ?? 'Home'),
                    'ends_at' => $endsAt,
                ]);
            }
        }
    }

    private function appendGeneralEvents($candidates, $events, CarbonImmutable $targetAt, ?array $home): void
    {
        foreach ($events as $event) {
            if (! empty($event['canceled_at']) || ($event['calendar_status'] ?? null) === 'canceled') {
                continue;
            }

            $endsAt = $this->dateTime($event['scheduled_date'] ?? null, $event['ends_at'] ?? null);

            if (! $endsAt || $endsAt->gt($targetAt)) {
                continue;
            }

            $location = $this->stringLocationPayload($event['location'] ?? null, $home);
            $candidates->push([
                'address' => $location['address'] ?? ($home['address'] ?? null),
                'label' => $location['label'] ?? ($home['label'] ?? 'Home'),
                'ends_at' => $endsAt,
            ]);
        }
    }

    private function appendRecitals($candidates, $recitals, CarbonImmutable $targetAt, ?array $home): void
    {
        foreach ($recitals as $recital) {
            $endsAt = $this->dateTime($recital['date'] ?? null, $recital['start_time'] ?? null)?->addHours(2);

            if (! $endsAt || $endsAt->gt($targetAt)) {
                continue;
            }

            $location = $this->locationPayload($recital['location'] ?? [], $home);
            $candidates->push([
                'address' => $location['address'] ?? ($home['address'] ?? null),
                'label' => $location['label'] ?? ($home['label'] ?? 'Home'),
                'ends_at' => $endsAt,
            ]);
        }
    }

    private function locationPayload(array $location, ?array $home = null): ?array
    {
        $address = trim(collect([
            $location['address'] ?? null,
            collect([$location['city'] ?? null, $location['state'] ?? null])->filter()->implode(', '),
            $location['postal_code'] ?? null,
        ])->filter()->implode(', '));
        $name = trim((string) ($location['name'] ?? ''));

        if ($this->isVirtual($address) || $this->isVirtual($name)) {
            return $home;
        }

        $address = $address ?: $name;

        return $address ? ['address' => $address, 'label' => $name ?: $this->shortAddress($address)] : $home;
    }

    private function stringLocationPayload(?string $location, ?array $home): ?array
    {
        $location = trim((string) $location);

        if (! $location || $this->isVirtual($location)) {
            return $home;
        }

        return ['address' => $location, 'label' => $this->shortAddress($location)];
    }

    private function isVirtual(string $value): bool
    {
        return filter_var($value, FILTER_VALIDATE_URL)
            || (bool) preg_match('/^(online|virtual|remote|zoom|google meet|meet)$/i', $value);
    }

    private function shortAddress(string $address): string
    {
        return collect(preg_split('/\\s*(?:,|\\n)\\s*/', $address))
            ->filter()
            ->take(2)
            ->implode(', ');
    }

    private function dateTime($date, $time): ?CarbonImmutable
    {
        if (! $date || ! $time) {
            return null;
        }

        return CarbonImmutable::createFromFormat(
            'Y-m-d H:i',
            substr((string) $date, 0, 10).' '.substr((string) $time, 0, 5),
            config('calendar.timezone')
        );
    }
}
