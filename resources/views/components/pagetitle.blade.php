<div class="mb-4 text-center">
	<h1 class="text-center mb-0">{{$label}}</h1>

	@isset($href)
        <div class="mt-2">
            <a class="btn btn-sm btn-outline-secondary" href="{{$href['url']}}" target="_blank">@fa(['icon' => $href['icon']]){{$href['label']}}</a>
        </div>
	@endisset

	@isset($modal)
        <div class="mt-2">
            <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="{{$modal['target']}}">@fa(['icon' => $modal['icon']]){{$modal['label']}}</button>
        </div>
	@endisset
</div>