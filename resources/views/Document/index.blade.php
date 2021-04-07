<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        
    </head>
    <body>
        <a href="/mentor">トップに戻る</a>
        <div class="documents">
            @foreach($documents as $document)
                <div class="document">
                    <h2><a href="{{$document->link}}">・{{$document->title}}</a></h2>
                </div>
                <div class="edit">
                    <a href="/documents/{{$document->id}}/edit">編集する</a>
                </div>
            @endforeach
        </div>
    </body>
</html>
