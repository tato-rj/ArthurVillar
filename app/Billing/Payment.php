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

	public function cents($dollars): ?int
	{
		$dollars = preg_replace('/[^0-9.]/', '', (string) $dollars);

		return $dollars === '' ? null : (int) round((float) $dollars * 100);
	}
}
