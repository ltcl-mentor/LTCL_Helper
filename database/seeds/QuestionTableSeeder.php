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
            'title' => '.envファイルの役割がわかりません。',
            'remarks' => 'いくつかネットの記事は読んでみました。',
            'question' => ".envファイルとはどのようなファイルなのでしょうか。\nまた、どのような目的で使用されるのでしょうか？",
            'is_resolved' => true,
            'check' => true,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 2,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '5-1-1',
            'title' => 'アプリケーションキーがわかりません。',
            'remarks' => 'いくつかネットの記事は読んでみました。',
            'question' => "アプリケーションキーとはなんなのでしょうか？\nどこかで利用されているのでしょうか？",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 3,
            'category' => 0,
            'topic' => 7,
            'curriculum_number' => '6-1-2',
            'title' => 'データベースの権限付与がうまく行きません。',
            'remarks' => 'カリキュラムのコマンドの再確認やエラーコードの検索は試しました。',
            'question' => "DBのユーザーへの権限付与に関して\n```\nGRANT ALL PRIVILEGES ON blog.* to 'dbuser'@'localhost';\n```\nと入力してもエラーが出ます。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 4,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-2-1',
            'title' => 'データ表示がうまくいきません。',
            'remarks' => 'エラーコードがどこかに出ていないか、ターミナルやプレビューを確認しました。',
            'question' => "blogのアプリケーションを起動しても１つしか投稿が表示されません。\nすでにforeachも使ってループ処理させていますが、解説動画のように２つの表示が出ません。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 5,
            'category' => 0,
            'topic' => 5,
            'curriculum_number' => '4-1-4',
            'title' => '（画像なしで保留）$argvについてお聞きしたいです。',
            'remarks' => 'ネットの記事は探してみましたが、理解できませんでした。',
            'question' => '任意課題について質問です。コマンドライン関数の$argvの使い方がわかりません。'."\nまた、propertyで定義しているのにUndefined variableと出てきてしまう理由がわかりません。",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 6,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'title' => 'inputタグとoldメソッドに関してお聞きしたいです。',
            'remarks' => 'inputタグはどんな属性があるのか、oldメソッドはどんな機能か検索しましたが、理解できているか不安です。',
            'question' => "inputタグのplaceholder属性とvalue属性の違いがわからないです。\nまた、oldメソッドついてもよくわからないです。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 7,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '5-1-1',
            'title' => '（画像なしで保留）',
            'remarks' => 'test',
            'question' => "Laravelアプリケーションの動作確認を行なったところ、「そのようなファイルやディレクトリはありません」と表示されるのですが、どうしたら良いですか？",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 8,
            'category' => 0,
            'topic' => 7,
            'curriculum_number' => '6-1-1',
            'title' => '（画像なしで保留）',
            'remarks' => 'test',
            'question' => "「MariaDBのインストール」の部分を実行したが、エラーが発生してしまいました。",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 9,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '5-1-1',
            'title' => '（画像なしで保留）',
            'remarks' => 'test',
            'question' => "エラーの意味がわかりません。workフォルダの中身を空にして実行するということですか？",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 10,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-1-1',
            'title' => '（画像なしで保留）',
            'remarks' => 'test',
            'question' => "Modelとマイグレーションファイルを作成ができません。",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 11,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-2-1',
            'title' => '（画像なしで保留）',
            'remarks' => 'test',
            'question' => "DB内のテーブルにupdated_atというカラムが存在しないとのエラーが出ます。",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 12,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'title' => '（画像なしで保留）test',
            'remarks' => 'test',
            'question' => "バリデーションエラーメッセージが表示されません。",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 13,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '5-1-1',
            'title' => 'blogの動作確認ができません。',
            'remarks' => '参考になる記事は見つかりませんでした。',
            'question' => "実行中のアプリケーションのプレビューができません。\nターミナルのリンクを押しても404の画面が出てきてしまいます。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 14,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'title' => 'プレビューが開けません。',
            'remarks' => 'いじったことのない設定ファイルの話はネットにあったのですが、不安だったので質問しました。',
            'question' => "Google chromeでアプリをプレビューすると【VFS connection does not exist】というエラー画面が出てしまう。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' =>15,
            'category' => 0,
            'topic' => 2,
            'curriculum_number' => '2-1-2',
            'title' => '画像の挿入方法がわかりません。',
            'remarks' => 'カリキュラムは確認しました。',
            'question' => "カリキュラムで指示されている画像の挿入について、どのように実装すれば良いのか方法がわかりません。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 16,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'title' => '（画像なしで保留）ページ遷移で404',
            'remarks' => 'test',
            'question' => "ルーティングをいじったあと突然404エラーが発生してしまいました。",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 17,
            'category' => 0,
            'topic' => 1,
            'curriculum_number' => '2-1-1',
            'title' => 'HTMLファイルが表示できません。',
            'remarks' => 'カリキュラムやネットの記事にあったようにファイルを開きました。',
            'question' => "HTMLファイルを作成し、ブラウザで開いてみたのですが、何も表示されません。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 18,
            'category' => 0,
            'topic' => 3,
            'curriculum_number' => '2-1-3',
            'title' => '（画像なしで保留）JSのボタンクリックがうまくいかない。',
            'remarks' => 'test',
            'question' => "ボタンをクリックした後、〇〇が選択されましたと表示するメソッドを実装したいが、エラーが起きる。",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 19,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-2-1',
            'title' => '実装方法を教えて欲しいです。',
            'remarks' => '調べ方がわかりませんでした。',
            'question' => "検索結果とページネーションを同時に実装しようと思っていますが、カリキュラムでは特に習わなかったので、何かやり方があれば教えていただきたいです。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 20,
            'category' => 0,
            'topic' => 4,
            'curriculum_number' => '3-2-1',
            'title' => '（画像ないので保留）PHPのバージョンが設定できません。',
            'remarks' => 'カリキュラムの指示通りに実装しました。',
            'question' => "PHP7系Remiリポジトリの優先度設を行いましたが、うまくいきません。",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 21,
            'category' => 0,
            'topic' => 7,
            'curriculum_number' => '6-1-1',
            'title' => 'データベースでの権限付与がうまくいきません。',
            'remarks' => 'カリキュラム通りのコマンドを実行しました。',
            'question' => "DB設計環境構築において、カリキュラムの指示通りに順番にコマンドを実行したのですが、ユーザへの新規データベース権限の付与ができません",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 22,
            'category' => 0,
            'topic' => 5,
            'curriculum_number' => '4-1-1',
            'title' => '（画像なしで保留）syntaxエラー',
            'remarks' => 'test',
            'question' => "php基礎(HelloWorld&データ型)についてうまくいきません。",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 23,
            'category' => 1,
            'topic' => 19,
            'curriculum_number' => '成果物',
            'title' => 'Seederが実行されません。',
            'remarks' => 'カリキュラムや公式ドキュメントで実行コマンドは確認しました。',
            'question' => "コマンドは正しいはずなのですが、Seederがうまく実行されません。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 24,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-2-1',
            'title' => '（画像なしで保留）モデル上のメソッドの呼び出し',
            'remarks' => 'test',
            'question' => "コントローラー内でモデルに記述されたメソッドが正常に呼び出せません。",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 25,
            'category' => 0,
            'topic' => 7,
            'curriculum_number' => '6-1-1',
            'title' => '（画像なしで保留）MySQLコンソールのログインでパスワードが出ない',
            'remarks' => 'test',
            'question' => "Rootユーザーのパスワード変更でパスワード登録までは完了したのですが、画像のようにパスワード再入力するところで文字が入力できなくなってしまいました。",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 26,
            'category' => 0,
            'topic' => 8,
            'curriculum_number' => '7-1-1',
            'title' => 'gitがアップデートできません。',
            'remarks' => 'カリキュラムのコマンドを正しく実行しました。',
            'question' => "gitをアップデートしてもNo packages marked for updateというメッセージが出てきてしまいます。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 27,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-1-1',
            'title' => '（画像なしで保留）ブラウザの動作確認が取れません。',
            'remarks' => 'Laravelは問題なくインストールできていると思います。',
            'question' => "ブラウザの動作確認が取れません。",
            'is_resolved' => false,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 28,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'title' => 'ペジネーションの画面遷移がうまく行きません。',
            'remarks' => 'カリキュラム通りに実装しており、ペジネーションの実装に関してはネットで確認しても問題ありませんでした。',
            'question' => "ページネーションのリンクをクリックしても遷移できません。またブラウザで開くと「Oops VFS connection….」と表示されてしまいます。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 29,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-4-1',
            'title' => 'ブログ投稿作成画面がうまく表示されません。',
            'remarks' => 'カリキュラム通りに実装しました。',
            'question' => "何度試してもブログ投稿作成画面がうまく表示されません。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 30,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-5-1',
            'title' => 'ページ遷移がうまくいかない。',
            'remarks' => 'エラー文をネットで検索してみましたが、原因がわかりませんでした。',
            'question' => "View [posts.edit] not fund と出てページ遷移ができません。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 31,
            'category' => 1,
            'topic' => 16,
            'curriculum_number' => '成果物',
            'title' => 'S3の設定がうまくいきません。',
            'remarks' => '公式ドキュメントなどは参照してみましたが、理解できませんでした。',
            'question' => "画像を保存するためAWSのクラウドサービスS3を使用していますが、設定がうまくいきません。",
            'is_resolved' => true,
            'check' => true,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 32,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '8-6-1',
            'title' => 'deleteボタンを押すと419エラーが発生してしまいます。',
            'remarks' => '419のエラーについては確認しましたが、解決方法がわかりませんでした。',
            'question' => "カリキュラムの通りdeleteボタンを実装して、ボタンを押すと419エラーが発生してしまいます。",
            'is_resolved' => true,
            'check' => true,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 33,
            'category' => 0,
            'topic' => 6,
            'curriculum_number' => '5-1-1',
            'title' => 'Laravelをバージョン８で作ってしまいました。',
            'remarks' => 'カリキュラム通りコマンドを実行したつもりでしたが、バージョンが異なっていました。',
            'question' => "Laravelをバージョン8で作ってしまったのですが、このままカリキュラムを進めても問題ないでしょうか？",
            'is_resolved' => true,
            'check' => true,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 34,
            'category' => 0,
            'topic' => 2,
            'curriculum_number' => '2-1-2',
            'title' => 'cssが読み込めません。',
            'remarks' => 'カリキュラム再を確認しました。',
            'question' => "何度試してもcssがうまく読み込めません。",
            'is_resolved' => true,
            'check' => true,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('questions')->insert([
            'id' => 35,
            'category' => 0,
            'topic' => 3,
            'curriculum_number' => '2-1-3',
            'title' => 'jsがうまく動きません。',
            'remarks' => 'カリキュラム再を確認しました。',
            'question' => "何度ボタンをクリックしてもjsで設定した動作がうまく動きません。",
            'is_resolved' => true,
            'check' => false,
            'user_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
    }
}
