@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/index.css')}}" rel="stylesheet">
    
    <!--React-->
    <div class="container">
        <div>
            <a href="/mentor">管理ページ</a> > 紐付け一覧
        </div>
        <div id="Link"></div> 
    </div>
    
    
@endsection
