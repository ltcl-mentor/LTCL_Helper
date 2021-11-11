<?php

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

// registerページのデフォルトルーティングを無効化
// registerは下部で個別に定義
Auth::routes([
    'register' => false, 
    'reset' => false,
]);

Route::group(['middleware' => ['auth']], function () {
    
    // ログイン済みユーザーのみアクセス可能
    // Route::get('/', 'HomeController@home'); // トップ画面表示
    // Route::get('/search/condition', 'SearchController@search'); // 絞り込み検索画面表示
    // Route::get('/questions/index/public', 'QuestionController@publicIndex'); // 公開中の質問一覧表示
    // Route::get('/questions/create/public', 'QuestionController@publicCreate'); // 受講生の質問投稿画面表示
    Route::post('/questions/store/public', 'QuestionController@publicStore'); // 受講生の質問投稿処理
    // Route::get('/questions/{question}/public', 'QuestionController@publicShow'); // 質問詳細画面表示
    // Route::get('/documents/index/public', 'DocumentController@publicIndex'); // 公開中の参考記事一覧表示
    Route::get('/history', 'HomeController@history'); // 履歴画面表示
    Route::get('/contact/create', 'ContactController@create'); // お問い合わせ画面表示
    Route::post('/contact/post', 'ContactController@post'); // お問い合わせ内容送信処理
    
    // 'react/'から始まるurlはreact上で非同期通信として利用
    Route::get('react/search/questions', 'ReactController@getSearchQuestions'); // 質問検索結果の受け渡し
    Route::get('react/checked/questions', 'ReactController@getCheckedQuestions'); // 公開中の質問受け渡し
    Route::get('react/checked/question/{question}', 'ReactController@getCheckedQuestion'); // 公開中の個別質問データの受け渡し
    Route::get('react/images/{question_id}', 'ReactController@getImages'); // 質問に関連する画像の受け渡し
    Route::get('react/related/documents/{question}', 'ReactController@getRelatedDocuments'); // 質問に紐づいている記事の受け渡し
    Route::get('react/user', 'ReactController@getUser'); // ログインユーザー受け渡し
    Route::get('react/weather', 'ReactController@getWeather'); // 今日の天気のデータ受け渡し
    Route::get('react/college/{year}/{month}/{date}', 'ReactController@getCollegeData'); // 校舎に関するデータ受け渡し
    Route::get('react/infos', 'ReactController@getInfos'); // お知らせのデータ受け渡し
    
    
    // 管理者権限を持っているユーザーのみがアクセス可能
    Route::group(['middleware' => ['administrator']], function () {
        
        // トップ画面
        Route::post('/informations', 'HomeController@storeInfo'); // お知らせの登録
        Route::post('/informations/{info}/delete', 'HomeController@deleteInfo'); // お知らせの削除
        
        // 管理画面表示
        // Route::get('/mentor', 'HomeController@mentorTop'); // メンター管理画面表示
        
        // 参考記事
        // Route::get('/documents/index', 'DocumentController@index'); // 初期画面表示
        // Route::get('/documents/create', 'DocumentController@create'); // 新規作成画面表示
        Route::post('/documents/store', 'DocumentController@store'); // 新規作成実行
        // Route::get('/documents/{document}', 'DocumentController@show'); // 詳細画面表示
        // Route::get('/documents/{document}/edit', 'DocumentController@edit'); // 編集画面表示
        Route::post('/documents/{document}/update', 'DocumentController@update'); // 編集実行
        Route::post('/documents/{document}/delete','DocumentController@delete'); // 削除実行
        
        // 質問と参考記事の紐付け
        // Route::get('/links/index', 'LinkController@index'); // 初期画面表示
        Route::get('/links/document/{document}', 'LinkController@getDocumentToQuestions'); // 新規作成画面表示(記事：質問＝１：多)
        Route::post('/links/document/{document}', 'LinkController@postDocumentToQuestions'); // 新規作成実行(記事：質問＝１：多)
        Route::get('/links/question/{question}', 'LinkController@getQuestionToDocuments'); // 新規作成画面表示(記事：質問＝多：1)
        Route::post('/links/question/{question}', 'LinkController@postQuestionToDocuments'); // 新規作成実行(記事：質問＝多：1)
        
        // 質問
        // Route::get('/questions/index', 'QuestionController@index'); // 初期画面表示
        // Route::get('/questions/create', 'QuestionController@create'); // 新規作成画面表示
        Route::post('/questions/store', 'QuestionController@store'); // 新規作成実行
        Route::post('/questions/{question}/check', 'QuestionController@check'); // 承認実行
        Route::post('/questions/{question}/uncheck', 'QuestionController@uncheck'); // 承認解除実行
        // Route::get('/questions/{question}', 'QuestionController@show'); // 詳細画面表示
        // Route::get('/questions/{question}/edit', 'QuestionController@edit'); // 編集画面表示
        Route::post('/questions/{question}/update', 'QuestionController@update'); // 編集実行
        Route::post('/questions/{question}/delete', 'QuestionController@delete'); // 削除実行
        
        // ユーザー
        Route::get('/users/index', 'UserController@index'); // 初期画面表示
        Route::get('users/admin/register', 'Auth\RegisterController@showRegistrationForm')->name('register'); // 管理者の新規作成画面表示
        Route::post('users/admin/register', 'Auth\RegisterController@register'); // 管理者の新規作成実行
        Route::get('/users/public/register', 'Auth\RegisterController@showPublicRegistrationForm'); // 受講生の新規作成画面表示
        Route::post('/users/public/register', 'Auth\RegisterController@publicRegister'); // 受講生の新規作成実行
        Route::post('/users/{user}/delete', 'UserController@delete'); // 削除実行
        
        // Reactでのデータ受け渡し
        Route::get('react/all/questions', 'ReactController@getAllQuestions'); // 全質問受け渡し
        Route::get('react/question/{question}', 'ReactController@getQuestion'); // 個別質問データの受け渡し
        // Route::get('react/unapproved/questions', 'ReactController@getUnapprovedQuestions'); // 未承認質問受け渡し（未使用？）
        Route::get('react/curriculum/questions', 'ReactController@getCurriculumQuestions'); // カリキュラム範囲の質問受け渡し
        Route::get('react/portfolio/questions', 'ReactController@getPortfolioQuestions'); // 成果物範囲の質問受け渡し
        Route::get('react/all/documents', 'ReactController@getAllDocuments'); // 全記事受け渡し
        Route::get('react/document/{document}', 'ReactController@getDocument'); // 個別記事データの受け渡し
        Route::get('react/related/questions/{document}', 'ReactController@getRelatedQuestions'); // 記事に紐づいている質問の受け渡し
        Route::get('react/all/staffs', 'ReactController@getAllStaffs'); // 全管理者受け渡し
        Route::get('react/id', 'ReactController@getUserId'); // ログインユーザーid受け渡し
        
    });
    
    Route::get('/{any}', function(){
        return view('react');
    })->where('any', '.*');
});    

