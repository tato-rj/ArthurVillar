<?php

namespace App\SuzukiBooks\Books;

//https://www.youtube.com/playlist?list=PLB5B4D4370F6A4457

abstract class SuzukiBook
{
	private $name;

	public function __construct()
	{
		$this->name = class_basename(get_class($this));
	}

	public function get()
	{
		return (object) [
			'name' => $this->name(),
			'tracks' => $this->tracks()
		];
	}

	public function name()
	{
		return 'Suzuki ' . preg_replace('/(\p{L})(\p{N})/u', '$1 $2', $this->name);
	}

	public function tracks()
	{
		return collect($this->tracks)->map(function ($item) {
		    return (object) [
		        'name' => $item,
		        'path' => $this->path($item),
		    ];
		});
	}

	public function path(string $track)
	{
		$folder = strtolower($this->name);

		return 'audio/' . $folder . '/' . str_slug($track) . '.mp3';
	}
}