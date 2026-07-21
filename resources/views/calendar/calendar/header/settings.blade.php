<div class="calendar-calendar-settings">
	<button type="button" class="btn-raw calendar-calendar-icon-button px-2" data-bs-toggle="modal" data-bs-target="#settings-modal" aria-label="Open settings">
		@fa(['icon' => 'gear', 'mr' => 0, 'fa_color' => 'black'])
	</button>

	@modal(['title' => 'Settings', 'id' => 'settings-modal'])
		<form method="POST" action="{{route('calendar.settings.update')}}">
			@method('PATCH')
			@csrf

			<section class="calendar-settings-section" aria-labelledby="settings-view-options-title">
				<h6 id="settings-view-options-title">View options</h6>

				<input type="hidden" name="calendar_show_insights" value="0">
				<div class="form-check calendar-settings-option">
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

				<input type="hidden" name="calendar_show_holidays" value="0">
				<div class="form-check calendar-settings-option">
					<input
						class="form-check-input"
						id="calendar-show-holidays"
						name="calendar_show_holidays"
						type="checkbox"
						value="1"
						{{iftrue(old('calendar_show_holidays', $showHolidays), 'checked')}}
					>
					<label class="form-check-label" for="calendar-show-holidays">Show holidays</label>
				</div>

				<input type="hidden" name="calendar_show_cancelled" value="0">
				<div class="form-check calendar-settings-option">
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
				<div class="form-check calendar-settings-option">
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
				<div class="form-check calendar-settings-option">
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

			<section class="calendar-settings-section" aria-labelledby="settings-calendar-initial-view-title">
				<h6 id="settings-calendar-initial-view-title">Calendar initial view</h6>

				@select(['icon' => 'desktop', 'name' => 'calendar_default_desktop_view', 'id' => 'calendar-default-desktop-view'])
					@foreach($calendarViewOptions as $calendarView => $calendarViewLabel)
						<option value="{{$calendarView}}" {{iftrue($selectedDesktopCalendarView === $calendarView, 'selected')}}>{{$calendarViewLabel}}</option>
					@endforeach
				@endselect

				@select(['icon' => 'mobile', 'name' => 'calendar_default_mobile_view', 'id' => 'calendar-default-mobile-view'])
					@foreach($calendarViewOptions as $calendarView => $calendarViewLabel)
						<option value="{{$calendarView}}" {{iftrue($selectedMobileCalendarView === $calendarView, 'selected')}}>{{$calendarViewLabel}}</option>
					@endforeach
				@endselect
			</section>

			<section class="calendar-settings-section" aria-labelledby="settings-appearance-title">
				<h6 id="settings-appearance-title">Appearance</h6>

				@foreach($appearanceSettings as $appearanceSetting)
					<div class="d-apart mb-3">
						<div class="d-flex align-items-center">
							<div class="calendar-settings-color-control">
								<input
									class="calendar-settings-color-picker"
									id="{{$appearanceSetting['id']}}"
									name="{{$appearanceSetting['name']}}"
									title="Choose the color for {{strtolower($appearanceSetting['label'])}}"
									type="color"
									value="{{$appearanceSetting['value']}}"
								>
							</div>
							<label class="form-label ml-2 mb-0" for="{{$appearanceSetting['id']}}">{{$appearanceSetting['label']}}</label>
						</div>
						<button
							class="btn-raw setting-undo"
							data-setting-original="{{$appearanceSetting['default']}}"
							data-setting-target="{{$appearanceSetting['id']}}"
							title="Restore the original color"
							type="button"
						>@fa(['icon' => 'redo'])</button>
					</div>
				@endforeach
			</section>

			<section class="calendar-settings-section" aria-labelledby="settings-notification-preferences-title">
				<h6 id="settings-notification-preferences-title">Notifications default</h6>

				@select(['name' => 'default_event_notification_minutes_before', 'icon' => 'bell'])
					<option value="-1" {{iftrue($selectedNotificationPreference === -1, 'selected')}}>Off</option>
					@foreach(\App\Models\Calendar\Event::notificationOptions() as $minutes => $label)
						<option value="{{$minutes}}" {{iftrue($selectedNotificationPreference === (int) $minutes, 'selected')}}>{{$label}}</option>
					@endforeach
				@endselect
			</section>

			@submit(['label' => 'Save changes', 'theme' => 'primary'])
		</form>

		<section class="calendar-settings-section mt-4" aria-labelledby="settings-google-calendar-title">
			<h6 id="settings-google-calendar-title">Google Calendar</h6>

			@if(! $googleCalendarConfigured && ! $googleCalendarConnection)
				<p class="small text-muted mb-0">
					Add the Google Calendar OAuth credentials to the server environment before connecting.
				</p>
			@elseif(! $googleCalendarConnection)
				<p class="small text-muted">
					Import meetings where you are an attendee. Google remains the source of truth.
				</p>
				<a class="btn btn-outline-dark w-100" href="{{route('calendar.google-calendar.connect')}}">
					@fa(['icon' => 'calendar-plus'])Connect Google Calendar
				</a>
			@else
				@if(! $googleCalendarConfigured)
					<div class="alert alert-danger small">The Google OAuth credentials are missing from the server.</div>
				@endif

				<div class="small mb-3">
					<div class="font-weight-bold">{{$googleCalendarConnection->calendar_name ?: 'Primary calendar'}}</div>
					<div class="text-muted">
						@if($googleCalendarConnection->last_synced_at)
							Last synced {{$googleCalendarConnection->last_synced_at->diffForHumans()}}
						@else
							Waiting for the automatic first sync (runs every five minutes)
						@endif
					</div>
				</div>

				@if($googleCalendarConnection->last_error)
					<div class="alert alert-danger small">{{$googleCalendarConnection->last_error}}</div>
				@endif

				<div class="d-flex">
					<form class="w-100 mr-1" method="POST" action="{{route('calendar.google-calendar.sync')}}">
						@csrf
						<button class="btn btn-outline-dark w-100" type="submit" {{iftrue(! $googleCalendarConfigured, 'disabled')}}>@fa(['icon' => 'rotate'])Sync now</button>
					</form>

					<form class="w-100 ml-1" method="POST" action="{{route('calendar.google-calendar.disconnect')}}">
						@csrf
						@method('DELETE')
						<button class="btn btn-outline-red w-100" type="submit">Disconnect</button>
					</form>
				</div>
			@endif
		</section>
	@endmodal
</div>
