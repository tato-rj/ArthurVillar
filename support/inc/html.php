<?php

function formMethod($method) {
	if (in_array(strtolower($method), ['delete', 'patch']))
		return 'POST';

	return $method;
}
