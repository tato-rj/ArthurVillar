<?php

namespace App\SuzukiBooks;

use App\SuzukiBooks\Books\Book1;

class Recordings
{
	protected $books = [
		'book1' => Book1::class
	];

	public function book($book)
	{
		return (new $this->books[$book]);
	}
}