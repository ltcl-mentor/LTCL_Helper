@extends('layouts.app')

@section('content') 
    <form action="/documents/store" method="post">
        @csrf
        <div class="title">
            <h2>記事のタイトルを入力してください。</h2>
            <input name="post[title]" type="text">
            <p class="title__error" style="color:red">{{ $errors->first('post.title') }}</p>
        </div>
        <div class="link">
            <h2>記事のリンクを入力してください。</h2>
            <input name="post[link]" type="text">
            <p class="link__error" style="color:red">{{ $errors->first('post.link') }}</p>
        </div>
        <input type="submit" value="登録">
    </form>
@endsection
