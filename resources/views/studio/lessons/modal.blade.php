@modal(['title' => '', 'id' => 'lesson-modal', 'data' => ['lesson-status' => 'unconfirmed']])
@slot('headerButtons')
<a id="lesson-edit" class="btn btn-raw mr-1" href="">@fa(['icon' => 'pencil'])</a>
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

@include('studio.lessons.reschedule')

@include('studio.lessons.cancel')

@include('studio.lessons.controls')

@endmodal
