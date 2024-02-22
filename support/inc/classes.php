<?php

function bugreport($e)
{
	return \Bugsnag::notifyException($e);
}

function faker()
{
	return \Illuminate\Container\Container::getInstance()->make(\Faker\Generator::class);
}

function throwValidationException($message, $input = 'erro')
{
	throw \Illuminate\Validation\ValidationException::withMessages(
		[$input => $message]
	);
}

function carbon($str = null)
{
	return \Carbon\Carbon::parse($str);
}

function strToCarbon($str = null, $format = 'Y-m-d')
{
	if (!$str)
		return null;

	return \Carbon\Carbon::parse($str)->format($format);
}

function hasPagination($collection)
{
	return $collection instanceof \Illuminate\Pagination\LengthAwarePaginator;
}