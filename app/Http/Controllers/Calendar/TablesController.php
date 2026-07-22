<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Calendar\Scheduler;
use App\Models\Calendar\{Event, Expense, GoogleCalendarEvent, Invitation, Lesson, LessonPlan, Location, Recital, Student, TeachingBreak, Venue, WaitingList};
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class TablesController extends Controller
{
    public function invitations()
    {
        $invitations = Invitation::query()
            ->latest()
            ->select([
                'invitations.id',
                'invitations.public_id',
                'invitations.title',
                'invitations.description',
                'invitations.duration_minutes',
                'invitations.created_at',
            ])
            ->withCount(['options', 'participants']);

        return DataTables::eloquent($invitations)
            ->addColumn('public_url', function (Invitation $invitation) {
                return $invitation->publicUrl();
            })
            ->editColumn('created_at', function (Invitation $invitation) {
                return $invitation->created_at?->toIso8601String();
            })
            ->orderColumn('options_count', 'options_count $1')
            ->orderColumn('participants_count', 'participants_count $1')
            ->toJson();
    }

    public function events()
    {
        return $this->eventRows();
    }

    public function googleEvents()
    {
        $events = GoogleCalendarEvent::query()
            ->join(
                'google_calendar_connections',
                'google_calendar_connections.id',
                '=',
                'google_calendar_events.google_calendar_connection_id'
            )
            ->where('google_calendar_connections.user_id', request()->user()->id)
            ->startingOnOrAfterSyncCutoff()
            ->withinRecurringSyncHorizon()
            ->select([
                'google_calendar_events.*',
                'google_calendar_connections.calendar_id as calendar_id',
                'google_calendar_connections.calendar_name as calendar_name',
            ]);

        return DataTables::eloquent($events)
            ->addColumn('name', fn (GoogleCalendarEvent $event) => $event->title)
            ->addColumn('scheduled_date', function (GoogleCalendarEvent $event) {
                return $event->calendarPayload()['scheduled_date'];
            })
            ->editColumn('starts_at', function (GoogleCalendarEvent $event) {
                return $event->calendarPayload()['starts_at'];
            })
            ->editColumn('ends_at', function (GoogleCalendarEvent $event) {
                return $event->calendarPayload()['ends_at'];
            })
            ->addColumn('calendar', function (GoogleCalendarEvent $event) {
                return $event->calendar_name ?: $event->calendar_id;
            })
            ->addColumn('organizer', function (GoogleCalendarEvent $event) {
                $name = trim((string) $event->organizer_name);
                $email = trim((string) $event->organizer_email);

                if (! $name || strcasecmp($name, $email) === 0) {
                    return $email ?: $name;
                }

                return $email ? "$name ($email)" : $name;
            })
            ->addColumn('external_url', function (GoogleCalendarEvent $event) {
                return $event->calendarPayload()['external_url'];
            })
            ->filterColumn('name', function ($query, $keyword) {
                $query->where('google_calendar_events.title', 'like', "%$keyword%");
            })
            ->filterColumn('calendar', function ($query, $keyword) {
                $query->where(function ($calendar) use ($keyword) {
                    $calendar->where('google_calendar_connections.calendar_name', 'like', "%$keyword%")
                        ->orWhere('google_calendar_connections.calendar_id', 'like', "%$keyword%");
                });
            })
            ->filterColumn('organizer', function ($query, $keyword) {
                $query->where(function ($organizer) use ($keyword) {
                    $organizer->where('google_calendar_events.organizer_name', 'like', "%$keyword%")
                        ->orWhere('google_calendar_events.organizer_email', 'like', "%$keyword%");
                });
            })
            ->orderColumn('name', 'google_calendar_events.title $1')
            ->orderColumn(
                'scheduled_date',
                'COALESCE(google_calendar_events.starts_at, google_calendar_events.start_date) $1'
            )
            ->orderColumn('starts_at', 'google_calendar_events.starts_at $1')
            ->orderColumn('ends_at', 'google_calendar_events.ends_at $1')
            ->orderColumn('calendar', 'google_calendar_connections.calendar_name $1')
            ->orderColumn('organizer', 'google_calendar_events.organizer_name $1')
            ->toJson();
    }

    private function eventRows()
    {
        $events = Event::query()
            ->when(request('scheduled_from'), function ($query, $date) {
                $query->whereDate('scheduled_date', '>=', $date);
            })
            ->when(request('scheduled_to'), function ($query, $date) {
                $query->whereDate('scheduled_date', '<=', $date);
            })
            ->select([
                'id',
                'name',
                'scheduled_date',
                'starts_at',
                'ends_at',
                'type',
                'notes',
                'canceled_at',
            ]);

        return DataTables::eloquent($events)
            ->editColumn('scheduled_date', function (Event $event) {
                return $event->scheduled_date ? $event->scheduled_date->toDateString() : null;
            })
            ->editColumn('canceled_at', function (Event $event) {
                return $event->canceled_at?->toIso8601String();
            })
            ->addColumn('status', function (Event $event) {
                return $event->canceled_at ? 'Canceled' : 'Scheduled';
            })
            ->filterColumn('status', function ($query, $keyword) {
                $keyword = strtolower($keyword);

                $query->where(function ($query) use ($keyword) {
                    if (str_contains('scheduled', $keyword)) {
                        $query->orWhereNull('canceled_at');
                    }

                    if (str_contains('canceled', $keyword) || str_contains('cancelled', $keyword)) {
                        $query->orWhereNotNull('canceled_at');
                    }
                });
            })
            ->orderColumn('scheduled_date', 'scheduled_date $1')
            ->orderColumn('starts_at', 'starts_at $1')
            ->orderColumn('ends_at', 'ends_at $1')
            ->orderColumn('canceled_at', 'canceled_at $1')
            ->orderColumn('status', 'canceled_at $1')
            ->toJson();
    }

    public function expenses()
    {
        $driver = DB::connection()->getDriverName();
        $recurrenceExpression = "CASE expenses.recurrence
            WHEN 'weekly' THEN 'Weekly'
            WHEN 'monthly' THEN 'Monthly'
            ELSE 'One-time'
        END";
        $amountSearchExpression = $driver === 'sqlite'
            ? "'$' || CAST(expenses.amount / 100 AS TEXT)"
            : "CONCAT('$', CAST(expenses.amount / 100 AS CHAR))";
        $amountCastExpression = $driver === 'sqlite'
            ? 'CAST(expenses.amount / 100 AS TEXT)'
            : 'CAST(expenses.amount / 100 AS CHAR)';
        $amountCentsCastExpression = $driver === 'sqlite'
            ? 'CAST(expenses.amount AS TEXT)'
            : 'CAST(expenses.amount AS CHAR)';

        $expenses = Expense::query()
            ->select([
                'expenses.id',
                'expenses.name',
                'expenses.amount',
                'expenses.recurrence',
                'expenses.starts_on',
                'expenses.ends_on',
                'expenses.notes',
                DB::raw("$recurrenceExpression as recurrence_label"),
            ]);

        return DataTables::eloquent($expenses)
            ->editColumn('starts_on', function (Expense $expense) {
                return $expense->starts_on
                    ? $expense->starts_on->toDateString()
                    : null;
            })
            ->editColumn('ends_on', function (Expense $expense) {
                return $expense->ends_on
                    ? $expense->ends_on->toDateString()
                    : null;
            })
            ->filterColumn('amount', function ($query, $keyword) use ($amountSearchExpression, $amountCastExpression, $amountCentsCastExpression) {
                $numericKeyword = preg_replace('/[^0-9.]/', '', $keyword);

                $query->where(function ($query) use ($keyword, $numericKeyword, $amountSearchExpression, $amountCastExpression, $amountCentsCastExpression) {
                    $query->whereRaw("$amountSearchExpression LIKE ?", ["%{$keyword}%"]);

                    if ($numericKeyword !== '') {
                        $query->orWhereRaw("$amountCastExpression LIKE ?", ["%{$numericKeyword}%"])
                            ->orWhereRaw("$amountCentsCastExpression LIKE ?", ["%{$numericKeyword}%"]);
                    }
                });
            })
            ->filterColumn('recurrence_label', function ($query, $keyword) use ($recurrenceExpression) {
                $query->whereRaw("$recurrenceExpression LIKE ?", ["%{$keyword}%"]);
            })
            ->orderColumn('recurrence_label', 'expenses.recurrence $1')
            ->orderColumn('starts_on', 'expenses.starts_on $1')
            ->orderColumn('ends_on', 'expenses.ends_on $1')
            ->toJson();
    }

    public function lessonPlans()
    {
        $driver = DB::connection()->getDriverName();
        $studentExpression = $driver === 'sqlite'
            ? "students.first_name || ' ' || COALESCE(students.last_name, '')"
            : "CONCAT(students.first_name, ' ', COALESCE(students.last_name, ''))";
        $weekdayExpression = "CASE lesson_plans.weekday
            WHEN 1 THEN 'sunday'
            WHEN 2 THEN 'monday'
            WHEN 3 THEN 'tuesday'
            WHEN 4 THEN 'wednesday'
            WHEN 5 THEN 'thursday'
            WHEN 6 THEN 'friday'
            WHEN 7 THEN 'saturday'
        END";
        $recurrenceExpression = "CASE lesson_plans.recurrence_interval
            WHEN 1 THEN 'Every week'
            WHEN 2 THEN 'Every other week'
            ELSE ''
        END";
        $durationSearchExpression = $driver === 'sqlite'
            ? "lesson_plans.duration_minutes || ' min'"
            : "CONCAT(lesson_plans.duration_minutes, ' min')";
        $feeSearchExpression = $driver === 'sqlite'
            ? "'$' || CAST(lesson_plans.fee_amount / 100 AS TEXT)"
            : "CONCAT('$', CAST(lesson_plans.fee_amount / 100 AS CHAR))";
        $feeCastExpression = $driver === 'sqlite'
            ? 'CAST(lesson_plans.fee_amount / 100 AS TEXT)'
            : 'CAST(lesson_plans.fee_amount / 100 AS CHAR)';
        $feeCentsCastExpression = $driver === 'sqlite'
            ? 'CAST(lesson_plans.fee_amount AS TEXT)'
            : 'CAST(lesson_plans.fee_amount AS CHAR)';
        $today = DB::connection()->getPdo()->quote(today()->toDateString());
        $currentPlanCondition = "lesson_plans.starts_on IS NOT NULL
            AND lesson_plans.ends_on IS NOT NULL
            AND DATE(lesson_plans.starts_on) <= {$today}
            AND DATE(lesson_plans.ends_on) >= {$today}";
        $currentSiblingCondition = "current_lesson_plans.student_id = lesson_plans.student_id
            AND current_lesson_plans.starts_on IS NOT NULL
            AND current_lesson_plans.ends_on IS NOT NULL
            AND DATE(current_lesson_plans.starts_on) <= {$today}
            AND DATE(current_lesson_plans.ends_on) >= {$today}";
        $upcomingPlanCondition = "lesson_plans.starts_on IS NOT NULL
            AND lesson_plans.ends_on IS NOT NULL
            AND DATE(lesson_plans.starts_on) > {$today}";
        $closestUpcomingPlanId = "(
            SELECT upcoming_lesson_plans.id
            FROM lesson_plans upcoming_lesson_plans
            WHERE upcoming_lesson_plans.student_id = lesson_plans.student_id
                AND upcoming_lesson_plans.starts_on IS NOT NULL
                AND upcoming_lesson_plans.ends_on IS NOT NULL
                AND DATE(upcoming_lesson_plans.starts_on) > {$today}
            ORDER BY upcoming_lesson_plans.starts_on, upcoming_lesson_plans.start_time, upcoming_lesson_plans.id
            LIMIT 1
        )";
        $statusOrderExpression = "CASE
            WHEN ({$currentPlanCondition}) THEN 0
            WHEN ({$upcomingPlanCondition})
                AND NOT EXISTS (
                    SELECT 1
                    FROM lesson_plans current_lesson_plans
                    WHERE {$currentSiblingCondition}
                )
                AND lesson_plans.id = {$closestUpcomingPlanId}
            THEN 0
            ELSE 1
        END";
        $orderColumnIndex = request('order.0.column');
        $orderColumnName = $orderColumnIndex !== null
            ? (request("columns.{$orderColumnIndex}.name") ?: request("columns.{$orderColumnIndex}.data"))
            : null;
        $statusOrderDirection = $orderColumnName === 'status_order'
            ? (request('order.0.dir') === 'desc' ? 'desc' : 'asc')
            : null;

        $lessonPlans = LessonPlan::query()
            ->join('students', 'students.id', '=', 'lesson_plans.student_id')
            ->leftJoin('locations', 'locations.id', '=', 'lesson_plans.location_id')
            ->whereNull('lesson_plans.canceled_at')
            ->when(request('starts_from') || request('starts_to'), function ($query) {
                $query->whereNotNull('lesson_plans.starts_on');
            })
            ->when(request('starts_from'), function ($query, $date) {
                $query->where(function ($query) use ($date) {
                    $query
                        ->whereNull('lesson_plans.ends_on')
                        ->orWhereDate('lesson_plans.ends_on', '>=', $date);
                });
            })
            ->when(request('starts_to'), function ($query, $date) {
                $query->whereDate('lesson_plans.starts_on', '<=', $date);
            })
            ->when($statusOrderDirection, function ($query, $direction) use ($statusOrderExpression) {
                $query
                    ->orderByRaw("{$statusOrderExpression} {$direction}")
                    ->orderBy('lesson_plans.starts_on', $direction)
                    ->orderBy('lesson_plans.start_time', $direction)
                    ->orderBy('lesson_plans.id', $direction);
            })
            ->select([
                'lesson_plans.id',
                'lesson_plans.student_id',
                'lesson_plans.location_id',
                'lesson_plans.weekday',
                'lesson_plans.start_time',
                'lesson_plans.duration_minutes',
                'lesson_plans.recurrence_interval',
                'lesson_plans.starts_on',
                'lesson_plans.ends_on',
                'lesson_plans.fee_amount',
                'lesson_plans.payment_method',
                'lesson_plans.meeting_url',
                'lesson_plans.notes_url',
                'lesson_plans.notes',
                DB::raw("$studentExpression as student"),
                DB::raw('locations.name as location'),
                DB::raw("$weekdayExpression as weekday_name"),
                DB::raw("$recurrenceExpression as recurrence"),
                DB::raw("{$statusOrderExpression} as status_order"),
            ]);

        return DataTables::eloquent($lessonPlans)
            ->editColumn('starts_on', function (LessonPlan $lessonPlan) {
                return $lessonPlan->starts_on
                    ? $lessonPlan->starts_on->toDateString()
                    : null;
            })
            ->editColumn('ends_on', function (LessonPlan $lessonPlan) {
                return $lessonPlan->ends_on
                    ? $lessonPlan->ends_on->toDateString()
                    : null;
            })
            ->addColumn('status', function (LessonPlan $lessonPlan) {
                return $lessonPlan->status;
            })
            ->filterColumn('student', function ($query, $keyword) use ($studentExpression) {
                $query->whereRaw("$studentExpression LIKE ?", ["%{$keyword}%"]);
            })
            ->filterColumn('weekday_name', function ($query, $keyword) use ($weekdayExpression) {
                $query->whereRaw("$weekdayExpression LIKE ?", ["%{$keyword}%"]);
            })
            ->filterColumn('recurrence', function ($query, $keyword) use ($recurrenceExpression) {
                $query->whereRaw("$recurrenceExpression LIKE ?", ["%{$keyword}%"]);
            })
            ->filterColumn('location', function ($query, $keyword) {
                $query->where('locations.name', 'LIKE', "%{$keyword}%");
            })
            ->filterColumn('duration_minutes', function ($query, $keyword) use ($durationSearchExpression) {
                $numericKeyword = preg_replace('/[^0-9.]/', '', $keyword);

                $query->where(function ($query) use ($keyword, $numericKeyword, $durationSearchExpression) {
                    $query->whereRaw("$durationSearchExpression LIKE ?", ["%{$keyword}%"]);

                    if ($numericKeyword !== '') {
                        $query->orWhereRaw('CAST(lesson_plans.duration_minutes AS CHAR) LIKE ?', ["%{$numericKeyword}%"]);
                    }
                });
            })
            ->filterColumn('fee_amount', function ($query, $keyword) use ($feeSearchExpression, $feeCastExpression, $feeCentsCastExpression) {
                $numericKeyword = preg_replace('/[^0-9.]/', '', $keyword);

                $query->where(function ($query) use ($keyword, $numericKeyword, $feeSearchExpression, $feeCastExpression, $feeCentsCastExpression) {
                    $query->whereRaw("$feeSearchExpression LIKE ?", ["%{$keyword}%"]);

                    if ($numericKeyword !== '') {
                        $query->orWhereRaw("$feeCastExpression LIKE ?", ["%{$numericKeyword}%"])
                            ->orWhereRaw("$feeCentsCastExpression LIKE ?", ["%{$numericKeyword}%"]);
                    }
                });
            })
            ->orderColumn('student', 'student $1')
            ->orderColumn('weekday_name', 'lesson_plans.weekday $1')
            ->orderColumn('recurrence', 'lesson_plans.recurrence_interval $1')
            ->orderColumn('location', 'location $1')
            ->orderColumn('status_order', false)
            ->toJson();
    }

    public function locations()
    {
        $today = today()->toDateString();

        $locations = Location::query()
            ->with([
                'lessonPlans' => function ($query) use ($today) {
                    $query
                        ->with('student')
                        ->whereNotNull('starts_on')
                        ->whereNotNull('ends_on')
                        ->whereDate('starts_on', '<=', $today)
                        ->whereDate('ends_on', '>=', $today);
                },
            ])
            ->select([
                'id',
                'name',
                'fee_amount',
                'tax_withheld_percentage',
                'is_active',
                'notes',
            ]);

        return DataTables::eloquent($locations)
            ->filterColumn('is_active', function ($query, $keyword) {
                $keyword = strtolower(trim($keyword));

                if ($keyword === 'active') {
                    $query->where('is_active', true);
                }

                if ($keyword === 'inactive') {
                    $query->where('is_active', false);
                }
            })
            ->addColumn('info', function (Location $location) {
                $lessonPlans = $location->lessonPlans;
                $weeklyGrossIncome = $lessonPlans->sum(function ($lessonPlan) {
                    return (int) $lessonPlan->fee_amount / max(1, (int) $lessonPlan->recurrence_interval);
                });
                $weeklyNetIncome = $lessonPlans->sum(function ($lessonPlan) use ($location) {
                    return $location->netAmount((int) $lessonPlan->fee_amount) / max(1, (int) $lessonPlan->recurrence_interval);
                });

                return [
                    'students_count' => $lessonPlans->pluck('student_id')->unique()->count(),
                    'lesson_plans_count' => $lessonPlans->count(),
                    'average_lesson_length' => $lessonPlans->avg('duration_minutes'),
                    'average_lesson_fee' => $lessonPlans->avg('fee_amount'),
                    'weekly_gross_income' => (int) round($weeklyGrossIncome),
                    'weekly_net_income' => (int) round($weeklyNetIncome),
                    'weekly_tax_withheld' => (int) round($weeklyGrossIncome - $weeklyNetIncome),
                    'monthly_gross_projection' => (int) round($weeklyGrossIncome * 52 / 12),
                    'monthly_net_projection' => (int) round($weeklyNetIncome * 52 / 12),
                    'students' => $lessonPlans
                        ->sortBy([
                            ['weekday', 'asc'],
                            ['start_time', 'asc'],
                        ])
                        ->map(function ($lessonPlan) {
                            return [
                                'name' => trim(($lessonPlan->student->first_name ?? '').' '.($lessonPlan->student->last_name ?? '')),
                                'weekday' => ucfirst($lessonPlan->weekdayName ?? ''),
                                'start_time' => $lessonPlan->start_time,
                                'duration_minutes' => (int) $lessonPlan->duration_minutes,
                                'fee_amount' => (int) $lessonPlan->fee_amount,
                                'recurrence' => $lessonPlan->recurrence,
                            ];
                        })
                        ->values(),
                ];
            })
            ->orderColumn('is_active', 'is_active $1')
            ->toJson();
    }

    public function recitals()
    {
        $recitals = Recital::query()
            ->with(['venue', 'students' => function ($query) {
                $query->orderBy('first_name')->orderBy('last_name');
            }])
            ->select(['id', 'name', 'date', 'start_time', 'venue_id']);

        return DataTables::eloquent($recitals)
            ->editColumn('date', function (Recital $recital) {
                return $recital->date ? $recital->date->toDateString() : null;
            })
            ->addColumn('venue', function (Recital $recital) {
                return optional($recital->venue)->name;
            })
            ->editColumn('students', function (Recital $recital) {
                return $recital->students->map(function (Student $student) {
                    return [
                        'id' => $student->id,
                        'name' => $student->full_name,
                    ];
                })->values()->all();
            })
            ->addColumn('students_count', fn (Recital $recital) => $recital->students->count())
            ->filterColumn('venue', function ($query, $keyword) {
                $query->whereHas('venue', function ($query) use ($keyword) {
                    $query->where('name', 'like', "%{$keyword}%");
                });
            })
            ->filterColumn('students_count', function () {
                return;
            })
            ->orderColumn('date', 'date $1')
            ->orderColumn('start_time', 'start_time $1')
            ->orderColumn('venue', 'venue_id $1')
            ->orderColumn('students_count', 'date $1')
            ->toJson();
    }

    public function venues()
    {
        $venues = Venue::query()->select([
            'id',
            'name',
            'address',
            'city',
            'state',
            'postal_code',
            'map_url',
        ]);

        return DataTables::eloquent($venues)
            ->toJson();
    }

    public function waitingList()
    {
        $waitingList = WaitingList::query()
            ->select([
                'id',
                'first_name',
                'last_name',
                'parent_name',
                'email',
                'phone',
                'is_adult',
                'notes',
                'created_at',
            ]);

        return DataTables::eloquent($waitingList)
            ->filterColumn('is_adult', function ($query, $keyword) {
                $keyword = strtolower($keyword);

                if (str_contains('adult', $keyword)) {
                    $query->where('is_adult', true);
                }

                if (str_contains('child', $keyword) || str_contains('minor', $keyword)) {
                    $query->where('is_adult', false);
                }
            })
            ->orderColumn('is_adult', 'is_adult $1')
            ->toJson();
    }

    public function breaks(Scheduler $scheduler)
    {
        $breaks = TeachingBreak::query()
            ->with('locations')
            ->select([
                'id',
                'title',
                'reason',
                'starts_on',
                'ends_on',
            ]);

        return DataTables::eloquent($breaks)
            ->editColumn('starts_on', function (TeachingBreak $teachingBreak) {
                return $teachingBreak->starts_on ? $teachingBreak->starts_on->toDateString() : null;
            })
            ->editColumn('ends_on', function (TeachingBreak $teachingBreak) {
                return $teachingBreak->ends_on ? $teachingBreak->ends_on->toDateString() : null;
            })
            ->addColumn('locations', function (TeachingBreak $teachingBreak) {
                return $teachingBreak->locations
                    ->map(fn ($location) => ['id' => $location->id, 'name' => $location->name])
                    ->values();
            })
            ->addColumn('locations_label', function (TeachingBreak $teachingBreak) {
                return $teachingBreak->locations->isEmpty()
                    ? 'All locations'
                    : $teachingBreak->locations->pluck('name')->join(', ');
            })
            ->addColumn('lessons_count', function (TeachingBreak $teachingBreak) use ($scheduler) {
                return $scheduler->breakImpact(
                    $teachingBreak->starts_on,
                    $teachingBreak->ends_on,
                    $teachingBreak->locations->pluck('id')->all()
                )['lessons_count'];
            })
            ->addColumn('fee_amount', function (TeachingBreak $teachingBreak) use ($scheduler) {
                return $scheduler->breakImpact(
                    $teachingBreak->starts_on,
                    $teachingBreak->ends_on,
                    $teachingBreak->locations->pluck('id')->all()
                )['fee_amount'];
            })
            ->filterColumn('starts_on', function ($query, $keyword) {
                $query->whereDate('starts_on', 'like', "%{$keyword}%");
            })
            ->filterColumn('ends_on', function ($query, $keyword) {
                $query->whereDate('ends_on', 'like', "%{$keyword}%");
            })
            ->filterColumn('locations_label', function ($query, $keyword) {
                $query->where(function ($query) use ($keyword) {
                    if (str_contains(strtolower('All locations'), strtolower($keyword))) {
                        $query->whereDoesntHave('locations');
                    }

                    $query->orWhereHas('locations', function ($query) use ($keyword) {
                        $query->where('name', 'like', "%{$keyword}%");
                    });
                });
            })
            ->filterColumn('lessons_count', function () {
                return;
            })
            ->filterColumn('fee_amount', function () {
                return;
            })
            ->orderColumn('starts_on', 'starts_on $1')
            ->orderColumn('ends_on', 'ends_on $1')
            ->orderColumn('locations_label', 'starts_on $1')
            ->orderColumn('lessons_count', 'starts_on $1')
            ->orderColumn('fee_amount', 'starts_on $1')
            ->toJson();
    }

    public function lessons()
    {
        return $this->lessonRows();
    }

    private function lessonRows()
    {
        $driver = DB::connection()->getDriverName();
        $dateExpression = $driver === 'sqlite'
            ? "COALESCE(lessons.scheduled_date, date(lessons.starts_at))"
            : "COALESCE(lessons.scheduled_date, DATE(lessons.starts_at))";
        $timeExpression = $driver === 'sqlite'
            ? "strftime('%H:%M', lessons.starts_at)"
            : "DATE_FORMAT(lessons.starts_at, '%H:%i')";
        $durationExpression = $driver === 'sqlite'
            ? "CAST((julianday(lessons.ends_at) - julianday(lessons.starts_at)) * 24 * 60 AS INTEGER)"
            : "TIMESTAMPDIFF(MINUTE, lessons.starts_at, lessons.ends_at)";
        $weekdayExpression = "CASE ".($driver === 'sqlite' ? "CAST(strftime('%w', lessons.starts_at) AS INTEGER) + 1" : 'DAYOFWEEK(lessons.starts_at)')."
            WHEN 1 THEN 'sunday'
            WHEN 2 THEN 'monday'
            WHEN 3 THEN 'tuesday'
            WHEN 4 THEN 'wednesday'
            WHEN 5 THEN 'thursday'
            WHEN 6 THEN 'friday'
            WHEN 7 THEN 'saturday'
        END";
        $weekdayOrderExpression = $driver === 'sqlite'
            ? "CAST(strftime('%w', lessons.starts_at) AS INTEGER) + 1"
            : 'DAYOFWEEK(lessons.starts_at)';
        $studentExpression = $driver === 'sqlite'
            ? "students.first_name || ' ' || COALESCE(students.last_name, '')"
            : "CONCAT(students.first_name, ' ', COALESCE(students.last_name, ''))";
        $lessonTypeExpression = "CASE WHEN lessons.lesson_plan_id IS NULL THEN 'Single' ELSE 'Recurring' END";

        $lessons = Lesson::query()
            ->join('students', 'students.id', '=', 'lessons.student_id')
            ->when(request('student_id'), function ($query, $studentId) {
                $query->where('lessons.student_id', $studentId);
            })
            ->when(request('scheduled_from'), function ($query, $date) use ($dateExpression) {
                $query->whereRaw("$dateExpression >= ?", [$date]);
            })
            ->when(request('scheduled_to'), function ($query, $date) use ($dateExpression) {
                $query->whereRaw("$dateExpression <= ?", [$date]);
            })
            ->select([
                'lessons.id',
                'lessons.lesson_plan_id',
                'lessons.starts_at',
                'lessons.ends_at',
                'lessons.fee_amount',
                'lessons.paid_at',
                'lessons.canceled_at',
                'lessons.canceled_by',
                DB::raw("$studentExpression as student"),
                DB::raw("$dateExpression as scheduled_date"),
                DB::raw("$timeExpression as start_time"),
                DB::raw("$durationExpression as duration_minutes"),
                DB::raw("$weekdayExpression as weekday"),
                DB::raw("$weekdayOrderExpression as weekday_order"),
                DB::raw("$lessonTypeExpression as lesson_type"),
            ]);

        return DataTables::eloquent($lessons)
            ->editColumn('scheduled_date', function (Lesson $lesson) {
                return $lesson->scheduled_date
                    ? $lesson->scheduled_date->toDateString()
                    : null;
            })
            ->addColumn('status', function (Lesson $lesson) {
                return $lesson->canceled_at ? 'Canceled' : 'Confirmed';
            })
            ->editColumn('canceled_at', function (Lesson $lesson) {
                return $lesson->canceled_at?->toIso8601String();
            })
            ->filterColumn('student', function ($query, $keyword) use ($studentExpression) {
                $query->whereRaw("$studentExpression LIKE ?", ["%{$keyword}%"]);
            })
            ->filterColumn('lesson_type', function ($query, $keyword) use ($lessonTypeExpression) {
                $query->whereRaw("$lessonTypeExpression LIKE ?", ["%{$keyword}%"]);
            })
            ->filterColumn('scheduled_date', function ($query, $keyword) use ($dateExpression, $driver) {
                $formattedDate = $driver === 'sqlite'
                    ? "strftime('%m/%d/%Y', $dateExpression)"
                    : "DATE_FORMAT($dateExpression, '%m/%d/%Y')";

                $query->where(function ($query) use ($keyword, $dateExpression, $formattedDate) {
                    $query
                        ->whereRaw("$dateExpression LIKE ?", ["%{$keyword}%"])
                        ->orWhereRaw("$formattedDate LIKE ?", ["%{$keyword}%"]);
                });
            })
            ->filterColumn('weekday', function ($query, $keyword) use ($weekdayExpression) {
                $query->whereRaw("$weekdayExpression LIKE ?", ["%{$keyword}%"]);
            })
            ->filterColumn('start_time', function ($query, $keyword) use ($timeExpression) {
                $query->whereRaw("$timeExpression LIKE ?", ["%{$keyword}%"]);
            })
            ->filterColumn('duration_minutes', function ($query, $keyword) use ($durationExpression) {
                $numericKeyword = preg_replace('/[^0-9.]/', '', $keyword);

                $query->where(function ($query) use ($keyword, $numericKeyword, $durationExpression) {
                    $query->whereRaw("CONCAT($durationExpression, ' min') LIKE ?", ["%{$keyword}%"]);

                    if ($numericKeyword !== '') {
                        $query->orWhereRaw("CAST($durationExpression AS CHAR) LIKE ?", ["%{$numericKeyword}%"]);
                    }
                });
            })
            ->filterColumn('fee_amount', function ($query, $keyword) {
                $numericKeyword = preg_replace('/[^0-9.]/', '', $keyword);

                $query->where(function ($query) use ($keyword, $numericKeyword) {
                    $query->whereRaw("CONCAT('$', CAST(lessons.fee_amount / 100 AS CHAR)) LIKE ?", ["%{$keyword}%"]);

                    if ($numericKeyword !== '') {
                        $query->orWhereRaw('CAST(lessons.fee_amount / 100 AS CHAR) LIKE ?', ["%{$numericKeyword}%"])
                            ->orWhereRaw('CAST(lessons.fee_amount AS CHAR) LIKE ?', ["%{$numericKeyword}%"]);
                    }
                });
            })
            ->filterColumn('status', function ($query, $keyword) {
                $keyword = strtolower($keyword);

                $query->where(function ($query) use ($keyword) {
                    if (str_contains('confirmed', $keyword)) {
                        $query->orWhereNull('lessons.canceled_at');
                    }

                    if (str_contains('canceled', $keyword) || str_contains('cancelled', $keyword)) {
                        $query->orWhereNotNull('lessons.canceled_at');
                    }
                });
            })
            ->orderColumn('student', 'student $1')
            ->orderColumn('lesson_type', 'lesson_plan_id $1')
            ->orderColumn('scheduled_date', "$dateExpression $1")
            ->orderColumn('weekday', 'weekday_order $1')
            ->orderColumn('start_time', "$timeExpression $1")
            ->orderColumn('duration_minutes', 'duration_minutes $1')
            ->orderColumn('fee_amount', 'fee_amount $1')
            ->orderColumn('status', 'canceled_at $1')
            ->orderColumn('canceled_at', 'canceled_at $1')
            ->toJson();
    }

    public function students()
    {
        $driver = DB::connection()->getDriverName();

        $students = Student::query()
            ->with('lessonPlans')
            ->leftJoin('locations', 'locations.id', '=', 'students.location_id')
            ->select([
                'students.id',
                'students.first_name',
                'students.last_name',
                'students.gender',
                'students.parent_name',
                'students.email',
                'students.phone',
                'students.is_adult',
                'students.date_of_birth',
                'locations.name as location',
            ]);

        return DataTables::eloquent($students)
            ->editColumn('date_of_birth', function (Student $student) {
                return $student->date_of_birth
                    ? carbon($student->date_of_birth)->format('m/d/Y')
                    : '';
            })
            ->addColumn('age', function (Student $student) {
                return $student->age;
            })
            ->addColumn('has_current_lesson_plan', function (Student $student) {
                return (bool) $student->currentLessonPlan();
            })
            ->filterColumn('age', function ($query, $keyword) use ($driver) {
                $numericKeyword = preg_replace('/[^0-9]/', '', $keyword);

                if ($numericKeyword === '') {
                    return;
                }

                if ($driver === 'sqlite') {
                    $query->whereRaw(
                        "CAST(strftime('%Y', 'now') - strftime('%Y', students.date_of_birth) - (strftime('%m-%d', 'now') < strftime('%m-%d', students.date_of_birth)) AS TEXT) LIKE ?",
                        ["%{$numericKeyword}%"]
                    );

                    return;
                }

                $query->whereRaw('CAST(TIMESTAMPDIFF(YEAR, students.date_of_birth, CURDATE()) AS CHAR) LIKE ?', ["%{$numericKeyword}%"]);
            })
            ->filterColumn('location', function ($query, $keyword) {
                $query->whereRaw('locations.name LIKE ?', ["%{$keyword}%"]);
            })
            ->filterColumn('is_adult', function ($query, $keyword) {
                $keyword = strtolower(trim($keyword));

                if ($keyword === '') {
                    return;
                }

                if (str_contains('adult', $keyword)) {
                    $query->where('students.is_adult', true);
                }

                if (str_contains('child', $keyword) || str_contains('minor', $keyword)) {
                    $query->where('students.is_adult', false);
                }
            })
            ->orderColumn('first_name', 'students.first_name $1, students.id $1')
            ->orderColumn('last_name', 'students.last_name $1, students.id $1')
            ->orderColumn('gender', 'students.gender $1, students.id $1')
            ->orderColumn('age', function ($query, $order) use ($driver) {
                if ($driver === 'sqlite') {
                    $query->orderByRaw("CAST(strftime('%Y', 'now') - strftime('%Y', students.date_of_birth) - (strftime('%m-%d', 'now') < strftime('%m-%d', students.date_of_birth)) AS INTEGER) {$order}");
                    $query->orderBy('students.id', $order);

                    return;
                }

                $query->orderByRaw("TIMESTAMPDIFF(YEAR, students.date_of_birth, CURDATE()) {$order}");
                $query->orderBy('students.id', $order);
            })
            ->orderColumn('location', 'location $1, students.id $1')
            ->orderColumn('is_adult', 'students.is_adult $1, students.id $1')
            ->toJson();
    }
}
