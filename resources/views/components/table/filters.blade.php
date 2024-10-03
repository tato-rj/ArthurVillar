<div class="text-right mb-2" id="filters-container"> 
	<div class="d-flex justify-content-end"> 
		@foreach($lists as $label => $list)
		@select(['placeholder' => 'Filter by '. $label, 'name' => 'item-filter', 'size' => 'sm', 'classes' => $loop->last ? null : 'mr-2'])
			@foreach($list as $item)
				@option(['name' => 'item-filter', 'label' => ucfirst($item), 'value' => $item])
			@endforeach
		@endselect
		@endforeach
	</div>

    <div class="mt-1">
        <button type="button" class="btn-raw text-red" id="clear-filters" style="font-size: 90%!important;">clear filters</button>
    </div>
</div>