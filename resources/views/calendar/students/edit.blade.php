@extends('layouts.app', ['title' => 'Edit '.$student->full_name])

@section('content')
<section class="container py-5">
    {{ Breadcrumbs::render('calendar.students.edit', $student) }}

    <div class="row mb-4">
        @pagetitle([
            'label' => 'Edit student'
        ])
    </div>

    <div class="row">
        <div class="col-lg-6 col-md-8 col-10 mx-auto">
            <form method="POST" action="{{route('calendar.students.update', $student)}}">
                @method('PATCH')
                @csrf

                <div class="row">
                    @input([
                        'label' => 'First name',
                        'name' => 'first_name',
                        'required' => true,
                        'value' => old('first_name', $student->first_name),
                        'grid' => 'col'
                    ])
                    @input([
                        'label' => 'Last name',
                        'name' => 'last_name',
                        'required' => true,
                        'value' => old('last_name', $student->last_name),
                        'grid' => 'col'
                    ])
                </div>

                @select(['label' => 'Gender', 'name' => 'gender', 'required' => true])
                    @foreach(['female' => 'Female', 'male' => 'Male'] as $value => $genderLabel)
                        @option([
                            'name' => 'gender',
                            'label' => $genderLabel,
                            'value' => $value,
                            'selected' => old('gender', $student->gender) === $value
                        ])
                    @endforeach
                @endselect

                @input([
                    'label' => 'Parent name',
                    'name' => 'parent_name',
                    'value' => old('parent_name', $student->parent_name)
                ])

                @input([
                    'label' => 'Email',
                    'name' => 'email',
                    'value' => old('email', $student->email),
                    'required' => true
                ])

                @select(['label' => 'Default location', 'placeholder' => '', 'name' => 'location_id'])
                    @foreach($locations as $location)
                        @option([
                            'name' => 'location_id',
                            'label' => $location->name,
                            'value' => $location->id,
                            'selected' => old('location_id', $student->location_id) == $location->id
                        ])
                    @endforeach
                @endselect

                @select(['label' => 'Default payment method', 'placeholder' => '', 'name' => 'payment_method'])
                    @foreach(payment()->methods() as $method)
                        @option([
                            'name' => 'payment_method',
                            'label' => $method,
                            'value' => $method,
                            'selected' => old('payment_method', $student->payment_method) == $method
                        ])
                    @endforeach
                @endselect

                <div class="row">
                    @input([
                        'label' => 'Phone',
                        'name' => 'phone',
                        'value' => old('phone', $student->phone),
                        'mask' => 'phone',
                        'grid' => 'col'
                    ])
                    @input([
                        'label' => 'Date of birth',
                        'name' => 'date_of_birth',
                        'value' => old('date_of_birth', optional($student->date_of_birth)->format('m/d/Y')),
                        'mask' => 'date',
                        'grid' => 'col'
                    ])
                </div>

                <div class="form-group text-left">
                    @label(['label' => 'Notes'])
                    <textarea class="form-control rounded no-resize" name="notes" rows="5">{{old('notes', $student->notes)}}</textarea>
                    @feedback(['input' => 'notes'])
                </div>

                <div class="form-check mb-4">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        value="1"
                        name="is_adult"
                        id="is_adult_{{$student->id}}"
                        {{iftrue(old('is_adult', $student->is_adult), 'checked')}}>
                    <label class="form-check-label" for="is_adult_{{$student->id}}">
                        Adult student?
                    </label>
                </div>

                @submit(['label' => 'Submit', 'theme' => 'primary'])
            </form>
        </div>
    </div>
</section>
@endsection
