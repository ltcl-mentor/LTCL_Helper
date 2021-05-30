@extends('layouts.app')

@section('content') 
    <!--CSS-->
    <link href="{{ asset('css/Mentor/Document/create.css')}}" rel="stylesheet">

    <!--HTML-->
    <div class="container">
        <form action="/documents/{{ $document->id }}/update" method="post">
            @csrf
            <div class="content">
                <h2 class="title">記事のタイトルを入力してください。</h2>
                <textarea name="post[title]" placeholder="制限字数は５０文字です">{{ $document->title }}</textarea>
                <p class="title__error" style="color:red">{{ $errors->first('post.title') }}</p>
            </div>
            <div class="content">
                <h2 class="title">記事のリンクを入力してください。</h2>
                <textarea name="post[link]" placeholder="URLを入力">{{ $document->link }}</textarea>
                <p class="link__error" style="color:red">{{ $errors->first('post.link') }}</p>
            </div>
            <div class="submit">
                <button type="submit">更新する</button>
            </div>
        </form>
    </div>
@endsection
