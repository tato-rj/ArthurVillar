<?php

namespace App\Tools\Cropper;

use Illuminate\Http\Request;
use App\Models\User;

abstract class Uploader
{
	protected $request, $input, $model;

	public function __construct(Request $request)
	{
		$this->request = $request;
	}

	public function take($input)
	{
		$this->input = $input;

		return $this;
	}

	public function model($model)
	{
		$this->model = $model;

		return $this;
	}

	public function folder($folder)
	{
		$this->folder = $folder;
		
		return $this;
	}

	public function upload()
	{
		return $this->update();
	}

	public function update()
	{
		$column = $this->input . '_path';

		if ($this->model->$column && \Storage::disk('public')->exists($this->model->$column))
			\Storage::disk('public')->delete($this->model->$column);
		
		return $this->save();
	}
}
