<?php

namespace App\Http\Controllers\Studio;

use Carbon\Carbon;
use App\Models\{Expense, Lesson};
use App\Calendar\Scheduler;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;

class ExpensesController extends Controller
{
    public function index()
    {
        return view('studio.expenses.index');
    }

    public function report(Scheduler $scheduler)
    {
        [$startsFrom, $startsTo] = $this->reportMonthRange(request());
        $monthCount = $startsFrom->diffInMonths($startsTo);
        $months = collect(range(0, $monthCount))->map(function ($offset) use ($scheduler, $startsFrom) {
            $start = $startsFrom->copy()->addMonths($offset);
            $end = $start->copy()->endOfMonth();
            $range = [
                'start' => $start->toDateString(),
                'end' => $end->toDateString(),
            ];
            $expectedIncome = $this->expectedIncome($scheduler, $range);
            $confirmedIncome = $this->confirmedIncome($start, $end);
            $expenses = $this->expensesForMonth($start, $end);
            $isFinished = $end->lt(today()->startOfDay());

            return [
                'month' => $start->format('F Y'),
                'expenses' => $expenses,
                'expected_income' => $expectedIncome,
                'confirmed_income' => $confirmedIncome,
                'expected_net' => $expectedIncome - $expenses,
                'confirmed_net' => $isFinished ? $confirmedIncome - $expenses : null,
            ];
        });

        return view('studio.expenses.report', compact('months', 'startsFrom', 'startsTo'));
    }

    public function store(Request $request)
    {
        Expense::create($this->expenseAttributes($this->validatedExpense($request)));

        return back()->with('success', 'The expense was successfully added');
    }

    public function edit(Expense $expense)
    {
        return view('studio.expenses.edit', compact('expense'));
    }

    public function update(Request $request, Expense $expense)
    {
        $expense->update($this->expenseAttributes($this->validatedExpense($request)));

        return back()->with('success', 'The expense was successfully updated');
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();

        return back()->with('success', 'The expense was successfully deleted');
    }

    private function validatedExpense(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'string'],
            'recurrence' => ['nullable', Rule::in(array_keys(Expense::RECURRENCES))],
            'starts_on' => ['nullable', 'date_format:Y-m', 'required_without:recurrence'],
            'ends_on' => ['nullable', 'date_format:Y-m'],
            'notes' => ['nullable', 'string'],
        ]);

        if (! empty($data['starts_on']) && ! empty($data['ends_on']) && $data['ends_on'] < $data['starts_on']) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'ends_on' => 'The ends on month must be after or equal to the starts on month.',
            ]);
        }

        return $data;
    }

    private function expenseAttributes(array $data)
    {
        return [
            'name' => $data['name'],
            'amount' => $this->amount($data['amount']),
            'recurrence' => $data['recurrence'] ?? null,
            'starts_on' => $this->monthStart($data['starts_on'] ?? null),
            'ends_on' => $this->monthEnd($data['ends_on'] ?? null),
            'notes' => $data['notes'] ?? null,
        ];
    }

    private function amount($value)
    {
        $value = preg_replace('/[^0-9]/', '', (string) $value);

        return $value === '' ? null : ((int) $value) * 100;
    }

    private function monthStart($value)
    {
        return $value
            ? Carbon::createFromFormat('Y-m', $value)->startOfMonth()->toDateString()
            : null;
    }

    private function monthEnd($value)
    {
        return $value
            ? Carbon::createFromFormat('Y-m', $value)->endOfMonth()->toDateString()
            : null;
    }

    private function expectedIncome(Scheduler $scheduler, array $range)
    {
        $lessonPlans = $scheduler->plannedLessons($range);
        $singleLessonPlans = $scheduler->singleLessonPlans($range);

        return $lessonPlans
            ->concat($singleLessonPlans)
            ->sum(function ($plan) {
                return collect($plan['occurrences'] ?? [])->sum(function ($occurrence) {
                    if (($occurrence['lesson_status'] ?? '') === 'canceled' || ($occurrence['calendar_status'] ?? '') === 'canceled') {
                        return 0;
                    }

                    return (int) ($occurrence['fee_amount'] ?? 0);
                });
            });
    }

    private function confirmedIncome(Carbon $start, Carbon $end)
    {
        return (int) Lesson::query()
            ->whereNull('canceled_at')
            ->whereNotNull('paid_at')
            ->whereDate('starts_at', '>=', $start->toDateString())
            ->whereDate('starts_at', '<=', $end->toDateString())
            ->sum('fee_amount');
    }

    private function expensesForMonth(Carbon $start, Carbon $end)
    {
        $oneTime = Expense::query()
            ->whereNull('recurrence')
            ->whereDate('starts_on', '>=', $start->toDateString())
            ->whereDate('starts_on', '<=', $end->toDateString())
            ->sum('amount');
        $monthly = Expense::query()
            ->where('recurrence', 'monthly')
            ->activeDuring($start, $end)
            ->sum('amount');
        $weeklyAverage = Expense::query()
            ->where('recurrence', 'weekly')
            ->activeDuring($start, $end)
            ->sum('amount') * 52 / 12;

        return (int) round($oneTime + $monthly + $weeklyAverage);
    }

    private function reportMonthRange(Request $request)
    {
        $startsFrom = $this->parseReportMonth($request->query('starts_from'))
            ?: today()->copy()->startOfMonth();
        $startsTo = $this->parseReportMonth($request->query('starts_to'))
            ?: $startsFrom->copy()->addMonths(6);

        if ($startsTo->lt($startsFrom)) {
            $startsTo = $startsFrom->copy();
        }

        return [$startsFrom, $startsTo];
    }

    private function parseReportMonth($value)
    {
        if (! preg_match('/^\d{4}-\d{2}$/', (string) $value)) {
            return null;
        }

        return Carbon::createFromFormat('Y-m', $value)->startOfMonth();
    }
}
