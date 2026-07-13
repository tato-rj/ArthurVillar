@modal(['title' => 'Edit recital', 'id' => 'edit-recital-'.$recital->id.'-modal'])
<form method="POST" action="{{route('studio.recitals.update', $recital)}}">
    @method('PATCH')
    @csrf
    @include('studio.recitals.partials.form', ['recital' => $recital])
</form>
@endmodal
