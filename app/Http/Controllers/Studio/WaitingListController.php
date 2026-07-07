<?php

namespace App\Http\Controllers\Studio;

use Illuminate\Http\Request;
use App\Models\WaitingList;
use App\Http\Controllers\Controller;

class WaitingListController extends Controller
{
    public function index()
    {
        return view('studio.waiting-list.index');
    }

    public function store(Request $request)
    {
        WaitingList::create($this->waitingListAttributes($this->validateWaitingList($request)));

        return back()->with('success', 'The waiting list entry was successfully added');
    }

    public function edit(WaitingList $waitingList)
    {
        return view('studio.waiting-list.edit', compact('waitingList'));
    }

    public function update(Request $request, WaitingList $waitingList)
    {
        $waitingList->update($this->waitingListAttributes($this->validateWaitingList($request)));

        return back()->with('success', 'The waiting list entry was successfully updated');
    }

    public function convert(WaitingList $waitingList)
    {
        $student = $waitingList->convertToStudent();

        return redirect()
            ->route('studio.students.index')
            ->with('success', $student->first_name.' was successfully converted into a student');
    }

    public function destroy(WaitingList $waitingList)
    {
        $waitingList->delete();

        return back()->with('success', 'The waiting list entry was successfully deleted');
    }

    private function validateWaitingList(Request $request)
    {
        return $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'parent_name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'is_adult' => ['nullable', 'boolean'],
            'notes' => ['nullable', 'string'],
        ]);
    }

    private function waitingListAttributes(array $data)
    {
        return [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'] ?? null,
            'parent_name' => $data['parent_name'] ?? null,
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'is_adult' => $data['is_adult'] ?? false,
            'notes' => $data['notes'] ?? null,
        ];
    }
}
