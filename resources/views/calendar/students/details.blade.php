@if($student->siblings()->exists())
<div class="mb-3">
    <div class="small opacity-4">@icon('users-round', ['color' => 'grey'])Related to</div>
    @foreach($student->siblings()->get() as $sibling)
    <a class="link-red" href="{{route('calendar.students.show', $sibling)}}">
        <div class="font-weight-bold text-break">{{$sibling->full_name}}</div>
    </a>
    @endforeach
</div>
@endif

@if($student->hasParent())
<div class="mb-3">
    <div class="small opacity-4">@icon('house-heart', ['color' => 'grey'])Parent name</div>
    <div class="font-weight-bold text-break">{{$student->parent_name}}</div>
</div>
@endif

<div class="mb-3">
    <div class="small opacity-4">@icon('mail', ['color' => 'grey'])Email</div>
    <div class="font-weight-bold text-break">{{$student->email}}</div>
</div>

<div class="mb-3">
    <div class="small opacity-4">@icon('phone', ['color' => 'grey'])Phone</div>
    <div class="font-weight-bold">{{$student->phone ?: '—'}}</div>
</div>

<div class="mb-3">
    <div class="small opacity-4">@icon('cake', ['color' => 'grey'])Age</div>
    <div class="font-weight-bold">{{$student->age ?: '—'}}</div>
</div>

<div class="mb-3">
    <div class="small opacity-4">@icon('venus-and-mars', ['color' => 'grey'])Gender</div>
    <div class="font-weight-bold">{{ucfirst($student->gender)}}</div>
</div>

<div class="mb-3">
    <div class="small opacity-4">@icon('map-pin', ['color' => 'grey'])Default location</div>
    <div class="font-weight-bold">{{$student->location?->name ?: '—'}}</div>
</div>

<div class="mb-3">
    <div class="small opacity-4">@icon('banknote', ['color' => 'grey'])Payment method</div>
    <div class="font-weight-bold {{$student->payment_exempt ? 'text-green' : ''}}">
        {{$student->payment_exempt ? 'Exempt' : ($student->payment_method ?: '—')}}
    </div>
</div>

@if($student->notes)
<div class="mb-3">
    <div class="small opacity-4">@icon('pencil', ['color' => 'grey'])Notes</div>
    <div class="font-weight-bold text-break">{{$student->notes}}</div>
</div>
@endif
