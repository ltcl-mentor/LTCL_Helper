@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/link.css')}}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <div>
            <a href="/mentor">管理ページ</a> > <a href="/links/index">紐付け一覧</a> > 質問から記事への紐付け
        </div>
        <div class="table">
            <div class="cover"><h1 class="data">質問の概要</h1></div>
            <h2 class="columns">質問</h2>
            <div class="parameters">{{ $question->question }}</div>
            <h2 class="columns">コメント</h2>
            <div class="parameters">{{ $question->comment }}</div>
        </div>
        <div class="table">
            <div class="cover"><h1 class="relation">関連記事への紐付け</h1></div>
            <form action="/links/question/{{ $question->id }}" method="POST">
                @csrf
                <div class="detach">
                    <h2 class="columns">関連記事の解除</h2>
                    <p class="message">既に質問に紐づけられている記事の紐付けを解除します。</p>
                    @foreach($staffs as $staff)
                        <details>
                            <summary class="summary">{{ $staff->name }}</summary>
                            @if($related_documents)
                                @foreach($related_documents as $related_document)
                                    @if($related_document->user_id === $staff->id)
                                        <div class="document">
                                            <label><input type="checkbox" name="detach_id[]" value="{{ $related_document->id }}">{{ $related_document->title }}</label>
                                        </div>
                                    @endif
                                @endforeach
                            @endif
                        </details>
                    @endforeach
                </div>
                
                <div class="attach">
                    <h2 class="columns">関連記事を登録</h2>
                    <p class="message">新たに質問に紐づける記事を登録します。</p>
                    @foreach($staffs as $staff)
                        <details>
                            <summary class="summary">{{ $staff->name }}</summary>
                            @foreach($unrelated_documents as $unrelated_document)
                                @if($related_document->user_id === $staff->id)
                                    <div class="document">
                                        <label><input type="checkbox" name="attach_id[]" value="{{ $unrelated_document->id }}">{{ $unrelated_document->title }}</label>
                                    </div>
                                @endif
                            @endforeach
                        </details>
                    @endforeach
                </div>
                
                <div class="submit">
                    <button type="submit" class="submit_btn">確定する</button>
                </div>
            </form>
        </div>
    </div>
@endsection
