<div class="studio-calendar-settings">
	<button type="button" class="btn-raw studio-calendar-icon-button" data-bs-toggle="modal" data-bs-target="#settings-modal" aria-label="Open settings">
		@fa(['icon' => 'gear', 'mr' => 0, 'fa_size' => 'lg', 'fa_color' => 'black'])
	</button>

	@modal(['title' => 'Settings', 'id' => 'settings-modal'])
		<form method="POST" action="{{route('studio.settings.update')}}">
			@method('PATCH')
			@csrf

			<section class="studio-settings-section" aria-labelledby="settings-display-options-title">
				<h6 id="settings-display-options-title">Display options</h6>

				<input type="hidden" name="calendar_show_nearby_birthdays" value="0">
				<div class="form-check studio-settings-option">
					<input
						class="form-check-input"
						id="calendar-show-nearby-birthdays"
						name="calendar_show_nearby_birthdays"
						type="checkbox"
						value="1"
						{{iftrue(old('calendar_show_nearby_birthdays', $showNearbyBirthdays), 'checked')}}
					>
					<label class="form-check-label" for="calendar-show-nearby-birthdays">Show nearby birthdays</label>
				</div>

				<input type="hidden" name="calendar_show_insights" value="0">
				<div class="form-check studio-settings-option">
					<input
						class="form-check-input"
						id="calendar-show-insights"
						name="calendar_show_insights"
						type="checkbox"
						value="1"
						{{iftrue(old('calendar_show_insights', $showCalendarInsights), 'checked')}}
					>
					<label class="form-check-label" for="calendar-show-insights">Show calendar insights</label>
				</div>
			</section>

			<section class="studio-settings-section" aria-labelledby="settings-view-options-title">
				<h6 class="">View options</h6>

				<input type="hidden" name="calendar_show_cancelled" value="0">
				<div class="form-check studio-settings-option">
					<input
						class="form-check-input"
						id="calendar-show-cancelled"
						name="calendar_show_cancelled"
						type="checkbox"
						value="1"
						{{iftrue(old('calendar_show_cancelled', $showCancelledLessons), 'checked')}}
					>
					<label class="form-check-label" for="calendar-show-cancelled">Show cancelled lessons</label>
				</div>

				<input type="hidden" name="calendar_add_transparency_to_past_events" value="0">
				<div class="form-check studio-settings-option">
					<input
						class="form-check-input"
						id="calendar-add-transparency-to-past-events"
						name="calendar_add_transparency_to_past_events"
						type="checkbox"
						value="1"
						{{iftrue(old('calendar_add_transparency_to_past_events', $addTransparencyToPastEvents), 'checked')}}
					>
					<label class="form-check-label" for="calendar-add-transparency-to-past-events">Add transparency to past events</label>
				</div>

				<input type="hidden" name="calendar_highlight_conflicting_events" value="0">
				<div class="form-check studio-settings-option">
					<input
						class="form-check-input"
						id="calendar-highlight-conflicting-events"
						name="calendar_highlight_conflicting_events"
						type="checkbox"
						value="1"
						{{iftrue(old('calendar_highlight_conflicting_events', $highlightConflictingEvents), 'checked')}}
					>
					<label class="form-check-label" for="calendar-highlight-conflicting-events">Highlight conflicting events</label>
				</div>
			</section>

			<section class="studio-settings-section" aria-labelledby="settings-notification-preferences-title">
				<h6 id="settings-notification-preferences-title">Notifications default</h6>

				@select(['name' => 'default_event_notification_minutes_before'])
					@php($selectedNotificationPreference = (int) old('default_event_notification_minutes_before', $defaultEventNotificationMinutesBefore))
					<option value="-1" {{iftrue($selectedNotificationPreference === -1, 'selected')}}>Off</option>
					@foreach(\App\Models\Event::notificationOptions() as $minutes => $label)
						<option value="{{$minutes}}" {{iftrue($selectedNotificationPreference === (int) $minutes, 'selected')}}>{{$label}}</option>
					@endforeach
				@endselect
			</section>

			@submit(['label' => 'Save changes', 'theme' => 'primary'])
		</form>
	@endmodal
</div>
