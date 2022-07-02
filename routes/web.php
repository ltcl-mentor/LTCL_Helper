<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RouteController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// auth関連のルーティング
require __DIR__.'/auth.php';

// welcomeとダッシュボード
// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// })->middleware(['auth']);

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


// フロントエンドのルーティング
Route::get('/lockout', function () {
    return Inertia::render('Common/Lockout');
})->name('lockout'); // ロックアウト画面

Route::group(['middleware' => ['auth']], function () {
    /**
     * ホーム関連
     */
    Route::get('/', [RouteController::class, 'home'])->name('home'); // ホーム画面
    Route::get('/?page=qa', [RouteController::class, 'search'])->name('search'); // 検索画面

    /**
     * 質問関連
     */
    Route::get('/public/questions/create', [RouteController::class, 'questionCreate'])->name('question.create'); // 質問投稿画面

    /**
     * その他
     */
    Route::get('/my_page', [RouteController::class, 'myPage']); // マイページ
    Route::get('/history', [RouteController::class, 'history'])->name('history'); // 質問閲覧履歴

    /**
     * 管理者限定
     */
    Route::group(['middleware' => ['administrator']], function () {
        Route::get('/Admin_my_page', [RouteController::class, 'myPageAdmin']); // 管理者マイページ
    });
});


// 元のルーティング
// ユーザーロックアウト画面
// Route::get('/lockout', 'Auth\LoginController@lockout');

/**
 * コメントアウトしているルーティングはReact Routerに移行したので
 * resources/js/components/Route.js
 * を確認してください
 */
