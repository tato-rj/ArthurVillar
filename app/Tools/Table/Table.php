<?php

namespace App\Tools\Table;

class Table
{
	public function isSortable($field)
	{
		return str_contains($field, '*');
	}

	public function getFieldname($field)
	{
		return str_replace('*', '', $field);
	}
}