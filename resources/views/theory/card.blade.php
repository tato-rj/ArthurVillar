<div class="mb-5">
    <h3>{{$title}}</h3>
    <p>{{$description}}</p>

    <button data-bs-toggle="modal" data-bs-target="#{{str_slug($title)}}-settings-modal", {{isset($disabled) && $disabled ? 'disabled' : null}} class="btn btn-primary w-100">
        @if(isset($disabled) && $disabled)
        Coming up soon
        @else
        @fa(['icon' => 'gear'])Set up challenge
        @endif
    </button>

    {{$slot}}
</div>