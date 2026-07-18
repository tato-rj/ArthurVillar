@php($current = $lessonPlan->isCurrent())
<div class=" m-1">
	<div class="rounded {{$current ? 'border-green border-2' : 'bg-light'}} p-3 border p-3">
	 	<div style="font-size: 70%" class="mb-2">
			@if($current)
			<div class="fw-bold bg-green rounded py-1 px-2 mb-1 text-white">CURRENT LESSON PLAN</div>
			@endif
		</div>

		<h4 class="mb-2">{{ucfirst($lessonPlan->weekdayName)}}</h4>

		<div class="mb-2">
			<div class="small text-muted">
				@if($lessonPlan->starts_on)
					Start on {{$lessonPlan->starts_on->toFormattedDateString()}}
				@else
					No start date set
				@endif
			</div>
			@if($lessonPlan->ends_on)
			<div class="small text-muted">End on {{$lessonPlan->ends_on->toFormattedDateString()}}</div>
			@endif
		</div>
		
		<div>
			<button type="button" class="btn btn-sm rounded btn-warning w-100 mb-2" data-bs-toggle="modal" data-bs-target="#edit-lessonPlan-{{$lessonPlan->id}}-modal">
				@fa(['icon' => 'pencil', 'mr' => 1])Edit
			</button>

			<form method="POST" action="{{route('calendar.lesson-plans.duplicate', $lessonPlan)}}">
				@csrf
				<button type="submit" class="btn btn-sm rounded btn-white w-100 mb-2">
					@fa(['icon' => 'copy'])Duplicate
				</button>
			</form>
			
			<form method="POST" action="{{route('calendar.lesson-plans.destroy', $lessonPlan)}}" confirm>
				@csrf
				@method('DELETE')
				<button type="submit" class="btn btn-sm {{$current ? 'btn-red' : 'btn-dark'}} w-100 rounded">
					@fa(['icon' => 'trash-alt'])Delete
				</button>
			</form>
		</div>
	</div>
</div>
