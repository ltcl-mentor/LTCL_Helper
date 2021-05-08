<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Question;
use App\Http\Controllers\Controller;

class ReactController extends Controller
{
    public function index()
    {
        return Question::where('check',1)->get();
    }
    
}
