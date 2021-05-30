@extends('layouts.app')

@section('content')    
    <!--CSS-->
    <link rel="stylesheet" href="{{ asset('css/Search/show.css') }}">
    
    <!--HTML-->
    <div class="box">
        @if($question->check===1)
            <h1 class="title">質問概要</h1>
            <div class="question">
                <div class="table">
                    <div>
                        <div class="columns category_column">カテゴリー</div>
                        <div class="parameters category_parameter">{{ $category[$question->category] }}</div>
                        <div class="columns topic_column">トピック</div>
                        <div class="parameters topic_parameter">{{ $topic[$question->topic] }}</div>
                        <div class="columns curriculum_number_column">カリキュラム番号</div>
                        <div class="parameters curriculum_number_parameter">{{ $question->curriculum_number }}</div>
                    </div>
                </div>
                            
                <div class="illusts">
                    <div class="question_illust">
                        <img class="student_img" src="{{ asset('images/pose_english_shrug_man.png') }}">
                        <div class="question_balloon">{{ $question->question }}</div>
                    </div>
                    <div class="comment_illust">
                        <img class="mentor_img" src="{{ asset('images/images.jpg') }}">
                        <div class="comment_balloon">{{ $question->comment }}</div>
                    </div>
                </div>
            </div>
                        
            <h1 class="title">関連記事</h1>
            <div class="documents">
                @if(count($documents)!=0)
                    @foreach($documents as $document)
                        <a href="{{ $document->link }}" class="document">
                            <img class="document_img" src="{{ asset('images/NotePM_Logo_Vertical.png') }}">
                            <div class="document_title">{{ $document->title }}</div>
                        </a>
                    @endforeach
                @else
                    <div class="noDocument">関連する記事はありません。</div>
                @endif
            </div>
        @else
            <div>この記事は閲覧できません。</div>
        @endif
    </div>
@endsection
