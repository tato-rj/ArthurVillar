@modal(['title' => 'Recital participants', 'id' => 'recital-participants-modal'])
<form method="POST" action="" id="recital-participants-form">
    @method('PATCH')
    @csrf

    <div class="form-group text-left">
        <label for="recital-student-search">Add students</label>
        <div class="calendar-student-combobox" data-recital-student-combobox>
            <div class="form-control d-flex align-items-center calendar-student-combobox-control">
                <input
                    id="recital-student-search"
                    class="border-0 w-100 h-100"
                    type="text"
                    autocomplete="off"
                    placeholder="Search students"
                    data-recital-student-search>
                @fa(['icon' => 'angle-down', 'mr' => 0, 'fa_color' => 'grey'])
            </div>

            <div class="calendar-student-combobox-menu" data-recital-student-menu>
                @foreach($students as $student)
                    <button
                        type="button"
                        class="calendar-student-combobox-option"
                        data-recital-student-option
                        data-student-id="{{$student->id}}"
                        data-student-name="{{$student->full_name}}">
                        {{$student->full_name}}
                    </button>
                @endforeach
                <div class="calendar-student-combobox-empty" data-recital-student-empty>No students found</div>
            </div>
        </div>
    </div>

    <div class="small font-weight-bold opacity-6 mb-2">PARTICIPATING STUDENTS</div>
    <div class="recital-participant-list mb-3" data-recital-participant-list></div>
    <div data-recital-participant-inputs></div>

    @submit(['label' => 'Confirm', 'theme' => 'primary'])
</form>
@endmodal
