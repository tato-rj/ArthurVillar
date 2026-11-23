<div class="px-3 mt-2" data-conflict-section @if($expandedOnly ?? false) data-event-modal-expanded-content @endif hidden>
    <div class="border-top pt-4 mt-4 d-grid gap-2">
        <div data-conflict-controls>
            <div class="alert alert-danger small mb-3" data-conflict-error hidden></div>
            <button type="button" class="btn btn-outline-secondary w-100" data-conflict-toggle>
                @icon('triangle-alert')<span data-conflict-toggle-label>Ignore conflict</span>
            </button>
        </div>
        @if($showGoogleHideAction ?? false)
            <button type="button" class="btn btn-outline-secondary w-100" data-google-event-hide hidden>
                @icon('eye-off')Hide event
            </button>
            <form data-google-hide-form id="google-hide-form" hidden>
                <fieldset class="my-4 bg-light rounded p-3">
                    <legend class="float-none fs-6 mb-1">Which events do you want to hide?</legend>
                    @foreach(['current' => 'This event only', 'multiple' => 'Multiple events', 'future' => 'This and all following events', 'all' => 'All events'] as $scope => $label)
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="scope" id="google-hide-{{$scope}}" value="{{$scope}}" @checked($scope === 'current')>
                            <label class="form-check-label" for="google-hide-{{$scope}}">{{$label}}</label>
                        </div>
                        @if($scope === 'multiple')
                            @include('calendar.calendar.occurrence-date-picker', ['pickerId' => 'google-hide-dates'])
                        @endif
                    @endforeach
                </fieldset>
                <button type="submit" class="btn btn-primary w-100">@icon('eye-off')Hide event</button>
                <button type="button" class="btn btn-raw w-100 mt-1" data-google-hide-back>Back</button>
            </form>
        @endif
        @if($showRecitalAction ?? false)
            <div data-lesson-recital-action hidden>
                <button type="button" class="btn btn-outline-secondary w-100" data-lesson-recital-open aria-controls="lesson-recital-picker" aria-expanded="false">
                    @icon('piano')Join an upcoming recital
                </button>
            </div>
        @endif
    </div>
</div>
