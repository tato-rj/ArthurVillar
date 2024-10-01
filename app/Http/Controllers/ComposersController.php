<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Composer, Period};
use App\Tools\Cropper\ImageUpload;

class ComposersController extends Controller
{
    public function index()
    {
        $periods = Period::orderBy('starts_in')->get();
        $composers = Composer::orderBy('period_id')->get();

        return view('composers.index', compact(['composers', 'periods']));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'biography' => 'required',
            'country_id' => 'required',
            'period_id' => 'required',
            'cover' => 'required|mimes:jpg,jpeg,png|max:500'
        ]);

        $composer = Composer::create([
            'name' => $request->name,
            'biography' => $request->biography,
            'curiosity' => $request->curiosity,
            'period_id' => $request->period_id,
            'country_id' => $request->country_id,
            'born_in' => $request->born_in,
            'died_in' => $request->died_in,
        ]);

        if ($file = $request->file('cover'))
            $composer->update(['cover_path' => (new ImageUpload($request))->take('cover')
                                                       ->model($composer)
                                                       ->folder('composers')
                                                       ->cropped()
                                                       ->upload()]);

        return back()->with('success', 'The composer was successully created');
    }

    public function show(Composer $composer)
    {
        
    }

    public function edit(Request $request, Composer $composer)
    {
        $periods = Period::orderBy('starts_in')->get();

        return view('composers.edit', compact(['composer', 'periods']));
    }

    public function update(Request $request, Composer $composer)
    {
        $request->validate([
            'name' => 'required',
            'biography' => 'required',
            'country_id' => 'required',
            'period_id' => 'required',
            'cover' => 'sometimes|mimes:jpg,jpeg,png|max:500'
        ]);

        $composer->update([
            'name' => $request->name,
            'biography' => $request->biography,
            'curiosity' => $request->curiosity,
            'period_id' => $request->period_id,
            'country_id' => $request->country_id,
            'born_in' => $request->born_in,
            'died_in' => $request->died_in,
        ]);

        if ($file = $request->file('cover'))
            $composer->update(['cover_path' => (new ImageUpload($request))->take('cover')
                                                       ->model($composer)
                                                       ->folder('composers')
                                                       ->cropped()
                                                       ->upload()]);

        return back()->with('success', 'The composer was successully updated');
    }

    public function destroy(Composer $composer)
    {
        $composer->preventDeletionWith(['recordings'])->delete();

        return redirect(route('admin.composers.index'))->with('success', 'The composer was successully deleted');
    }
}
