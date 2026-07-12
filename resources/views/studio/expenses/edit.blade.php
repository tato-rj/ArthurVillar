@modal(['title' => 'Edit expense', 'id' => 'edit-expense-'.$expense->id.'-modal'])
<form method="POST" action="{{route('studio.expenses.update', $expense)}}">
	@method('PATCH')
	@csrf

	@input(['label' => 'Name', 'name' => 'name', 'required' => true, 'value' => $expense->name])

	@input([
		'label' => 'Amount',
		'name' => 'amount',
		'value' => $expense->amountForInput(),
		'mask' => 'usd',
		'required' => true
	])

	@select(['label' => 'Repeats?', 'name' => 'recurrence'])
		<option value="" {{iftrue(! $expense->recurrence, 'selected')}}>One-time</option>
		<option value="weekly" {{iftrue($expense->recurrence === 'weekly', 'selected')}}>Weekly</option>
		<option value="monthly" {{iftrue($expense->recurrence === 'monthly', 'selected')}}>Monthly</option>
	@endselect

	@input([
		'label' => 'Date',
		'name' => 'spent_on',
		'type' => 'date',
		'value' => optional($expense->spent_on)->toDateString(),
		'info' => 'Use this only for one-time expenses.'
	])

	@textarea(['label' => 'Notes', 'name' => 'notes', 'value' => $expense->notes, 'rows' => 4])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
