<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <link rel="stylesheet" href="{{asset('css/search.css')}}"
    </head>
    <body>
        <div class="firstBox">
            <h1>該当するカテゴリーを選択します。</h1>
            <div class="selectResult">
                <div id="firstSelect" class="firstSelect"></div>
                <button id="changeCategory" class="changeCategory" onclick="changeCategory()">変更する</button>
            </div>
            <div id="categoryBox" class="categoryBox">
                <div  class="category"><label><input type="radio" name="category" id="category1" onclick="selectCategory()">カリキュラム</label></div>
                <div  class="category"><label><input type="radio" name="category" id="category2" onclick="selectCategory()">成果物</label></div>
            </div>
        </div>

        <div class="secondBox">
            <h1>関連するトピックを選択します。</h1>
            <div id="secondSelect" class="secondSelect"></div>
            <button id="changeTopic" onclick="changeTopic()">変更する</button>
            <div id="curriculumBox" class="curriculumBox">
                <div class="curriculum"><label><input type="radio" name="curriculum" id="curriculum1" onclick="selectCurriculum()">AWS</label></div>
                <div class="curriculum"><label><input type="radio" name="curriculum" id="curriculum2" onclick="selectCurriculum()">HTML</label></div>
                <div class="curriculum"><label><input type="radio" name="curriculum" id="curriculum3" onclick="selectCurriculum()">CSS</label></div>
                <div class="curriculum"><label><input type="radio" name="curriculum" id="curriculum4" onclick="selectCurriculum()">JavaScript</label></div>
                <div class="curriculum"><label><input type="radio" name="curriculum" id="curriculum5" onclick="selectCurriculum()">PHP</label></div>
                <div class="curriculum"><label><input type="radio" name="curriculum" id="curriculum6" onclick="selectCurriculum()">Laravel</label></div>
                <div class="curriculum"><label><input type="radio" name="curriculum" id="curriculum7" onclick="selectCurriculum()">DB</label></div>
                <div class="curriculum"><label><input type="radio" name="curriculum" id="curriculum8" onclick="selectCurriculum()">Git&GitHub</label></div>
            </div>

            <div id="portfolioBox" class="portfolioBox">
                <div class="portfolio"><label><input type="radio" name="portfolio" id="portfolio1" onclick="selectPortfolio()">環境構築</label></div>
                <div class="portfolio"><label><input type="radio" name="portfolio" id="portfolio2" onclick="selectPortfolio()">設計図</label></div>
                <div class="portfolio"><label><input type="radio" name="portfolio" id="portfolio3" onclick="selectPortfolio()">デプロイ</label></div>
                <div class="portfolio"><label><input type="radio" name="portfolio" id="portfolio4" onclick="selectPortfolio()">API</label></div>
            </div>
        </div>

        <div class="thirdBox">
            <h1>関連する質問はこちらです。</h1>
            <div id="resultBox">
                <div id="AWS">
                    @foreach($questions as $question)
                            @if($question->genre===0)
                                <div><a href="/show/{{$question->id}}">{{$question->question}}</a></div>
                                <div>{{$question->comment}}</div>
                                <div></div>
                            @endif
                    @endforeach
                </div>
                <div id="HTML">
                    @foreach($questions as $question)
                        @if($question->genre===1)
                            <div><a href="/show/{{$question->id}}">{{$question->question}}</a></div>
                            <div>{{$question->comment}}</div>
                        @endif
                    @endforeach
                </div>
                <div id="CSS">
                    @foreach($questions as $question)
                        @if($question->genre===2)
                            <div><a href="/show/{{$question->id}}">{{$question->question}}</a></div>
                            <div>{{$question->comment}}</div>
                        @endif
                    @endforeach
                </div>
                <div id="JavaScript">
                    @foreach($questions as $question)
                        @if($question->genre===3)
                            <div><a href="/show/{{$question->id}}">{{$question->question}}</a></div>
                            <div>{{$question->comment}}</div>
                        @endif
                    @endforeach
                </div>
                <div id="PHP">
                    @foreach($questions as $question)
                        @if($question->genre===4)
                            <div><a href="/show/{{$question->id}}">{{$question->question}}</a></div>
                            <div>{{$question->comment}}</div>
                        @endif
                    @endforeach
                </div>
                <div id="Laravel">
                    @foreach($questions as $question)
                        @if($question->genre===5)
                            <div><a href="/show/{{$question->id}}">{{$question->question}}</a></div>
                            <div>{{$question->comment}}</div>
                        @endif
                    @endforeach
                </div>
                <div id="DB">
                    @foreach($questions as $question)
                        @if($question->genre===6)
                            <div><a href="/show/{{$question->id}}">{{$question->question}}</a></div>
                            <div>{{$question->comment}}</div>
                        @endif
                    @endforeach
                </div>
                <div id="Git&GitHub">
                    @foreach($questions as $question)
                        @if($question->genre===7)
                            <div><a href="/show/{{$question->id}}">{{$question->question}}</a></div>
                            <div>{{$question->comment}}</div>
                        @endif
                    @endforeach
                </div>
                <div id="environment">
                    @foreach($questions as $question)
                        @if($question->genre===8)
                            <div><a href="/show/{{$question->id}}">{{$question->question}}</a></div>
                            <div>{{$question->comment}}</div>
                        @endif
                    @endforeach
                </div>
                <div id="blueprint">
                    @foreach($questions as $question)
                        @if($question->genre===9)
                            <div><a href="/show/{{$question->id}}">{{$question->question}}</a></div>
                            <div>{{$question->comment}}</div>
                        @endif
                    @endforeach
                </div>
                <div id="deploy">
                    @foreach($questions as $question)
                        @if($question->genre===10)
                            <div><a href="/show/{{$question->id}}">{{$question->question}}</a></div>
                            <div>{{$question->comment}}</div>
                        @endif
                    @endforeach
                </div>
                <div id="API">
                    @foreach($questions as $question)
                        @if($question->genre===11)
                            <div><a href="/show/{{$question->id}}">{{$question->question}}</a></div>
                            <div>{{$question->comment}}</div>
                        @endif
                    @endforeach
                </div>
            </div>
        </div>
        <div class="empty"></div>
    </body>
    <script lang="ja" src="{{asset('js/search.js')}}"></script>
</html>
