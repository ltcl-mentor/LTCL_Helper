@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/link.css')}}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <div>
            <a href="/mentor">管理ページ</a> > <a href="/links/index">紐付け一覧</a> > 記事から質問への紐付け
        </div>
        <div class="table">
            <div class="cover"><h1 class="data">記事の概要</h1></div>
            <h2 class="columns">記事タイトル</h2>
            <div class="parameters">{{ $document->title }}</div>
            <h2 class="columns">記事URL</h2>
            <div class="parameters">
                <a href={{ $document->link }} target="_blank">{{ $document->link }}</a>
            </div>
        </div>
        <div class="table">
            <div class="cover"><h1 class="relation">関連記事への紐付け</h1></div>
            <form action="/links/document/{{ $document->id }}" method="POST">
                @csrf
                <div class="detach">
                    <h2 class="columns">関連質問の解除</h2>
                    <p class="message">既に記事に紐づけられている質問の紐付けを解除します。</p>
                    @for($i=0;$i<=12;$i++)
                        <details>
                            <summary class="summary">{{ $topic[$i] }}</summary>
                            @foreach($related_questions as $related_question)
                                @if($related_question->topic === $i)
                                    <div class="question">
                                        <label><input type="checkbox" name="detach_id[]" value="{{ $related_question->id }}">{{ $related_question->question }}</label>
                                    </div>
                                @endif
                            @endforeach
                        </details>
                    @endfor
                </div>
                
                <div class="attach">
                    <h2 class="columns">関連質問を登録</h2>
                    <p class="message">新たに記事に紐づける質問を登録します。</p>
                    @for($i=0;$i<=12;$i++)
                        <details>
                            <summary class="summary">{{ $topic[$i] }}</summary>
                            @foreach($unrelated_questions as $unrelated_question)
                                @if($unrelated_question->topic === $i)
                                    <div class="question">
                                        <label><input type="checkbox" name="attach_id[]" value="{{ $unrelated_question->id }}">{{ $unrelated_question->question }}</label>
                                    </div>
                                @endif
                            @endforeach
                        </details>
                    @endfor
                </div>
                
                <div class="submit">
                    <button type="submit" class="submit_btn">確定する</button>
                </div>
            </form>
        </div>
    </div>
    
@endsection
