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
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-1-1',
            'question' => '.envファイルとはどのようなファイルなのでしょうか。また、どのような目的で使用されるのでしょうか？',
            'comment' => '.envファイルをいじれることは成果物を作る際に非常に重要です。下の関連記事を参考に自分なりにまとめてみましょう！',
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '5-1-1',
            'question' => 'アプリケーションキーとはなんなのでしょうか？',
            'comment' => 'アプリケーションを動かすにあたって重要な役割を持つキーです。一応キーと名前がついていますが、実際はただの文字列です。このキーの使われ方を理解するには暗号化についての知識も必要になりますので、合わせて学んでみましょう！',
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 7,
            'curriculum_number' => '6-1-2',
            'question' => "DBのユーザーへの権限付与に関して\nGRANT ALL PRIVILEGES ON blog.* to 'dbuser'@'localhost';\nと入力してもエラーが出ます。",
            'comment' => '現在自分がログインしているユーザーを確認してみましょう！権限の付与にもまた権限が必要です。',
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-2-1',
            'question' => "blogのアプリケーションを起動しても１つしか投稿が表示されません。\nすでにforeachも使ってループ処理させていますが、解説動画のように２つの表示が出ません。",
            'comment' => "一度データベースの中を覗いてみましょう！ループ処理がきちんと動いても表示が１つしか出ない場合はそもそものデータが１つしかない可能性が高いです。\n
                         DBの確認の仕方に関しては該当カリキュラムのリンクを下に貼っておきましたので参考にしてください。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 5,
            'curriculum_number' => '4-1-4',
            'question' => '任意課題について質問です。コマンドライン関数の$argvの使い方がわかりません。'."\nまた、propertyで定義しているのにUndefined variableと出てきてしまう理由がわかりません。",
            'comment' => "保留。この質問には画像をつけたい",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'question' => "inputタグのplaceholder属性とvalue属性の違いがわからないです。\nまた、oldメソッドついてもよくわからないです。",
            'comment' => "placeholderは入力欄に入力して欲しい情報の具体例や内容を表示するために用い、valueは最初から入力欄に初期値を入力した状態で表示したい時に用います。\n"
                        ."いずれにせよ入力欄に文字が表示されますが、placeholderは入力値ではないのでデータの登録時にその内容が反映されることはなく、反対にvalueで書いた内容は特に変更を加えずにフォームを送信すればそのまま入力データとして登録されます。\n"
                        ."oldメソッドに関しては登録時のデータの動きなど細かい理解が必要になるので下のの参考記事を読んでみてください。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '5-1-1',
            'question' => "Laravelアプリケーションの動作確認を行なったところ、「そのようなファイルやディレクトリはありません」と表示されるのですが、どうしたら良いですか？",
            'comment' => "ディレクトリに関して復習しましょう。この場合blog/blogというようにblogディレクトリの中にサ再度blogディレクトリを作成してしまっています。削除しましょう。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 7,
            'curriculum_number' => '6-1-1',
            'question' => "「MariaDBのインストール」の部分を実行したが、エラーが発生してしまいました。",
            'comment' => "DBの開発環境系に関して詰まった場合、自分で試行錯誤していじっても環境を壊しかねません。メンターと原因を確認した上でアンインストールして最初からやり直しましょう。\n"
                        ."また、後からコマンドが何を実行しているのかを把握しましょう。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '5-1-1',
            'question' => "エラーの意味がわかりません。workフォルダの中身を空にして実行するということですか？",
            'comment' => "lsコマンドからわかるようにenvironmentディレクトリ直下にすでにblogディレクトリが作成されているようです。\n"
                        ."blogディレクトリを削除し再度プロジェクトを作成しましょう。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 1,
            'topic' => 9,
            'curriculum_number' => '成果物',
            'question' => "Modelとマイグレーションファイルを作成ができません。",
            'comment' => "artisanコマンドを実行するディレクトリが違います。\n"
                        ."Laravelプロジェクトを作成するとそのプロジェクトディレクトリ配下に artisan というファイル名のphpファイルが作られます。\n"
                        ."php artisan ~というコマンドはartisanファイルが存在するディレクトリで実行しないと動きません。\n"
                        ."よってプロジェクトディレクトリ（今回でいうblogディレクトリ）に移動すれば実行できるようになります。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-2-1',
            'question' => "DB内のテーブルにupdated_atというカラムが存在しないとのエラーが出ます。",
            'comment' => "エラー通りテーブルのカラム名をチェックしましょう。\n"
                        ."エラー分を的確に把握し、対処することが重要です",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'question' => "バリデーションエラーメッセージが表示されません。",
            'comment' => "AWS上でアプリを表示した場合バリデーションエラーがでないことがあるようです。アプリを起動するときはGoogleなどのブラウザで行いましょう。\n"
                        ."写真のボタンを押すことで開くことができます。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '5-1-1',
            'question' => "実行中のアプリケーションのプレビューができません",
            'comment' => "[Preview (プレビュー)] => Preview Running Application (実行中のアプリケーションのプレビュー)]から表示できます。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'question' => "Google chromeでアプリをプレビューすると【VFS connection does not exist】というエラーが出てしまう。",
            'comment' => "Laravelのアプリが生成するURLがhttpsではなくhttpになってしまうことで起こるエラーです。\n"
                        ."対策として、App\Providers\AppServiceProvider クラスの boot() に\n"
                        ."\$this->app['request']->server->set('HTTPS','on');\n"
                        ."をセットすることで解決できます。Googleでプレビューしている生徒さんはご確認ください！",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 2,
            'curriculum_number' => '2-1-2',
            'question' => "画像の挿入方法がわかりません。",
            'comment' => "画像を挿入する方法には二つ通りあります。\n"
                        ."①<img>タグを使用する方法\n"
                        ."②CSSでbackground-image:url()を指定する方法\n"
                        ."です。\n"
                        ."注意点としては画像はダウンロード後imgフォルダに格納し、そこから参照したURLを使用してください。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'question' => "ルーティングをいじったあと突然404エラーが発生してしまいました。",
            'comment' => "routeの3,4行目を逆にすることで解決できます。\n"
                        ."Laravelではrouteを上から順に参照するため、一意に定まるURLほど上に書く必要があります。\n"
                        ."この場合3行目の{post}がcreateと誤認識されており4行目のルートが通っていないようです。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 1,
            'curriculum_number' => '2-1-1',
            'question' => "HTMLファイルを作成しブラウザで開いても、何も表示されません。",
            'comment' => "ファイルを一度保存してからリロードしてください",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 3,
            'curriculum_number' => '2-1-3',
            'question' => "ボタンをクリックした後、〇〇が選択されましたと表示するメソッドを実装したいが、エラーが起きる。",
            'comment' => "ボタンクリック後のイベントを発生させるトリガーが重複しているため意図した挙動ができていないようです。どちらか一つにまとめましょう。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-2-1',
            'question' => "検索結果とページネーションを同時に実装したい。",
            'comment' => "一度【検索結果 ページネーション】で検索して、それでもアイデアが浮かばなければメンターに相談しましょう。\n"
                        ."コードを書く上で誰かの作った動くものを参考にすることは重要ですし、学びも多いです。\n"
                        ."自分で色々考えるのももちろん大切ですが、必要な情報をネットから適切に持ってくるスキルはエンジニアに限らず重要ですのでそういったスキルも身につけていきましょう",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 4,
            'curriculum_number' => '3-2-1',
            'question' => "php7.3へのアップデートする際以下の写真のエラーが発生してしまいます",
            'comment' => "一度PHP実行環境のセットアップを最初からやり直しましょう。\n"
                        ."多くの方がターミナル上でのファイル編集の部分で躓いているようなので、3-1で学習したVimの操作方法をしっかり復習をしてください。\n"
                        ."Normalモード、Insertモード、Visualモードを使い分けられるようにしましょう！",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 4,
            'curriculum_number' => '3-2-1',
            'question' => "PHP7系Remiリポジトリの優先度設を行いましたが、うまくいきません。",
            'comment' => "一度PHP実行環境のセットアップを最初からやり直しましょう。\n"
                        ."多くの方がターミナル上でのファイル編集の部分で躓いているようなので、3-1で学習したVimの操作方法をしっかり復習をしてください。\n"
                        ."Normalモード、Insertモード、Visualモードを使い分けられるようにしましょう！",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 7,
            'curriculum_number' => '6-1-1',
            'question' => "DB設計環境構築においてユーザへの新規データベース権限の付与ができません",
            'comment' => "rootユーザーから新規ユーザー(dbuser)に権限を与えなくてはいけないので、rootユーザーでDBに入り直してから実行してください。\n"
                        ."また、rootユーザーと新規ユーザーの違いを復習しておきましょう。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 5,
            'curriculum_number' => '4-1-1',
            'question' => "php基礎(HelloWorld&データ型)についてうまくいきません。",
            'comment' => "IDEの対象行に出ている赤バツにカーソルを合わせてエラー内容を確認しましょう。【syntax error】はプログラミングの構文エラーを指します。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 1,
            'topic' => 9,
            'curriculum_number' => '成果物',
            'question' => "Seederが実行されません。",
            'comment' => "シーダのファイル名クラス名が正しく指定されているか確認しましょう。\nDatabaseSeeder.phpで呼び出すクラス名は〇〇TableSeederになります。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-2-1',
            'question' => "コントローラー内でモデルに記述されたメソッドが正常に呼び出せません。",
            'comment' => "今回の場合モデル内のメソッドが不完全であったためコントローラー内で返り値をを受け取れていなかったようです。\nメソッドの使い方を復習しましょう。解答は写真に記載してあります。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-2-1',
            'question' => "課題2の3でhttps://〜〜〜/postsでアクセスした時にindex.blade.phpの画面が表示されるようにするとありますが、解説や動画はhttps://〜〜〜/ にアクセスしています。どちらにすればよいのでしょうか。",
            'comment' => "indexはpostsテーブルの情報を用いたビューになるので、https://〜〜〜/posts にしておいた方が、テーブルが増えた時にわかりやすいかな、と思います。ですが、laravelを起動したときにアクセスされるのは、https://〜〜〜/ になります(いわゆるトップページ)。なので、起動するたび毎回URLの末尾にpostsを打つ必要があり少し面倒かなとも感じます。ご自分でindexが表示されるURLをわかっているならば、使いやすいほうでいいと思います。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 7,
            'curriculum_number' => '6-1-1',
            'question' => "Rootユーザーのパスワード変更でパスワード登録までは完了したのですが、画像のようにパスワード再入力するところで文字が入力できなくなってしまいました。",
            'comment' => "パスワードを入力するときは画面に文字はでません。そのまま正しいパスワードを入力し、Enterを押せばログインできます。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 8,
            'curriculum_number' => '7-1-1',
            'question' => "gitをアップデートしてもエラーになってしまいます。",
            'comment' => "No packages marked for updateとはアップデートできるパッケージがないとの意味になります。\n"
                        ."よってこれはエラーではなく、すでにgitが最新版になっているということなのでそのまま進めて構いません。\n"
                        ."エラー文をしっかり読むまたは、検索する癖をつけましょう。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-2-1',
            'question' => "投稿が複数表示されません。",
            'comment' => "DBにデータが複数入っていない可能性があります。Mysqlに入ってデータを確認しましょう。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-3-1',
            'question' => "ワイヤーフレーム作成時、下記画像のようにタイトル1をクリックすると別リンクに飛ぶようにするにはどうすれば良いでしょうか。",
            'comment' => "画像のように下にシートを追加するとlink選択時シート名が出てきます。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-1-1',
            'question' => "ブラウザの動作確認が取れません。",
            'comment' => "PostContoroller.phpとpost.php、web.phpの内容をもう一度カリキュラムと照らし合わせてください。\n"
                        ."見るべきところは\n"
                            ."①use宣言\n"
                            ."②クラス内の記述\n"
                            ."③ファイルが保存されているか\n"
                        ."です。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'question' => "ページネーションのリンクをクリックしても遷移できません。またブラウザで開くと「Oops VFS connection….」と表示されてしまいます。",
            'comment' => "アプリプレビュー時、cloud9特有のエラーが起きてしまうことがあるようです。解決方法として下記の記事の方法を実践してください。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'question' => "ブログ投稿作成画面がうまく表示されません。",
            'comment' => "次の点を確認しましょう。\n"
                        ."①viewのファイル名正しいか\n"
                        ."②routeを記載する順番が正しいか\n"
                        ."③コントローラーでviewに必要なデータが渡せているか(with()のところ)④<a>タグないのURLが正しいか",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-5-1',
            'question' => "View [posts.edit] not fund と出てページ遷移ができません。",
            'comment' => "次の点を確認しましょう。\n"
                        ."①viewの階層は正しいか\n"
                        ."②コントローラー内のview()が正しいURLを参照しているか\n"
                        ."③viewのファイル名が正しいか",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 7,
            'curriculum_number' => '6-1-1',
            'question' => "画像を保存するためAWSのクラウドサービスS3を使用していますが、設定がうまくいきません。",
            'comment' => "次の点を確認しましょう。\n"
                        ."①.env内の環境変数設定が正しいか\n"
                        ."②IAMユーザーにS3へのアクセス権が割り振られているか\n"
                        ."③config/filesystems.php内の記述は正しいか\n"
                        ."④S3のバケットにおいてアクセス権限を全てオフにしているか",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-6-1',
            'question' => "deleteボタンを押すと419エラーが発生してしまいます。",
            'comment' => "419エラーはLaravelのpost通信エラーになります。\nこの場合フォーム内でのCSRFトークンの記述忘れが考えられるので、確認してみましょう。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 7,
            'curriculum_number' => '6-1-1',
            'question' => "突然データベースに接続できなくなってしまいました。",
            'comment' => "次のNotePMを参考にしてみてください",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-6-1',
            'question' => "deleteボタンを押すとエラーが出てしまいます。",
            'comment' => "次の点を確認しましょう。\n①deleteメソッドにおいて削除後にリダイレクトするためにルーティングを設定しているか\n②フォーム内にCSRFとメソッドの設定はされているか",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '5-1-1',
            'question' => "Laravelが正常に作動しません。",
            'comment' => "Laravelのバージョンを確認しましょう。最新のバージョン8の場合カリキュラムのものと異なる場合があるためバージョン6をお勧めします。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'category' => 0,
            'topic' => 2,
            'curriculum_number' => '2-1-2',
            'question' => "cssが読み込めません。",
            'comment' => "linkタグでcssファイルの参照がうまくできていない可能性があります。\nhtmlファイルに対してcssファイルがどの階層にあるのか確認しましょう。",
            'check' => 0,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        
        // 7月1日以降から
    }
}
