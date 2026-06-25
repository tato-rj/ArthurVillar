<div class="row mb-3">
    <div class="col-lg-6 col-md-8 col-10 mx-auto">
    @unless ($breadcrumbs->isEmpty())
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-light rounded px-3 py-2">
                @foreach ($breadcrumbs as $breadcrumb)

                    @if ($breadcrumb->url && !$loop->last)
                        <li class="breadcrumb-item"><a href="{{ $breadcrumb->url }}">{{ $breadcrumb->title }}</a></li>
                    @else
                        <li class="breadcrumb-item active" aria-current="page">{{ $breadcrumb->title }}</li>
                    @endif

                @endforeach
            </ol>
        </nav>
    @endunless
    </div>
</div>