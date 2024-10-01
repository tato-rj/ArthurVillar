@modal(['id' => 'recording-'.$recording->id.'-about-modal'])
@slot('title')
<div class="small opacity-6">{{$recording->composed_in}}</div>
{{$recording->name}}
@endslot
<p class="m-0" style="white-space: pre-wrap;">{{$recording->description}}</p>
@endmodal