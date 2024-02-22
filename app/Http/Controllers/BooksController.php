<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SuzukiBooks\Recordings;
use Symfony\Component\Process\Process;
use App\Models\Book;

class BooksController extends Controller
{
    public function index()
    {
        $books = Book::all();

        return view('listening.books.index', compact('books'));
    }

    public function show(Book $book)
    {
        return view('listening.books.show', compact('book'));
    }

    public function store(Request $request)
    {
        Book::create([
            'series' => $request->series,
            'name' => $request->name,
            'slug' => str_slug($request->name),
            'cover_path' => $request->file('cover')->store('covers', 'public')
        ]);

        return back()->with('success', 'The book was successully created');
    }

    public function update(Request $request, Book $book)
    {
        $book->update([
            'series' => $request->series,
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
