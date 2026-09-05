<button type="button" class="btn-raw mini-calendar-show calendar-student-show"
    data-bs-toggle="offcanvas" data-bs-target="#calendar-student-offcanvas"
    aria-controls="calendar-student-offcanvas" aria-label="Show student lesson plans">
    @fa(['icon' => 'user', 'mr' => 0])
</button>
<div class="offcanvas offcanvas-bottom calendar-student-offcanvas" tabindex="-1"
    id="calendar-student-offcanvas" aria-label="Student lesson plans">
    <div class="offcanvas-body">
        <div class="d-flex align-items-center gap-3">
            <div class="calendar-student-combobox flex-grow-1" data-student-combobox>
                <div class="form-control d-flex align-items-center calendar-student-combobox-control">
                    <input class="border-0 w-100 h-100" type="text" autocomplete="off"
                        placeholder="Select a student" aria-label="Search students" data-student-combobox-input>
                    <input type="hidden" data-student-combobox-value>
                    @fa(['icon' => 'angle-down', 'mr' => 0, 'fa_color' => 'grey'])
                </div>
                <div class="calendar-student-combobox-menu" data-student-combobox-menu>
                    @foreach($students ?? [] as $student)
                        <button type="button" class="calendar-student-combobox-option"
                            data-student-combobox-option data-student-id="{{$student->id}}"
                            data-student-name="{{$student->full_name}}"
                            data-plans-url="{{route('calendar.students.lesson-plans', $student)}}">
                            {{$student->full_name}}
                        </button>
                    @endforeach
                    <div class="small text-muted p-2" data-student-combobox-empty hidden>No students found.</div>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="text-danger small mt-2" data-general-event-action-error role="alert" hidden></div>
        <div data-student-plans aria-live="polite" hidden></div>
    </div>
</div>
