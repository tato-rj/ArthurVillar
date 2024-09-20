<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SuzukiBooks\Recordings;
use Symfony\Component\Process\Process;
use App\Models\{Book, Track, Method};

class BooksController extends Controller
{
    public function index()
    {
        $methods = Method::pluck('name');
        $books = Book::all();

        return view('listening.books.index', compact(['books', 'methods']));
    }

    public function show(Book $book)
    {
        $composers = Track::whereNotNull('composer')->distinct()->pluck('composer');

        return view('listening.books.show', compact(['book', 'composers']));
    }

    public function store(Request $request)
    {
        $request->validate([
            'method' => 'required',
            'name' => 'required',
            'cover' => 'required|mimes:jpg,jpeg,png|max:500'
        ]);

        $method = Method::byName($request->method)->firstOrCreate([
            'name' => $request->method,
            'slug' => str_slug($request->method)
        ]);

        Book::create([
            'method_id' => $method->id,
            'name' => $request->name,
            'slug' => str_slug($request->name),
            'cover_path' => $request->file('cover')->store('covers', 'public')
        ]);

        return back()->with('success', 'The book was successully created');
    }

    public function update(Request $request, Book $book)
    {
        $method = Method::byName($request->method)->firstOrCreate([
            'name' => $request->method,
            'slug' => str_slug($request->method)
        ]);

        $book->update([
            'method_id' => $method->id,
            'name' => $request->name,
            'slug' => str_slug($request->name)
        ]);

        if ($request->has('cover')) {
            if (\Storage::disk('public')->exists($book->cover_path))
                \Storage::disk('public')->delete($book->cover_path);

            $book->update(['cover_path' => $request->file('cover')->store('covers', 'public')]);
        }

        return back()->with('success', 'The book was successully updated');
    }

    public function destroy(Request $request, Book $book)
    {
        $book->preventDeletionWith(['tracks'])->delete();
        
        if (\Storage::disk('public')->exists($book->cover_path))
            \Storage::disk('public')->delete($book->cover_path);

        return redirect(route('listening.index'))->with('success', 'The book was successully removed');
    }
}
