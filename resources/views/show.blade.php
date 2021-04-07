<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        
    </head>
    <body>
        <a href="/">トップへ</a>
        <div class="question">
            <h2>{{$question->question}}</h2>
        </div>
        <div class="documents">
            <h2>関連記事</h2>
            @if(count($documents)!=0)
                @foreach($documents as $document)
                    <a href="{{$document->link}}">{{$document->title}}</a>
                @endforeach
            @else
                <div>関連する記事はありません。</div>
            @endif
        </div>
    </body>
</html>
