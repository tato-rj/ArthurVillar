@php($current = $lessonPlan->isCurrent())
<div class=" m-1">
	<div class="rounded {{$current ? 'border-green border-2' : 'bg-light'}} p-3 border p-3">
	 	<div style="font-size: 70%" class="mb-2">
			@if($current)
			<div class="fw-bold bg-green rounded py-1 px-2 mb-1 text-white">CURRENT LESSON PLAN</div>
			@endif
		</div>

		<div class="mb-2">
			<h5 class="m-0">{{ucfirst($lessonPlan->weekdayName)}}</h5>
			<div>{{$lessonPlan->recurrence}}</div>
			<div>
			Start on {{$lessonPlan->starts_on->toFormattedDateString()}}
			@if($lessonPlan->ends_on)
			End on {{$lessonPlan->ends_on->toFormattedDateString()}}
			@endif
			</div>
		</div>

		@if($current)
		<div class="mb-3">
			<div class="mb-1">@fa(['icon' => 'piggy-bank', 'fa_color' => 'grey']){{$lessonPlan->payment_method}}</div>
			<div class="mb-1">@fa(['icon' => 'money-bill-wave', 'fa_color' => 'grey']){{payment()->usd($lessonPlan->fee_amount)}}</div>
			<div>@fa(['icon' => 'clock', 'fa_color' => 'grey']){{$lessonPlan->startTime()->format('g:i A')}}</div>
		</div>
		@endif

		<div>
			@if($current)
			<div class="d-flex">
				<button type="button" class="btn btn-sm rounded btn-warning w-100 mb-2 mr-1" data-bs-toggle="modal" data-bs-target="#edit-lessonPlan-{{$lessonPlan->id}}-modal">
					@fa(['icon' => 'pencil', 'mr' => 1])Edit
				</button>
				<form method="POST" action="{{route('studio.lesson-plans.close', $lessonPlan)}}" class="w-100 ml-1" confirm>
					@csrf
					<button type="submit" class="btn btn-sm btn-white rounded w-100 mb-2">
						End
					</button>
				</form>
			</div>
			@else
			<form method="POST" action="{{route('studio.lesson-plans.duplicate', $lessonPlan)}}">
				@csrf
				<button type="submit" class="btn btn-sm rounded btn-white w-100 mb-2">
					@fa(['icon' => 'copy'])Duplicate
				</button>
			</form>
			@endif

			<form method="POST" action="{{route('studio.lesson-plans.destroy', $lessonPlan)}}" confirm>
				@csrf
				@method('DELETE')
				<button type="submit" class="btn btn-sm {{$current ? 'btn-red' : 'btn-dark'}} w-100 rounded">
					@fa(['icon' => 'trash-alt'])Delete
				</button>
			</form>
		</div>
	</div>
</div>
