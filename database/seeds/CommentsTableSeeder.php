<?php

use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('comments')->insert([
            'comment' => '.envファイルをいじれることは成果物を作る際に非常に重要です。下の関連記事を参考に自分なりにまとめてみましょう！',
            'question_id' => 1,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => true,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => 'アプリケーションを動かすにあたって重要な役割を持つキーです。一応キーと名前がついていますが、実際はただの文字列です。このキーの使われ方を理解するには暗号化についての知識も必要になりますので、合わせて学んでみましょう！',
            'question_id' => 2,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => '現在自分がログインしているユーザーを確認してみましょう！権限の付与にもまた権限が必要です。',
            'question_id' => 3,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "一度データベースの中を覗いてみましょう！ループ処理がきちんと動いても表示が１つしか出ない場合はそもそものデータが１つしかない可能性が高いです。\n
                         DBの確認の仕方に関しては該当カリキュラムのリンクを下に貼っておきましたので参考にしてください。",
            'question_id' => 4,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "保留。この質問には画像をつけたい",
            'question_id' => 5,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "placeholderは入力欄に入力して欲しい情報の具体例や内容を表示するために用い、valueは最初から入力欄に初期値を入力した状態で表示したい時に用います。\n"
                        ."いずれにせよ入力欄に文字が表示されますが、placeholderは入力値ではないのでデータの登録時にその内容が反映されることはなく、反対にvalueで書いた内容は特に変更を加えずにフォームを送信すればそのまま入力データとして登録されます。\n"
                        ."oldメソッドに関しては登録時のデータの動きなど細かい理解が必要になるので下のの参考記事を読んでみてください。",
            'question_id' => 6,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "ディレクトリに関して復習しましょう。この場合blog/blogというようにblogディレクトリの中にサ再度blogディレクトリを作成してしまっています。削除しましょう。",
            'question_id' => 7,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "DBの開発環境系に関して詰まった場合、自分で試行錯誤していじっても環境を壊しかねません。メンターと原因を確認した上でアンインストールして最初からやり直しましょう。\n"
                        ."また、後からコマンドが何を実行しているのかを把握しましょう。",
            'question_id' => 8,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "lsコマンドからわかるようにenvironmentディレクトリ直下にすでにblogディレクトリが作成されているようです。\n"
                        ."blogディレクトリを削除し再度プロジェクトを作成しましょう。",
            'question_id' => 9,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "artisanコマンドを実行するディレクトリが違います。\n"
                        ."Laravelプロジェクトを作成するとそのプロジェクトディレクトリ配下に artisan というファイル名のphpファイルが作られます。\n"
                        ."php artisan ~というコマンドはartisanファイルが存在するディレクトリで実行しないと動きません。\n"
                        ."よってプロジェクトディレクトリ（今回でいうblogディレクトリ）に移動すれば実行できるようになります。",
            'question_id' => 10,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "エラー通りテーブルのカラム名をチェックしましょう。\n"
                        ."エラー分を的確に把握し、対処することが重要です",
            'question_id' => 11,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "AWS上でアプリを表示した場合バリデーションエラーがでないことがあるようです。アプリを起動するときはGoogleなどのブラウザで行いましょう。\n"
                        ."写真のボタンを押すことで開くことができます。",
            'question_id' => 12,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "[Preview (プレビュー)] => Preview Running Application (実行中のアプリケーションのプレビュー)]から表示できます。",
            'question_id' => 13,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "Laravelのアプリが生成するURLがhttpsではなくhttpになってしまうことで起こるエラーです。\n"
                        ."対策として、App\Providers\AppServiceProvider クラスの boot() に\n"
                        ."\$this->app['request']->server->set('HTTPS','on');\n"
                        ."をセットすることで解決できます。Googleでプレビューしている生徒さんはご確認ください！",
            'question_id' => 14,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "画像を挿入する方法には二つ通りあります。\n"
                        ."①<img>タグを使用する方法\n"
                        ."②CSSでbackground-image:url()を指定する方法\n"
                        ."です。\n"
                        ."注意点としては画像はダウンロード後imgフォルダに格納し、そこから参照したURLを使用してください。",
            'question_id' => 15,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "routeの3,4行目を逆にすることで解決できます。\n"
                        ."Laravelではrouteを上から順に参照するため、一意に定まるURLほど上に書く必要があります。\n"
                        ."この場合3行目の{post}がcreateと誤認識されており4行目のルートが通っていないようです。",
            'question_id' => 16,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "ファイルを一度保存してからリロードしてください",
            'question_id' => 17,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "ボタンクリック後のイベントを発生させるトリガーが重複しているため意図した挙動ができていないようです。どちらか一つにまとめましょう。",
            'question_id' => 18,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "一度【検索結果 ページネーション】で検索して、それでもアイデアが浮かばなければメンターに相談しましょう。\n"
                        ."コードを書く上で誰かの作った動くものを参考にすることは重要ですし、学びも多いです。\n"
                        ."自分で色々考えるのももちろん大切ですが、必要な情報をネットから適切に持ってくるスキルはエンジニアに限らず重要ですのでそういったスキルも身につけていきましょう",
            'question_id' => 19,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "一度PHP実行環境のセットアップを最初からやり直しましょう。\n"
                        ."多くの方がターミナル上でのファイル編集の部分で躓いているようなので、3-1で学習したVimの操作方法をしっかり復習をしてください。\n"
                        ."Normalモード、Insertモード、Visualモードを使い分けられるようにしましょう！",
            'question_id' => 20,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "一度PHP実行環境のセットアップを最初からやり直しましょう。\n"
                        ."多くの方がターミナル上でのファイル編集の部分で躓いているようなので、3-1で学習したVimの操作方法をしっかり復習をしてください。\n"
                        ."Normalモード、Insertモード、Visualモードを使い分けられるようにしましょう！",
            'question_id' => 21,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "rootユーザーから新規ユーザー(dbuser)に権限を与えなくてはいけないので、rootユーザーでDBに入り直してから実行してください。\n"
                        ."また、rootユーザーと新規ユーザーの違いを復習しておきましょう。",
            'question_id' => 22,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "IDEの対象行に出ている赤バツにカーソルを合わせてエラー内容を確認しましょう。【syntax error】はプログラミングの構文エラーを指します。",
            'question_id' => 23,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "シーダのファイル名クラス名が正しく指定されているか確認しましょう。\nDatabaseSeeder.phpで呼び出すクラス名は〇〇TableSeederになります。",
            'question_id' => 24,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "今回の場合モデル内のメソッドが不完全であったためコントローラー内で返り値をを受け取れていなかったようです。\nメソッドの使い方を復習しましょう。解答は写真に記載してあります。",
            'question_id' => 25,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "indexはpostsテーブルの情報を用いたビューになるので、https://〜〜〜/posts にしておいた方が、テーブルが増えた時にわかりやすいかな、と思います。ですが、laravelを起動したときにアクセスされるのは、https://〜〜〜/ になります(いわゆるトップページ)。なので、起動するたび毎回URLの末尾にpostsを打つ必要があり少し面倒かなとも感じます。ご自分でindexが表示されるURLをわかっているならば、使いやすいほうでいいと思います。",
            'question_id' => 26,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "パスワードを入力するときは画面に文字はでません。そのまま正しいパスワードを入力し、Enterを押せばログインできます。",
            'question_id' => 27,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "No packages marked for updateとはアップデートできるパッケージがないとの意味になります。\n"
                        ."よってこれはエラーではなく、すでにgitが最新版になっているということなのでそのまま進めて構いません。\n"
                        ."エラー文をしっかり読むまたは、検索する癖をつけましょう。",
            'question_id' => 28,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "DBにデータが複数入っていない可能性があります。Mysqlに入ってデータを確認しましょう。",
            'question_id' => 29,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "画像のように下にシートを追加するとlink選択時シート名が出てきます。",
            'question_id' => 30,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "PostContoroller.phpとpost.php、web.phpの内容をもう一度カリキュラムと照らし合わせてください。\n"
                        ."見るべきところは\n"
                            ."①use宣言\n"
                            ."②クラス内の記述\n"
                            ."③ファイルが保存されているか\n"
                        ."です。",
            'question_id' => 31,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "次の点を確認しましょう。\n"
                        ."①.env内の環境変数設定が正しいか\n"
                        ."②IAMユーザーにS3へのアクセス権が割り振られているか\n"
                        ."③config/filesystems.php内の記述は正しいか\n"
                        ."④S3のバケットにおいてアクセス権限を全てオフにしているか",
            'question_id' => 1,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "アプリプレビュー時、cloud9特有のエラーが起きてしまうことがあるようです。解決方法として下記の記事の方法を実践してください。",
            'question_id' => 32,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "次の点を確認しましょう。\n"
                        ."①viewのファイル名正しいか\n"
                        ."②routeを記載する順番が正しいか\n"
                        ."③コントローラーでviewに必要なデータが渡せているか(with()のところ)④<a>タグないのURLが正しいか",
            'question_id' => 33,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "次の点を確認しましょう。\n"
                        ."①viewの階層は正しいか\n"
                        ."②コントローラー内のview()が正しいURLを参照しているか\n"
                        ."③viewのファイル名が正しいか",
            'question_id' => 34,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "419エラーはLaravelのpost通信エラーになります。\nこの場合フォーム内でのCSRFトークンの記述忘れが考えられるので、確認してみましょう。",
            'question_id' => 35,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "次のNotePMを参考にしてみてください",
            'question_id' => 36,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "次の点を確認しましょう。\n①deleteメソッドにおいて削除後にリダイレクトするためにルーティングを設定しているか\n②フォーム内にCSRFとメソッドの設定はされているか",
            'question_id' => 37,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "Laravelのバージョンを確認しましょう。最新のバージョン8の場合カリキュラムのものと異なる場合があるためバージョン6をお勧めします。",
            'question_id' => 38,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "linkタグでcssファイルの参照がうまくできていない可能性があります。\nhtmlファイルに対してcssファイルがどの階層にあるのか確認しましょう。",
            'question_id' => 39,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 0,
            'is_mentor_commented' => false,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "ちょっと長めのテストデータ。\nあああああああああああああああああああああああああああああああああああああああああああああああああ",
            'question_id' => 40,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('comments')->insert([
            'comment' => "ちょっと長めのテストデータ。\niiiiiiiiiiiiあああああああああああああああああああああああああああああああああああああああ",
            'question_id' => 41,
            'user_id' => 1,
            'is_staff' => true,
            'comment_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
    }
}
