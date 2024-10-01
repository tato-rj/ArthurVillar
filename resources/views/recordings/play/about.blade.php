@modal(['title' => $recording->name, 'id' => 'recording-'.$recording->id.'-about-modal'])
<p class="m-0" style="white-space: pre-wrap;">{{$recording->description}}</p>
@endmodal