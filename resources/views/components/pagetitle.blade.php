<div class="mb-4">
	<h1 class="text-center mb-0">{{$label}}</h1>

	@isset($href)
        <div>
            <a class="btn btn-sm btn-secondary" href="{{$href['url']}}" target="_blank">@fa(['icon' => $href['icon']]){{$href['label']}}</a>
        </div>
	@endisset
</div>