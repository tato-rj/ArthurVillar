<div class="calendar-calendar-google-accounts">
	<button type="button" class="btn-raw calendar-calendar-icon-button px-2" data-bs-toggle="modal" data-bs-target="#google-accounts-modal" aria-label="Open google accounts" style="font-size: 1.2rem;">
		@fa(['icon' => 'google', 'mr' => 0, 'fa_color' => 'black', 'fa_type' => '-brands'])
	</button>

	@modal(['title' => 'Google accounts', 'id' => 'google-accounts-modal'])
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
