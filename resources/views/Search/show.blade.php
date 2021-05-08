<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>LTCL Helper</title>

    <!-- Scripts -->
    <!--<script src="{{ asset('js/app.js') }}" defer></script>-->

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('css/searchShow.css')}}">
</head>
    <body>
        <div id="app">
            <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div class="container">
                    <a class="navbar-brand" href="{{ url('/') }}">
                        LTCL Helper Manager
                    </a>
                </div>
            </nav>
            
            <main class="py-4">
                <div class="box">
                    @if($question->check===1)
                        <div class="question">
                            <h1 class="title">質問概要</h1>
                            <div class="table" >
                                <div>
                                    <div class="columns category_column">カテゴリー</div>
                                    <div class="parameters category_parameter">{{$category[$question->category]}}</div>
                                    <div class="columns topic_column">トピック</div>
                                    <div class="parameters topic_parameter">{{$genre[$question->genre]}}</div>
                                    <div class="columns curriculum_number_column">カリキュラム番号</div>
                                    <div class="parameters curriculum_number_parameter">{{$question->curriculum_number}}</div>
                                </div>
                                <div>
                                    <div class="columns question_column">質問内容</div>
                                    <div class="parameters question_parameter">{{$question->question}}</div>
                                </div>
                                <div>
                                    <div class="columns comment_column">メンターからのコメント</div>
                                    <div class="parameters comment_parameter">{{$question->comment}}</div>
                                </div>
                            </div>
                            </table>
                        </div>
                        
                        <div class="documents">
                            <h1 class="title">関連記事</h1>
                            @if(count($documents)!=0)
                                @foreach($documents as $document)
                                    <div class="document">
                                        <div class="document_title">{{$document->title}}</div>
                                        <a href="{{$document->link}}" class="document_link">記事を読む</a>
                                    </div>
                                @endforeach
                            @else
                                <div class="noDocument">関連する記事はありません。</div>
                            @endif
                        </div>
                    @else
                        <div>この記事は閲覧できません。</div>
                    @endif
                </div>
            </main>
        </div>
        
    </body>
</html>
