<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        
    </head>
    <body>
        <a href="/mentor">トップに戻る</a>
        <div class="questions">
            <div class="checked">
                <h2>認証済み</h2>
                @foreach($questions as $question)
                    @if($question->check===1)
                        <div class="content">
                            <div class="details">
                                カテゴリー：{{$category[$question->category]}}、ジャンル：{{$genre[$question->genre]}}、該当カリキュラム：{{$question->curriculum_number}}
                            </div>
                            <div class="question">
                                {{$question->question}}
                            </div>
                            <div class="comment">
                                コメント：{{$question->comment}}
                            </div>
                            <div class="edit">
                                <a href="/questions/{{$question->id}}/edit">編集する</a>
                            </div>
                        </div>
                    @endif
                @endforeach
            </div>
            <div class="checked">
                <h2>認証待ち</h2>
                @foreach($questions as $question)
                    @if($question->check===0)
                        <div class="content">
                            <div class="details">
                                カテゴリー：{{$category[$question->category]}}、ジャンル：{{$genre[$question->genre]}}、該当カリキュラム：{{$question->curriculum_number}}
                            </div>
                            <div class="question">
                                質問：{{$question->question}}
                            </div>
                            <div class="comment">
                                コメント：{{$question->comment}}
                            </div>
                            <div class="edit">
                                <a href="/questions/{{$question->id}}/edit">編集する</a>
                            </div>
                            <div class="edit">
                                <a href="/questions/{{$question->id}}/check">承認する</a>
                            </div>
                        </div>
                    @endif
                @endforeach
            </div>
        </div>
    </body>
</html>
