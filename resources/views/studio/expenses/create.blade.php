@modal(['title' => 'New expense', 'id' => 'create-expense-modal'])
<form method="POST" action="{{route('studio.expenses.store')}}">
	@csrf

	@input(['placeholder' => 'Name', 'name' => 'name', 'required' => true, 'value' => old('name')])

	@input([
		'placeholder' => 'Amount',
		'name' => 'amount',
		'value' => old('amount'),
		'mask' => 'usd',
		'required' => true
	])

	@select(['label' => 'Repeats?', 'name' => 'recurrence'])
		<option value="" {{iftrue(! old('recurrence'), 'selected')}}>One-time</option>
		<option value="weekly" {{iftrue(old('recurrence') === 'weekly', 'selected')}}>Weekly</option>
		<option value="monthly" {{iftrue(old('recurrence') === 'monthly', 'selected')}}>Monthly</option>
	@endselect

	@input([
		'placeholder' => 'Date',
		'name' => 'spent_on',
		'type' => 'date',
		'value' => old('spent_on'),
		'info' => 'Use this only for one-time expenses.'
	])

	@textarea(['label' => 'Notes', 'name' => 'notes', 'value' => old('notes'), 'rows' => 4])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
