@modal(['title' => 'New student', 'id' => 'create-student-modal'])
<form method="POST" action="{{route('calendar.students.store')}}">
	@csrf
	<input type="hidden" name="waiting_list_id" value="{{old('waiting_list_id')}}">
	<input type="hidden" name="notes" value="{{old('notes')}}">

	<div class="form-group text-left">
		<label class="small fw-bold opacity-6 mb-2" for="student-sibling-search">Sibling of</label>
		<div class="calendar-student-combobox" data-sibling-combobox>
			<div class="form-control d-flex align-items-center calendar-student-combobox-control">
				<input
					id="student-sibling-search"
					class="border-0 w-100 h-100"
					type="text"
					autocomplete="off"
					placeholder="Select a student"
					data-sibling-combobox-input>

				<input type="hidden" data-sibling-combobox-value>

				@fa(['icon' => 'angle-down', 'mr' => 0, 'fa_color' => 'grey'])
			</div>

			<div class="calendar-student-combobox-menu">
				@foreach($students ?? [] as $sibling)
					@php($siblingName = trim($sibling->first_name . ' ' . $sibling->last_name))
					<button
						type="button"
						class="calendar-student-combobox-option"
						data-sibling-combobox-option
						data-sibling-id="{{$sibling->id}}"
						data-sibling-name="{{$siblingName}}"
						data-sibling-last-name="{{$sibling->last_name}}"
						data-sibling-parent-name="{{$sibling->parent_name}}"
						data-sibling-email="{{$sibling->email}}"
						data-sibling-location-id="{{$sibling->location_id}}"
						data-sibling-payment-method="{{$sibling->payment_method}}"
						data-sibling-phone="{{$sibling->phone}}">
						{{$siblingName}}
					</button>
				@endforeach

				<div class="calendar-student-combobox-empty" data-sibling-combobox-empty>No students found</div>
			</div>
		</div>
	</div>

	<hr>

	<div class="row"> 
		@input(['placeholder' => 'First name', 'name' => 'first_name', 'required' => true, 'value' => old('first_name'), 'grid' => 'col'])
		@input(['placeholder' => 'Last name', 'name' => 'last_name', 'required' => true, 'value' => old('last_name'), 'grid' => 'col'])
	</div>

	@select(['placeholder' => 'Gender', 'name' => 'gender', 'required' => true])
		@foreach(['female' => 'Female', 'male' => 'Male'] as $value => $genderLabel)
			@option(['name' => 'gender', 'label' => $genderLabel, 'value' => $value, 'selected' => old('gender') === $value])
		@endforeach
	@endselect

	@input(['placeholder' => 'Parent name', 'name' => 'parent_name', 'value' => old('parent_name')])

	@input(['placeholder' => 'Email', 'name' => 'email', 'value' => old('email'), 'required' => true])

	@select(['placeholder' => 'Default location', 'name' => 'location_id'])
		@foreach($locations ?? [] as $location)
			@option(['name' => 'location_id', 'label' => $location->name, 'value' => $location->id, 'selected' => old('location_id') == $location->id])
		@endforeach
	@endselect

	@select(['placeholder' => 'Default payment method', 'name' => 'payment_method'])
		@foreach(payment()->methods() as $method)
			@option(['name' => 'payment_method', 'label' => $method, 'value' => $method, 'selected' => old('payment_method') == $method])
		@endforeach
	@endselect

	<div class="row"> 
		@input(['placeholder' => 'Phone', 'name' => 'phone', 'value' => old('phone'), 'mask' => 'phone', 'grid' => 'col'])
		@input(['placeholder' => 'Date of birth', 'name' => 'date_of_birth', 'value' => old('date_of_birth'), 'mask' => 'date', 'grid' => 'col'])
	</div>

	<div class="form-group text-left">
		@label(['label' => 'Notes'])
		<textarea class="form-control rounded no-resize" name="notes" rows="5">{{old('notes')}}</textarea>
		@feedback(['input' => 'notes'])
	</div>
	
	<div class="form-check">
	  <input class="form-check-input" type="checkbox" value="1" name="payment_exempt" id="payment_exempt" {{iftrue(old('payment_exempt'), 'checked')}}>
	  <label class="form-check-label" for="payment_exempt">
	    Payment exempt?
	  </label>
	</div>

	<div class="form-check">
	  <input class="form-check-input" type="checkbox" value="1" name="is_adult" id="is_adult" {{iftrue(old('is_adult'), 'checked')}}>
	  <label class="form-check-label" for="is_adult">
	    Adult student?
	  </label>
	</div>

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal

@once
@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const comboboxes = Array.from(document.querySelectorAll('[data-sibling-combobox]'));

    const closeCombobox = function(combobox) {
        combobox.removeAttribute('open');
    };

    const filterOptions = function(combobox) {
        const input = combobox.querySelector('[data-sibling-combobox-input]');
        const options = Array.from(combobox.querySelectorAll('[data-sibling-combobox-option]'));
        const empty = combobox.querySelector('[data-sibling-combobox-empty]');
        const query = String(input ? input.value : '').trim().toLowerCase();
        let visibleCount = 0;

        options.forEach(function(option) {
            const isVisible = !query || String(option.dataset.siblingName || '').toLowerCase().includes(query);

            option.hidden = !isVisible;
            visibleCount += isVisible ? 1 : 0;
        });

        if (empty) {
            empty.hidden = visibleCount > 0;
        }
    };

    const openCombobox = function(combobox) {
        combobox.setAttribute('open', '');
        filterOptions(combobox);
    };

    const populateStudentFormFromSibling = function(option) {
        const form = option.closest('form');

        if (!form) {
            return;
        }

        const values = {
            last_name: option.dataset.siblingLastName || '',
            parent_name: option.dataset.siblingParentName || '',
            email: option.dataset.siblingEmail || '',
            location_id: option.dataset.siblingLocationId || '',
            payment_method: option.dataset.siblingPaymentMethod || '',
            phone: option.dataset.siblingPhone || '',
        };

        Object.keys(values).forEach(function(name) {
            const field = form.querySelector(`[name="${name}"]`);

            if (!field) {
                return;
            }

            field.value = values[name];
            field.dispatchEvent(new Event('input', { bubbles: true }));
            field.dispatchEvent(new Event('change', { bubbles: true }));
        });
    };

    comboboxes.forEach(function(combobox) {
        const input = combobox.querySelector('[data-sibling-combobox-input]');
        const value = combobox.querySelector('[data-sibling-combobox-value]');
        const options = Array.from(combobox.querySelectorAll('[data-sibling-combobox-option]'));

        if (!input || !value) {
            return;
        }

        input.addEventListener('focus', function() {
            openCombobox(combobox);
        });

        input.addEventListener('click', function() {
            openCombobox(combobox);
        });

        input.addEventListener('input', function() {
            value.value = '';
            openCombobox(combobox);
        });

        input.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeCombobox(combobox);
                input.blur();
            }
        });

        options.forEach(function(option) {
            option.addEventListener('click', function() {
                input.value = option.dataset.siblingName || option.textContent.trim();
                value.value = option.dataset.siblingId || '';
                populateStudentFormFromSibling(option);
                closeCombobox(combobox);
            });
        });
    });

    document.addEventListener('click', function(event) {
        comboboxes.forEach(function(combobox) {
            if (!combobox.contains(event.target)) {
                closeCombobox(combobox);
            }
        });
    });
});
</script>
@endpush
@endonce
