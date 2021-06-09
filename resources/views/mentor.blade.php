@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/mentor.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <h1 class="mentor_question_title">質問</h1>
        <div class="mentor_btns">
            <a href="/questions/index"><button class="mentor_btn question_btns">一覧</button></a>
            <a href="/questions/create"><button class="mentor_btn question_btns">新規登録</button></a>
            <a href="/questions/approval"><button class="mentor_btn question_btns">承認確認</button></a>
        </div>
        
        <h1 class="mentor_document_title">関連記事</h1>
        <div class="mentor_btns">
            <a href="/documents/index"><button class="mentor_btn document_btn">一覧</button></a>
            <a href="/documents/create"><button class="mentor_btn document_btn">新規登録</button></a>
        </div>
        
        <h1 class="mentor_document_title">記事と質問の紐付け</h1>
        <div class="mentor_btns">
            <a href="/links/index"><button class="mentor_btn links_btn">一覧</button></a>
        </div>
        
        <h1 class="mentor_list_title">名簿</h1>
        <div class="mentor_btns">
            <a href="/users/index"><button class="mentor_btn list_btn">一覧</button></a>
            <a href="/users/admin/register"><button class="mentor_btn list_btn">管理者の登録</button></a>
            <a href="/users/public/register"><button class="mentor_btn list_btn">受講生の登録</button></a>
        </div>
    </div>
    
@endsection


