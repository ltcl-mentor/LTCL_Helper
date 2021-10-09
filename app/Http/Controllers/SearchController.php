<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    // 絞り込み検索画面表示
    public function search(Question $question)
    {
        return view('Public.Search.Condition.search');
    }
}
