@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/Question/create.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <a href="/mentor">管理ページ</a> > 質問新規登録
    </div>
    
        @csrf
        <!--React-->
        <div id="Question_mentor_create"></div>
    </form>
    
@endsection
