@modal(['title' => '', 'id' => 'lesson-modal', 'data' => ['lesson-status' => 'unconfirmed']])
@slot('headerButtons')
<button id="lesson-edit" class="btn btn-raw" type="button">@fa(['icon' => 'pen'])</button>
<button id="lesson-revert" class="btn btn-raw" data-url="{{route('calendar.lessons.revert')}}" type="button">@fa(['icon' => 'rotate-left', 'mr' => 0])</button>
@endslot

<div>
	<div id="lesson-status" class="rounded px-2 py-0 alert small mb-3"></div>
	<div class="alert alert-danger small mb-3" data-lesson-action-error hidden></div>

	<div class="calendar-modal-details">
		<div id="lesson-birthday" class="calendar-modal-detail text-blue" style="display: none">
			@fa(['icon' => 'cake-candles', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
			<span>Birthday <span data-lesson-birthday-label></span></span>
		</div>
		<div class="calendar-modal-detail">
			@fa(['icon' => 'calendar-day', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
			<span id="lesson-date"></span>
		</div>
		<div class="calendar-modal-detail">
			@fa(['icon' => 'clock', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
			<span id="lesson-time"></span>
		</div>
		<div class="calendar-modal-detail" data-lesson-recurrence-section>
			@fa(['icon' => 'repeat', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
			<span id="lesson-recurrence"></span>
		</div>
		<div id="meeting-url" class="calendar-modal-detail">
			@fa(['icon' => 'location-dot', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
			<a target="_blank" rel="noopener" href="">Join the meeting</a>
		</div>
		<div id="notes-url" class="calendar-modal-detail">
			@fa(['icon' => 'file-pen', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
			<a target="_blank" rel="noopener" href="">Notes</a>
		</div>
	</div>
</div>

@include('calendar.lessons.reschedule')

@include('calendar.lessons.cancel')

@include('calendar.lessons.controls')

@endmodal
