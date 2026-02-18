<?php

function iftrue($var = null, $echo)
{
	return $var && $var === true ? $echo : null;
}