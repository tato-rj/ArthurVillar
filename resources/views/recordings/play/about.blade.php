@modal(['title' => $recording->name, 'id' => 'recording-'.$recording->id.'-about-modal'])
<p class="small opacity-6">Composed in {{$recording->composed_in}}<br>by {{$recording->composer->name}}</p>
<div class="quill-text">
	<p class="m-0" style="white-space: pre-wrap;">{!!$recording->description!!}</p>
</div>
@endmodal