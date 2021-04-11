@extends('layouts.app')

@section('content') 
    <form action="/documents/{{$document->id}}/update" method="post">
        @csrf
        <div class="title">
            <h2>記事のタイトル</h2>
            <input name="post[title]" type="text" value="{{$document->title}}">
            <p class="title__error" style="color:red">{{ $errors->first('post.title') }}</p>
        </div>
        <div class="link">
            <h2>記事のリンク</h2>
            <input name="post[link]" type="text" value="{{$document->link}}">
            <p class="link__error" style="color:red">{{ $errors->first('post.link') }}</p>
        </div>
        <input type="submit" value="更新">
    </form>
@endsection
