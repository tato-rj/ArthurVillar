<div class="mb-4 bg-light p-3 border rounded">
    <h5>{{$title}}</h5>
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