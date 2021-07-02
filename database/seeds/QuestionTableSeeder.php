<?php

use Illuminate\Database\Seeder;

class QuestionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('questions')->insert([
            'id' => 1,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-1-1',
            'question' => '.envファイルとはどのようなファイルなのでしょうか。また、どのような目的で使用されるのでしょうか？',
            'comment' => '.envファイルをいじれることは成果物を作る際に非常に重要です。下の関連記事を参考に自分なりにまとめてみましょう！',
            'check' => 0,
            'user_id' => 1,
        ]);
        DB::table('questions')->insert([
            'id' => 2,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '5-1-1',
            'question' => 'アプリケーションキーとはなんなのでしょうか？',
            'comment' => 'アプリケーションを動かすにあたって重要な役割を持つキーです。一応キーと名前がついていますが、実際はただの文字列です。このキーの使われ方を理解するには暗号化についての知識も必要になりますので、合わせて学んでみましょう！',
            'check' => 0,
            'user_id' => 1,
        ]);
        DB::table('questions')->insert([
            'id' => 3,
            'category' => 0,
            'topic' => 7,
            'curriculum_number' => '6-1-2',
            'question' => "DBのユーザーへの権限付与に関して\nGRANT ALL PRIVILEGES ON blog.* to 'dbuser'@'localhost';\nと入力してもエラーが出ます。",
            'comment' => '現在自分がログインしているユーザーを確認してみましょう！権限の付与にもまた権限が必要です。',
            'check' => 0,
            'user_id' => 1,
        ]);
        DB::table('questions')->insert([
            'id' => 4,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-2-1',
            'question' => "blogのアプリケーションを起動しても１つしか投稿が表示されません。\nすでにforeachも使ってループ処理させていますが、解説動画のように２つの表示が出ません。",
            'comment' => "一度データベースの中を覗いてみましょう！ループ処理がきちんと動いても表示が１つしか出ない場合はそもそものデータが１つしかない可能性が高いです。\n DBの確認の仕方に関しては該当カリキュラムのリンクを下に貼っておきましたので参考にしてください。",
            'check' => 0,
            'user_id' => 1,
        ]);
        DB::table('questions')->insert([
            'id' => 5,
            'category' => 0,
            'topic' => 5,
            'curriculum_number' => '4-1-4',
            'question' => '任意課題について質問です。コマンドライン関数の$argvの使い方がわかりません。'."\nまた、propertyで定義しているのにUndefined variableと出てきてしまう理由がわかりません。",
            'comment' => "保留。この質問には画像をつけたい",
            'check' => 0,
            'user_id' => 1,
        ]);
        DB::table('questions')->insert([
            'id' => 6,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'question' => "inputタグのplaceholder属性とvalue属性の違いがわからないです。\nまた、oldメソッドついてもよくわからないです。",
            'comment' => "placeholderは入力欄に入力して欲しい情報の具体例や内容を表示するために用い、valueは最初から入力欄に初期値を入力した状態で表示したい時に用います。\n
                          いずれにせよ入力欄に文字が表示されますが、placeholderは入力値ではないのでデータの登録時にその内容が反映されることはなく、反対にvalueで書いた内容は特に変更を加えずにフォームを送信すればそのまま入力データとして登録されます。\n
                          oldメソッドに関しては登録時のデータの動きなど細かい理解が必要になるので下のの参考記事を読んでみてください。",
            'check' => 0,
            'user_id' => 1,
        ]);
        
        // 4月5日以降から
    }
}
