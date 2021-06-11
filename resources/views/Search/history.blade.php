@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Search/history.css')}}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <div class="center">
            <h1>閲覧履歴</h1>
        </div>
        
        
        <div class="content">
            <details>
                <summary><h2 class="title">今日</h2></summary>
                @if($today_histories)
                    <div class="questions">
                        @foreach($today_histories as $today_history)
                            <div class="question">
                                <a href="/show/{{ $today_history->id }}">{{ $today_history->question }}</a>
                                <div>{{ $today_history->whenClicked }}</div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <div class="emptyMessage">履歴はありません。</div>
                @endif
            </details>
        </div>
        
        
        <div class="content">
            <details>
                <summary><h2 class="title">過去１週間</h2></summary>
                @if($last_week_histories)
                    <div class="questions">
                        @foreach($last_week_histories as $last_week_history)
                            <div class="question">
                                <a href="/show/{{ $last_week_history->id }}">{{ $last_week_history->question }}</a>
                                <div>{{ $last_week_history->whenClicked }}</div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <div class="emptyMessage">履歴はありません。</div>
                @endif
            </details>
        </div>
        
        <div class="content">
            <details>
                <summary><h2 class="title">過去１ヶ月</h2></summary>
                @if($last_month_histories)
                    <div class="questions">
                        @foreach($last_month_histories as $last_month_history)
                            <div class="question">
                                <a href="/show/{{ $last_month_history->id }}">{{ $last_month_history->question }}</a>
                                <div>{{ $last_month_history->whenClicked }}</div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <div class="emptyMessage">履歴はありません。</div>
                @endif
            </details>
        </div>
    </div>
@endsection
