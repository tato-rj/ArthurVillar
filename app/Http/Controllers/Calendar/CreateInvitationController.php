<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;

class CreateInvitationController extends Controller
{
    public function __invoke()
    {
        return view('calendar.invitations.create');
    }
}
