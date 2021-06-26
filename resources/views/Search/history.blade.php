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
            @for($i=0; $i<=14; $i++)
            <details>
                <summary><h2 class="title">{{ date( "n月d日", strtotime($today . "-${i}day")) }}</h2></summary>
                <?php $count = 0?>
                @foreach($questions as $question)
                    @if(date( "Y-m-d", strtotime($question['whenClicked'])) === date( "Y-m-d", strtotime($today . "+${i}day")))
                        <div class="questions">
                            <div class="question">
                                <a href="/show/{{ $question->id }}">{{ $question->question }}</a>
                                <div>{{ $question->whenClicked }}</div>
                            </div>
                        </div>
                        <?php $count += 1?>
                    @endif
                @endforeach
                
                @if($count === 0)
                    <div class="emptyMessage">履歴はありません。</div>
                @endif
            </details>
            @endfor
        </div>
    </div>
@endsection
