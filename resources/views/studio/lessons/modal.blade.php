@modal(['title' => '', 'id' => 'lesson-modal', 'data' => ['lesson-status' => 'unconfirmed']])
@slot('headerButtons')
<button id="lesson-revert" class="btn btn-raw mr-1" data-url="{{route('studio.lessons.revert')}}" type="button">@fa(['icon' => 'rotate-left', 'mr' => 0])</button>
@endslot

<div>
	<div id="lesson-status" class="rounded px-2 py-0 alert small mb-3"></div>

	<div class="mb-1">
		@fa(['icon' => 'calendar-day', 'classes' => 'opacity-4'])
		<span id="lesson-date"></span>
	</div>
	<div class="mb-1">
		@fa(['icon' => 'clock', 'classes' => 'opacity-4'])
		<span id="lesson-time"></span>
	</div>
	<div>
		@fa(['icon' => 'repeat', 'classes' => 'opacity-4'])
		<span id="lesson-recurrence"></span>
	</div>
</div>

<div>
	<div id="meeting-url" class="mt-3">
		<a target="_blank" href="" class="text-warning">@fa(['icon' => 'video'])Meeting url</a>	
	</div>

	<div id="notes-url" class="mt-1">
		<a target="_blank" href="" class="text-warning">@fa(['icon' => 'file-pen'])Notes url</a>	
	</div>
</div>

@include('studio.lessons.reschedule')

@include('studio.lessons.cancel')

@include('studio.lessons.controls')

@endmodal
