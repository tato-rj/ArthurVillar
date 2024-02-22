<?php

function showtags($str)
{
	return htmlspecialchars($str);
}

function strhas($str, $needle)
{
	return strpos($str, $needle) !== false;
}

function rm_whitespaces($string)
{
	return preg_replace('/\s+/', ' ',$string);
}

function str_possessive($string) {
	return $string.'\''.($string[strlen($string) - 1] != 's' ? 's' : '');
}

function plural($word, $count)
{
	return \Str::plural($word, $count);
}

function strbetween($string, $start, $end){
    $string = ' ' . $string;
    
    $ini = strpos($string, $start);

    if ($ini == 0) return '';
    
    $ini += strlen($start);
    
    $len = strpos($string, $end, $ini) - $ini;
    
    return substr($string, $ini, $len);
}

function uuid()
{
	return (string) \Str::uuid();
}

function validUrl($url)
{
    if (!preg_match("~^(?:f|ht)tps?://~i", $url))          
        $url = "https://" . $url;

    return $url; 
}

function simpleUrl($url)
{
	return explode("?", $url)[0];
}

function datePtToUs($string)
{
	$pieces = explode('/', $string);

	if (count($pieces) == 3)
		return $pieces[1].'/'.$pieces[0].'/'.$pieces[2];
}

function monthname($number)
{
	$months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

	return $months[$number - 1];
}

function splitname($name)
{
	$array = explode(' ', $name);
	
	return ['first' => current($array), 'last' => end($array)];
}

function lastword($string)
{
	$pieces = explode(' ', $string);
	return array_pop($pieces);
}

function firstNChar($string, $count)
{
	return substr($string, 0, $count);
}

function className($path)
{
	return implode(' ',preg_split('/(?=[A-Z])/', class_basename($path)));
}
