<?php

function iftrue($var = null, $echo = false)
{
	return $var && $var === true ? $echo : null;
}