<?php

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use App\Calendar\Scheduler;
use App\Models\{Lesson, Student, TeachingBreak};
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class TablesController extends Controller
{
    public function breaks(Scheduler $scheduler)
    {
        $breaks = TeachingBreak::query()
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
            ->addColumn('lessons_count', function (TeachingBreak $teachingBreak) use ($scheduler) {
                return $scheduler->breakImpact($teachingBreak->starts_on, $teachingBreak->ends_on)['lessons_count'];
            })
            ->addColumn('fee_amount', function (TeachingBreak $teachingBreak) use ($scheduler) {
                return $scheduler->breakImpact($teachingBreak->starts_on, $teachingBreak->ends_on)['fee_amount'];
            })
            ->filterColumn('starts_on', function ($query, $keyword) {
                $query->whereDate('starts_on', 'like', "%{$keyword}%");
            })
            ->filterColumn('ends_on', function ($query, $keyword) {
                $query->whereDate('ends_on', 'like', "%{$keyword}%");
            })
            ->filterColumn('lessons_count', function () {
                return;
            })
            ->filterColumn('fee_amount', function () {
                return;
            })
            ->orderColumn('starts_on', 'starts_on $1')
            ->orderColumn('ends_on', 'ends_on $1')
            ->orderColumn('lessons_count', 'starts_on $1')
            ->orderColumn('fee_amount', 'starts_on $1')
            ->toJson();
    }

    public function payments()
    {
        $driver = DB::connection()->getDriverName();
        $lessonDateExpression = $driver === 'sqlite'
            ? "COALESCE(lessons.scheduled_date, date(lessons.starts_at))"
            : "COALESCE(lessons.scheduled_date, DATE(lessons.starts_at))";
        $paidDateExpression = $driver === 'sqlite'
            ? "date(lessons.paid_at)"
            : "DATE(lessons.paid_at)";
        $studentExpression = $driver === 'sqlite'
            ? "students.first_name || ' ' || COALESCE(students.last_name, '')"
            : "CONCAT(students.first_name, ' ', COALESCE(students.last_name, ''))";

        $payments = Lesson::query()
            ->join('students', 'students.id', '=', 'lessons.student_id')
            ->whereNotNull('lessons.paid_at')
            ->when(request('paid_from'), function ($query, $date) {
                $query->whereDate('lessons.paid_at', '>=', $date);
            })
            ->when(request('paid_to'), function ($query, $date) {
                $query->whereDate('lessons.paid_at', '<=', $date);
            })
            ->select([
                'lessons.id',
                'lessons.fee_amount',
                'lessons.payment_method',
                'lessons.paid_at',
                DB::raw("$studentExpression as student"),
                DB::raw("$paidDateExpression as paid_on"),
                DB::raw("$lessonDateExpression as lesson_date"),
            ]);

        return DataTables::eloquent($payments)
            ->editColumn('paid_on', function (Lesson $lesson) {
                return $lesson->paid_on
                    ? carbon($lesson->paid_on)->toDateString()
                    : null;
            })
            ->editColumn('lesson_date', function (Lesson $lesson) {
                return $lesson->lesson_date
                    ? carbon($lesson->lesson_date)->toDateString()
                    : null;
            })
            ->filterColumn('student', function ($query, $keyword) use ($studentExpression) {
                $query->whereRaw("$studentExpression LIKE ?", ["%{$keyword}%"]);
            })
            ->filterColumn('paid_on', function ($query, $keyword) use ($paidDateExpression, $driver) {
                $formattedDate = $driver === 'sqlite'
                    ? "strftime('%m/%d/%Y', $paidDateExpression)"
                    : "DATE_FORMAT($paidDateExpression, '%m/%d/%Y')";

                $query->where(function ($query) use ($keyword, $paidDateExpression, $formattedDate) {
                    $query
                        ->whereRaw("$paidDateExpression LIKE ?", ["%{$keyword}%"])
                        ->orWhereRaw("$formattedDate LIKE ?", ["%{$keyword}%"]);
                });
            })
            ->filterColumn('lesson_date', function ($query, $keyword) use ($lessonDateExpression, $driver) {
                $formattedDate = $driver === 'sqlite'
                    ? "strftime('%m/%d/%Y', $lessonDateExpression)"
                    : "DATE_FORMAT($lessonDateExpression, '%m/%d/%Y')";

                $query->where(function ($query) use ($keyword, $lessonDateExpression, $formattedDate) {
                    $query
                        ->whereRaw("$lessonDateExpression LIKE ?", ["%{$keyword}%"])
                        ->orWhereRaw("$formattedDate LIKE ?", ["%{$keyword}%"]);
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
            ->orderColumn('student', 'student $1')
            ->orderColumn('paid_on', 'lessons.paid_at $1')
            ->orderColumn('lesson_date', "$lessonDateExpression $1")
            ->orderColumn('fee_amount', 'fee_amount $1')
            ->orderColumn('payment_method', 'payment_method $1')
            ->toJson();
    }

    public function lessons()
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

        $lessons = Lesson::query()
            ->join('students', 'students.id', '=', 'lessons.student_id')
            ->when(request('student_id'), function ($query, $studentId) {
                $query->where('lessons.student_id', $studentId);
            })
            ->select([
                'lessons.id',
                'lessons.starts_at',
                'lessons.ends_at',
                'lessons.fee_amount',
                'lessons.paid_at',
                DB::raw("$studentExpression as student"),
                DB::raw("$dateExpression as scheduled_date"),
                DB::raw("$timeExpression as start_time"),
                DB::raw("$durationExpression as duration_minutes"),
                DB::raw("$weekdayExpression as weekday"),
                DB::raw("$weekdayOrderExpression as weekday_order"),
            ]);

        return DataTables::eloquent($lessons)
            ->editColumn('scheduled_date', function (Lesson $lesson) {
                return $lesson->scheduled_date
                    ? $lesson->scheduled_date->toDateString()
                    : null;
            })
            ->addColumn('payment', function (Lesson $lesson) {
                return $lesson->paid_at
                    ? $lesson->paid_at->toFormattedDateString()
                    : 'Unpaid';
            })
            ->addColumn('payment_class', function (Lesson $lesson) {
                return $lesson->paid_at ? 'text-green' : 'text-red';
            })
            ->filterColumn('student', function ($query, $keyword) use ($studentExpression) {
                $query->whereRaw("$studentExpression LIKE ?", ["%{$keyword}%"]);
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
            ->filterColumn('payment', function ($query, $keyword) use ($driver) {
                $keyword = strtolower($keyword);

                $query->where(function ($query) use ($keyword, $driver) {
                    if ($keyword !== 'paid' && str_contains('unpaid', $keyword)) {
                        $query->orWhereNull('lessons.paid_at');
                    }

                    if (str_contains('paid', $keyword)) {
                        $query->orWhereNotNull('lessons.paid_at');
                    }

                    if ($keyword !== '') {
                        $formattedDate = $driver === 'sqlite'
                            ? "strftime('%m/%d/%Y', lessons.paid_at)"
                            : "DATE_FORMAT(lessons.paid_at, '%m/%d/%Y')";

                        $query->orWhereRaw("$formattedDate LIKE ?", ["%{$keyword}%"]);
                    }
                });
            })
            ->orderColumn('student', 'student $1')
            ->orderColumn('scheduled_date', "$dateExpression $1")
            ->orderColumn('weekday', 'weekday_order $1')
            ->orderColumn('start_time', "$timeExpression $1")
            ->orderColumn('duration_minutes', 'duration_minutes $1')
            ->orderColumn('fee_amount', 'fee_amount $1')
            ->orderColumn('payment', 'paid_at $1')
            ->toJson();
    }

    public function students()
    {
        $driver = DB::connection()->getDriverName();
        $weekdayExpression = "CASE current_lesson_plan.weekday
            WHEN 1 THEN 'sunday'
            WHEN 2 THEN 'monday'
            WHEN 3 THEN 'tuesday'
            WHEN 4 THEN 'wednesday'
            WHEN 5 THEN 'thursday'
            WHEN 6 THEN 'friday'
            WHEN 7 THEN 'saturday'
        END";

        $currentLessonPlans = DB::table('lesson_plans')
            ->select('student_id', DB::raw('MAX(id) as lesson_plan_id'))
            ->groupBy('student_id');

        $students = Student::query()
            ->leftJoinSub($currentLessonPlans, 'current_lesson_plans', function ($join) {
                $join->on('students.id', '=', 'current_lesson_plans.student_id');
            })
            ->leftJoin('lesson_plans as current_lesson_plan', 'current_lesson_plan.id', '=', 'current_lesson_plans.lesson_plan_id')
            ->select([
                'students.id',
                'students.first_name',
                'students.last_name',
                'students.parent_name',
                'students.email',
                'students.phone',
                'students.date_of_birth',
                DB::raw("$weekdayExpression as weekday"),
                'current_lesson_plan.duration_minutes as duration_minutes',
                'current_lesson_plan.fee_amount as fee_amount',
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
            ->filterColumn('weekday', function ($query, $keyword) use ($weekdayExpression) {
                $query->whereRaw("$weekdayExpression LIKE ?", ["%{$keyword}%"]);
            })
            ->filterColumn('duration_minutes', function ($query, $keyword) {
                $numericKeyword = preg_replace('/[^0-9.]/', '', $keyword);

                $query->where(function ($query) use ($keyword, $numericKeyword) {
                    $query->whereRaw("CONCAT(COALESCE(current_lesson_plan.duration_minutes, ''), ' min') LIKE ?", ["%{$keyword}%"]);

                    if ($numericKeyword !== '') {
                        $query->orWhereRaw('CAST(current_lesson_plan.duration_minutes AS CHAR) LIKE ?', ["%{$numericKeyword}%"]);
                    }
                });
            })
            ->filterColumn('fee_amount', function ($query, $keyword) {
                $numericKeyword = preg_replace('/[^0-9.]/', '', $keyword);

                $query->where(function ($query) use ($keyword, $numericKeyword) {
                    $query->whereRaw("CONCAT('$', CAST(current_lesson_plan.fee_amount / 100 AS CHAR)) LIKE ?", ["%{$keyword}%"]);

                    if ($numericKeyword !== '') {
                        $query->orWhereRaw('CAST(current_lesson_plan.fee_amount / 100 AS CHAR) LIKE ?', ["%{$numericKeyword}%"])
                            ->orWhereRaw('CAST(current_lesson_plan.fee_amount AS CHAR) LIKE ?', ["%{$numericKeyword}%"]);
                    }
                });
            })
            ->orderColumn('age', function ($query, $order) use ($driver) {
                if ($driver === 'sqlite') {
                    $query->orderByRaw("CAST(strftime('%Y', 'now') - strftime('%Y', students.date_of_birth) - (strftime('%m-%d', 'now') < strftime('%m-%d', students.date_of_birth)) AS INTEGER) {$order}");

                    return;
                }

                $query->orderByRaw("TIMESTAMPDIFF(YEAR, students.date_of_birth, CURDATE()) {$order}");
            })
            ->orderColumn('weekday', function ($query, $order) {
                $query->orderByRaw("current_lesson_plan.weekday IS NULL, current_lesson_plan.weekday {$order}");
            })
            ->orderColumn('duration_minutes', 'duration_minutes $1')
            ->orderColumn('fee_amount', 'fee_amount $1')
            ->toJson();
    }
}
