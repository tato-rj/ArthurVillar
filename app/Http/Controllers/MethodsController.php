<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Method;

class MethodsController extends Controller
{
    public function index()
    {
        $methods = Method::all();

        return view('listening.methods.index', compact('methods'));
    }

    public function store(Request $request)
    {
        Method::create(['name' => $request->name]);

        return back()->with('success', 'The method was successully created');
    }

    public function update(Request $request, Method $method)
    {
        $method->update(['name' => $request->name]);

        return back()->with('success', 'The method was successully updated');
    }

    public function destroy(Request $request, Method $method)
    {
        $method->preventDeletionWith(['books'])->delete();

        $method->delete();

        return back()->with('success', 'The method was successully deleted');
    }
}
