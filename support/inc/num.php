<?php

function percentage($num, $total, $cap = null)
{
	if ($total == 0)
		return 0;

	$percent = (int)round(($num * 100) / $total);

	if ($cap)
		return $percent > $cap ? $cap : $percent;

	return $percent;
}

function randomFromArray($array = [])
{
	return $array[array_rand($array)];
}

function formatBytes($bytes) {
    $units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    $i = 0;
    while ($bytes >= 1024 && $i < count($units) - 1) {
        $bytes /= 1024;
        $i++;
    }

    return round($bytes, 2) . $units[$i];
}