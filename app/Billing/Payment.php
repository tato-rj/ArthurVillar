<?php

namespace App\Billing;

class Payment
{
	public function methods()
	{
		return ['Venmo', 'Zelle', 'Cash/check'];
	}

	public function usd($cents)
	{
		return '$' . round($cents/100);
	}
}