<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        
    </head>
    <body>
        <a href="/questions/index">質問の一覧に戻る</a>
        <form action="/questions/{{$question->id}}/update" method="post">
            @csrf
            <div class="category">
                <h2>カテゴリーの選択</h2>
                <label><input type="radio" name="post[category]" value="0">カリキュラム</label>
                <label><input type="radio" name="post[category]" value="1">成果物</label>
                <label><input type="radio" name="post[category]" value="{{$question->category}}" checked>変更しない（{{$category[$question->category]}}）</label>
            </div>
            <div class="genre">
                <h2>ジャンルの選択</h2>
                <div class="carriculum">
                    <label><input type="radio" name="post[genre]" value="0">AWS</label>
                    <label><input type="radio" name="post[genre]" value="1">HTML</label>
                    <label><input type="radio" name="post[genre]" value="2">CSS</label>
                    <label><input type="radio" name="post[genre]" value="3">JavaScript</label>
                    <label><input type="radio" name="post[genre]" value="4">PHP</label>
                    <label><input type="radio" name="post[genre]" value="5">Laravel</label>
                    <label><input type="radio" name="post[genre]" value="6">DB</label>
                    <label><input type="radio" name="post[genre]" value="7">Git&GitHub</label>
                </div>    
                <div class="portfolio">
                    <label><input type="radio" name="post[genre]" value="8">環境構築</label>
                    <label><input type="radio" name="post[genre]" value="9">設計図</label>
                    <label><input type="radio" name="post[genre]" value="10">デプロイ</label>
                    <label><input type="radio" name="post[genre]" value="11">API</label>
                </div>
                <label><input type="radio" name="post[genre]" value="{{$question->genre}}" checked>変更しない（{{$genre[$question->genre]}}）</label>
            </div>
            <div class="curriculum_number">
                <h2>該当カリキュラムを選択</h2>
                <select name="post[curriculum_number]" required>
                    <option value="{{$question->curriculum_number}}">{{$question->curriculum_number}}</option>
                    <option value="1-1">1-1</option>
                    <option value="2-1">2-1</option>
                    <option value="3-1">3-1</option>
                    <option value="3-2">3-2</option>
                    <option value="4-1">4-1</option>
                    <option value="5-1">5-1</option>
                    <option value="6-1">6-1</option>
                    <option value="6-2">6-2</option>
                    <option value="7-1">7-1</option>
                    <option value="8-1">8-1</option>
                    <option value="8-2">8-2</option>
                    <option value="8-3">8-3</option>
                    <option value="8-4">8-4</option>
                    <option value="8-5">8-5</option>
                    <option value="8-6">8-6</option>
                    <option value="成果物">成果物</option>
                </select>
            </div>
            <div class="question">
                <h2>質問内容を入力</h2>
                <textarea name="post[question]" placeholder="質問内容を簡潔に入力">{{$question->question}}</textarea>
            </div>
            <div class="comment">
                <h2>問題解決のヒントやコメントを入力してください。</h2>
                <textarea name="post[comment]" placeholder="あくまでもヒントにとどめるようにしてください。">{{$question->comment}}</textarea>
            </div>
            <input type="submit" value="更新">
        </form>
    </body>
</html>