Route::group(['middleware' => ['auth']], function () {

    // /**
    //  * ログイン済みユーザーのみアクセス可能
    //  */
    // Route::post('/questions/store', 'QuestionController@store'); // 新規作成実行
    // Route::post('/questions/image/store', 'QuestionController@imageStore'); // 質問の画像保存処理
    // Route::post('/questions/{question}/record', 'QuestionController@recordShow'); // 質問詳細画面のユーザ閲覧履歴記録処理
    // Route::post('/questions/{question}/resolved', 'QuestionController@resolved'); // 質問のステータス変更処理(質問解決)
    // Route::post('/questions/{question}/status', 'QuestionController@status'); // 質問のステータス変更処理（未対応、対応中、解決済み、要対応）
    // Route::post('/comments/store', 'CommentController@store'); // 質問へのコメント保存処理
    // Route::post('/comments/{comment}/update', 'CommentController@update'); // 質問へのコメント更新処理
    // Route::post('/comments/{comment}/delete', 'CommentController@delete'); // 質問へのコメント削除処理
    // Route::post('/contact', 'ContactController@sendContactMessage'); // お問い合わせ内容送信処理


    // /**
    //  * 以下のurlはreact上で非同期通信として利用
    //  */
    // Route::get('react/history', 'HomeController@getHistory'); // ログインユーザの閲覧した質問のデータ受け渡し
    // Route::get('react/question/mypage/{question}', 'ReactController@getMyQuestion'); // 公開中の個別質問データの受け渡し
    // Route::get('react/question/checked/{question}', 'ReactController@getCheckedQuestion'); // 公開中の個別質問データの受け渡し
    // Route::get('react/questions/checked', 'ReactController@getCheckedQuestions'); // 公開中の質問受け渡し
    // Route::get('react/questions/search', 'ReactController@getSearchQuestions'); // 質問検索結果の受け渡し
    // Route::get('react/questions/search/paginate', 'ReactController@getSearchQuestionsPaginate'); // 質問検索結果の受け渡しのペじネーション
    // Route::get('react/questions/mine', 'ReactController@getMyQuestions'); // ログインユーザの質問一覧受け渡し
    // Route::get('react/documents/all', 'ReactController@getAllDocuments'); // 全記事受け渡し
    // Route::get('react/documents/related/{question}', 'ReactController@getRelatedDocuments'); // 質問に紐づいている記事の受け渡し
    // Route::get('react/documents/related/paginate/{category}', 'ReactController@getRelatedDocumentsPaginate'); // カテゴリーに紐づいている記事の受け渡し
    // Route::get('react/user', 'ReactController@getUser'); // ログインユーザー受け渡し
    // Route::get('react/weather', 'ReactController@getWeather'); // 今日の天気のデータ受け渡し
    // Route::get('react/college/{year}/{month}/{date}', 'ReactController@getCollegeData'); // 校舎に関するデータ受け渡し
    // Route::get('react/infos', 'ReactController@getInfos'); // お知らせのデータ受け渡し
    // Route::get('react/home', 'ReactController@getHomeData'); // Google Map APIのAPIキーとzoomリンク一覧ページへのurl受け渡し
    // Route::get('react/index', 'ReactController@getQuestionArticle'); // Google Map APIのAPIキーとzoomリンク一覧ページへのurl受け渡し


    // /**
    //  *  管理者権限を持っているユーザーのみがアクセス可能
    //  */
    // Route::group(['middleware' => ['administrator']], function () {

    //     /**
    //      *  トップ画面
    //      */
    //     Route::post('/informations/store', 'HomeController@storeInfo'); // お知らせの登録
    //     Route::post('/informations/{info}/delete', 'HomeController@deleteInfo'); // お知らせの削除

    //     /**
    //      * 参考記事
    //      */
    //     Route::post('/documents/store', 'DocumentController@store'); // 新規作成実行
    //     Route::post('/documents/{document}/update', 'DocumentController@update'); // 編集実行
    //     Route::post('/documents/{document}/delete','DocumentController@delete'); // 削除実行


    //     /**
    //      * 質問と参考記事の紐付け
    //      */
    //     Route::post('/links/document/{document}', 'LinkController@linkQuestionsFromDocument'); // 紐付け実行(記事：質問＝１：多)
    //     Route::post('/links/question/{question}', 'LinkController@linkDocumentsFromQuestion'); // 紐付け実行(記事：質問＝多：1)

    //     Route::post('/link/question/{question}', 'LinkController@linkDocumentToQuestion');


    //     /**
    //      * 質問
    //      */
    //     Route::get('/questions/export', 'QuestionController@questionsExport');
    //     Route::post('/questions/backup', 'QuestionController@backup'); // 質問一括登録（バックアップ復元用）
    //     Route::post('/questions/{question}/check', 'QuestionController@check'); // 承認実行
    //     Route::post('/questions/{question}/uncheck', 'QuestionController@uncheck'); // 承認解除実行
    //     Route::post('/questions/{question}/update', 'QuestionController@update'); // 編集実行
    //     Route::post('/questions/{question}/delete', 'QuestionController@delete'); // 削除実行


    //     /**
    //      * ユーザー
    //      */
    //     Route::post('/users/backup', 'UserController@backup'); // 受講生一括登録（バックアップ復元用）
    //     Route::post('/users/public/register', 'Auth\RegisterController@publicRegister'); // 受講生の新規作成実行
    //     Route::post('/users/admin/register', 'Auth\RegisterController@register'); // 管理者の新規作成実行
    //     Route::post('/users/{user}/delete', 'UserController@delete'); // 削除実行
    //     Route::post('/users/{user}/unlock', 'UserController@unlock'); // ユーザロック解除実行

    //     /**
    //      * イベント
    //      */
    //     Route::post('/events/store', 'HomeController@storeEvent'); // イベントの新規作成実行
    //     Route::post('/events/{event}/update', 'HomeController@updateEvent'); // イベントの編集
    //     Route::post('/events/{event}/delete', 'HomeController@deleteEvent'); // イベントの編集

    //     /**
    //      * Reactでのデータ受け渡し（全て非同期）
    //      */
    //     Route::get('react/all/questions', 'ReactController@getAllQuestions'); // 全質問受け渡し
    //     Route::get('react/questions/mentor', 'ReactController@getQuestionsForMentor'); // 対応が必要な質問の受け渡し
    //     Route::get('react/question/{question}', 'ReactController@getQuestion'); // 個別質問データの受け渡し
    //     Route::get('react/questions/counts', 'ReactController@getQuestionYetCounts'); // 未解決でメンターまたは受講生のコメント入力待ちの件数受け渡し
    //     Route::get('react/questions/curriculum', 'ReactController@getCurriculumQuestions'); // カリキュラム範囲の質問受け渡し
    //     Route::get('react/questions/portfolio', 'ReactController@getPortfolioQuestions'); // 成果物範囲の質問受け渡し
    //     Route::get('react/questions/{document}', 'LinkController@getQuestionsFromDocument'); // 単体記事に関する質問データの受け渡し
    //     Route::get('react/questions/mentor_yet/{category}', 'ReactController@getMentorYetCommentQuestions'); // カテゴリーに応じたメンターコメント待ちの質問受け渡し
    //     Route::get('react/questions/student_yet/{category}', 'ReactController@getStudentYetCommentQuestions'); // カテゴリーに応じた受講生コメント待ちの質問受け渡し
    //     Route::get('react/document/{document}', 'ReactController@getDocument'); // 個別記事データの受け渡し
    //     Route::get('react/documents/{question}', 'LinkController@getDocumentsFromQuestion'); // 単体質問に関する記事データの受け渡し
    //     Route::get('react/related/questions/{document}', 'ReactController@getRelatedQuestions'); // 記事に紐づいている質問の受け渡し（URLが紛らわしい
    //     Route::get('react/mentor', 'ReactController@getAllMentorInfo'); // イベントの受け渡し
    //     Route::get('react/event/{event}', 'ReactController@getOneEvent'); // イベントの受け渡し
    //     Route::get('react/reaction', 'ReactController@getReaction'); // slackのリアクション参考サイトのURL受け渡し
    //     Route::get('react/id', 'ReactController@getUserId'); // ログインユーザーid受け渡し
    // });
});
