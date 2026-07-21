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

			<section class="calendar-settings-section" aria-labelledby="settings-google-calendar-title">
				<h6 id="settings-google-calendar-title">Google Calendar</h6>

				@select(['label' => 'Save recurring events up to', 'name' => 'google_recurring_sync_months', 'id' => 'google-recurring-sync-months'])
					@foreach($googleRecurringSyncMonthOptions as $months)
						<option value="{{$months}}" {{iftrue($selectedGoogleRecurringSyncMonths === $months, 'selected')}}>{{$months}} months from today</option>
					@endforeach
				@endselect
			</section>

			<div class="mt-4">
				@submit(['label' => 'Save changes', 'theme' => 'primary'])
			</div>
		</form>

		<hr class="my-4">

		<section class="calendar-settings-section" aria-label="Google Calendar connections">
			@if(! $googleCalendarConfigured && $googleCalendarConnections->isEmpty())
				<p class="small text-muted mb-0">
					Add the Google Calendar OAuth credentials to the server environment before connecting.
				</p>
			@else
				@foreach($googleCalendarConnections as $googleCalendarConnection)
					<div class="border rounded p-3 mb-3">
						<div class="calendar-google-account d-flex align-items-center small mb-3">
							@if($googleCalendarConnection->profile_picture_url)
								<img
									class="calendar-google-account-avatar rounded-circle mr-3"
									src="{{$googleCalendarConnection->profile_picture_url}}"
									alt=""
									referrerpolicy="no-referrer"
								>
							@else
								<div class="calendar-google-account-avatar calendar-google-account-avatar-fallback rounded-circle mr-3" aria-hidden="true">
									<i class="fa-brands fa-google"></i>
								</div>
							@endif

							<div class="calendar-google-account-details">
								<div class="font-weight-bold text-nowrap text-truncate">{{$googleCalendarConnection->calendar_id}}</div>
								<div class="text-muted text-nowrap text-truncate">
								@if($googleCalendarConnection->last_synced_at)
									Last synced {{$googleCalendarConnection->last_synced_at->diffForHumans()}}
								@else
									Waiting for the automatic first sync (runs every five minutes)
								@endif
								</div>
							</div>
						</div>

						@if($googleCalendarConnection->last_error)
							<div class="alert alert-danger small">{{$googleCalendarConnection->last_error}}</div>
						@endif

						<div class="d-flex">
							<form class="w-100 mr-1" method="POST" action="{{route('calendar.google-calendar.sync', $googleCalendarConnection)}}">
								@csrf
								<button class="btn btn-outline-dark btn-sm w-100" type="submit" {{iftrue(! $googleCalendarConfigured, 'disabled')}}>@fa(['icon' => 'rotate'])Sync now</button>
							</form>

							<form class="w-100 ml-1" method="POST" action="{{route('calendar.google-calendar.disconnect', $googleCalendarConnection)}}">
								@csrf
								@method('DELETE')
								<button class="btn btn-outline-red btn-sm w-100" type="submit">Disconnect</button>
							</form>
						</div>
					</div>
				@endforeach

				@if($googleCalendarConfigured)
					<a class="btn btn-outline-dark w-100" href="{{route('calendar.google-calendar.connect')}}">
						@fa(['icon' => 'calendar-plus']){{$googleCalendarConnections->isEmpty() ? 'Connect Google Calendar' : 'Add another Google account'}}
					</a>
				@else
					<div class="alert alert-danger small mb-0">The Google OAuth credentials are missing from the server.</div>
				@endif
			@endif
		</section>
	@endmodal
</div>
