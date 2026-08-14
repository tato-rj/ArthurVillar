<div class="mb-3">
    <div class="small opacity-4">@fa(['icon' => 'envelope', 'fa_color' => 'grey'])Email</div>
    <div class="font-weight-bold text-break">{{$student->email}}</div>
</div>

<div class="mb-3">
    <div class="small opacity-4">@fa(['icon' => 'phone', 'fa_color' => 'grey'])Phone</div>
    <div class="font-weight-bold">{{$student->phone ?: '—'}}</div>
</div>

@if($student->hasParent())
<div class="mb-3">
    <div class="small opacity-4">@fa(['icon' => 'people-roof', 'fa_color' => 'grey'])Parent name</div>
    <div class="font-weight-bold text-break">{{$student->parent_name}}</div>
</div>
@endif

<div class="mb-3">
    <div class="small opacity-4">@fa(['icon' => 'cake-candles', 'fa_color' => 'grey'])Age</div>
    <div class="font-weight-bold">{{$student->age ?: '—'}}</div>
</div>

<div class="mb-3">
    <div class="small opacity-4">@fa(['icon' => 'venus-mars', 'fa_color' => 'grey'])Gender</div>
    <div class="font-weight-bold">{{ucfirst($student->gender)}}</div>
</div>

<div class="mb-3">
    <div class="small opacity-4">@fa(['icon' => 'location-dot', 'fa_color' => 'grey'])Default location</div>
    <div class="font-weight-bold">{{$student->location?->name ?: '—'}}</div>
</div>

<div class="mb-3">
    <div class="small opacity-4">@fa(['icon' => 'money-bill-wave', 'fa_color' => 'grey'])Payment method</div>
    <div class="font-weight-bold">{{$student->payment_method ?: '—'}}</div>
</div>

@if($student->notes)
<div class="mb-3">
    <div class="small opacity-4">@fa(['icon' => 'pencil', 'fa_color' => 'grey'])Notes</div>
    <div class="font-weight-bold text-break">{{$student->notes}}</div>
</div>
@endif