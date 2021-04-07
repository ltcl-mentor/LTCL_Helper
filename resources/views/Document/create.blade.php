@extends('layouts.app')

@section('content') 
<form action="/documents/store" method="post">
    @csrf
    <div class="title">
        <h2>記事のタイトルを入力してください。</h2>
        <input name="document[title]" type="text">
    </div>
    <div class="link">
        <h2>記事のリンクを入力してください。</h2>
        <input name="document[link]" type="text">
    </div>
    <input type="submit" value="登録">
</form>
@endsection
