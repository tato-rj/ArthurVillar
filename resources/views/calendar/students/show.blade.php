@extends('layouts.app', ['title' => $student->full_name])

@section('content')
<section class="container py-5">
    {{ Breadcrumbs::render('calendar.students.show', $student) }}

    <div class="row mb-4">
        @component('components.pagetitle', [
            'label' => $student->full_name
        ])

        @slot('subtitle')
        <div class="d-center">
            <a href="{{route('calendar.lesson-records.index', ['search' => $student->full_name, 'record_statuses' => 'paid'])}}">
                <span class="badge bg-green text-white border border-green" title="Confirmed lessons">{{$confirmedLessons->count()}} paid</span>
            </a>
            <a href="{{route('calendar.lesson-records.index', ['search' => $student->full_name, 'record_statuses' => 'unpaid'])}}">
            <span class="badge bg-red text-white ml-2 border border-red" title="Unpaid lessons">{{$unpaidLessons->count()}} unpaid</span>
            </a>
            <a href="{{route('calendar.lesson-records.index', ['search' => $student->full_name, 'record_statuses' => 'canceled'])}}">
            <span class="badge bg-light text-dark ml-2 border" title="Canceled lessons">{{$canceledLessons->count()}} canceled</span>
            </a>
        </div>
        @endslot
        @endcomponent
    </div>

    <div class="row">
        <div class="col-lg-3 col-md-4 col-12">
            <div class="mb-3">
                <div class="small opacity-4">@fa(['icon' => 'envelope', 'fa_color' => 'grey'])Email</div>
                <div class="font-weight-bold text-break">{{$student->email}}</div>
            </div>
            <div class="mb-3">
                <div class="small opacity-4">@fa(['icon' => 'phone', 'fa_color' => 'grey'])Phone</div>
                <div class="font-weight-bold">{{$student->phone ?: '—'}}</div>
            </div>
            <div class="mb-3">
                <div class="small opacity-4">@fa(['icon' => 'location-dot', 'fa_color' => 'grey'])Default location</div>
                <div class="font-weight-bold">{{$student->location?->name ?: '—'}}</div>
            </div>
            <div class="mb-3">
                <div class="small opacity-4">@fa(['icon' => 'money-bill-wave', 'fa_color' => 'grey'])Payment method</div>
                <div class="font-weight-bold">{{$student->payment_method ?: '—'}}</div>
            </div>
        </div>

        <div class="col-lg-9 col-md-8 col-11">
            @include('calendar.students.tables.plans')
        </div>
    </div>

{{--     @if($student->parent_name || $student->notes)
        <div class="row mb-4">
            @if($student->parent_name)
                <div class="col-md-4 mb-3">
                    <div class="small opacity-4">@fa(['icon' => 'user-group', 'fa_color' => 'grey'])Parent</div>
                    <div class="font-weight-bold">{{$student->parent_name}}</div>
                </div>
            @endif
            @if($student->notes)
                <div class="col mb-3">
                    <div class="small opacity-4">@fa(['icon' => 'note-sticky', 'fa_color' => 'grey'])Notes</div>
                    <div style="white-space: pre-line">{{$student->notes}}</div>
                </div>
            @endif
        </div>
    @endif --}}

</section>
@endsection
