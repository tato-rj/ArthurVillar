<?php

function is_route($url)
{
	return \Route::currentRouteName() == $url;
}

function subdomain($current = null)
{
	$subdomain = array_first(explode('.', request()->getHost()));

	if ($current)
		return in_array($subdomain, (array) $current);

	return $subdomain;
}

function rroute($route)
{
	return str_replace("admin.", "", route($route));
}
