@modal(['title' => 'Edit recital', 'id' => 'edit-recital-'.$recital->id.'-modal'])
<form method="POST" action="{{route('calendar.recitals.update', $recital)}}">
    @method('PATCH')
    @csrf
    @include('calendar.recitals.partials.form', ['recital' => $recital])
</form>
@endmodal
