<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


class RouteController extends Controller
{
    public function home()
    {
        return Inertia::render('Public/Home/Home');
    }

    public function search()
    {
        return  Inertia::render('Public/Home/Home');
    }

    public function questionCreate()
    {
        return Inertia::render('Public/Home/Home');
    }

    public function myPage()
    {
        return Inertia::render('Public/Home/Home');
    }

    public function history()
    {
        return Inertia::render('Public/Home/Home');
    }

    public function myPageAdmin()
    {
        return Inertia::render('Public/Home/Home');
    }
}
