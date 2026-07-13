@modal(['title' => 'New recital', 'id' => 'create-recital-modal'])
<form method="POST" action="{{route('studio.recitals.store')}}">
    @csrf
    @include('studio.recitals.partials.form')
</form>
@endmodal
