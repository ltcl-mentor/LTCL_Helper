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
    Route::get('/', 'HomeController@search');
    Route::get('/show/{question}', 'HomeController@show');
    // Route::get('/history', 'HomeController@history');
    
    
    Route::group(['middleware' => ['administrator']], function () {
        
        // 管理者権限を持っているユーザーのみがアクセス可能
        Route::get('/mentor', 'HomeController@mentorTop')->name('mentor');
        
        // 参考記事
        Route::get('/documents/index', 'DocumentController@index'); // 初期画面表示
        Route::get('/documents/create', 'DocumentController@create'); // 新規作成画面表示
        Route::post('/documents/store', 'DocumentController@store'); // 新規作成実行
        Route::get('/documents/{document}', 'DocumentController@show'); // 詳細画面表示
        Route::get('/documents/{document}/edit', 'DocumentController@edit'); // 編集画面表示
        Route::post('/documents/{document}/update', 'DocumentController@update'); // 編集実行
        Route::post('/documents/{document}/delete','DocumentController@delete'); // 削除実行
        
        // 質問と参考記事の紐付け
        Route::get('/links/index', 'LinkController@index'); // 初期画面表示
        Route::get('/links/document/{document}', 'LinkController@getDocumentToQuestions'); // 新規作成画面表示(記事：質問＝１：多)
        Route::post('/links/document/{document}', 'LinkController@postDocumentToQuestions'); // 新規作成実行(記事：質問＝１：多)
        Route::get('/links/question/{question}', 'LinkController@getQuestionToDocuments'); // 新規作成画面表示(記事：質問＝多：1)
        Route::post('/links/question/{question}', 'LinkController@postQuestionToDocuments'); // 新規作成実行(記事：質問＝多：1)
        
        // 質問
        Route::get('/questions/index', 'QuestionController@index'); // 初期画面表示
        Route::get('/questions/approval', 'QuestionController@approval'); // 承認用一覧画面表示
        Route::get('/questions/create', 'QuestionController@create'); // 新規作成画面表示
        Route::post('/questions/store', 'QuestionController@store'); // 新規作成実行
        Route::get('/questions/{question}', 'QuestionController@show'); // 詳細画面表示
        Route::get('/questions/{question}/edit', 'QuestionController@edit'); // 編集画面表示
        Route::post('/questions/{question}/update', 'QuestionController@update'); // 編集実行
        Route::post('/questions/{question}/delete', 'QuestionController@delete'); // 削除実行
        Route::post('/questions/{question}/check', 'QuestionController@check'); // 承認実行
        Route::post('/questions/{question}/uncheck', 'QuestionController@uncheck'); // 承認解除実行
        
        // ユーザー
        Route::get('/users/index', 'UserController@index'); // 初期画面表示
        Route::get('users/admin/register', 'Auth\RegisterController@showRegistrationForm')->name('register'); // 管理者の新規作成画面表示
        Route::post('users/admin/register', 'Auth\RegisterController@register'); // 管理者の新規作成実行
        Route::get('/users/public/register', 'Auth\RegisterController@showPublicRegistrationForm'); // 受講生の新規作成画面表示
        Route::post('/users/public/register', 'Auth\RegisterController@publicRegister'); // 受講生の新規作成実行
        Route::post('/users/{user}/delete', 'UserController@delete'); // 削除実行
        
        // Reactへのデータ受け渡し
        Route::get('react/all/documents', 'ReactController@getAllDocuments'); // 全記事受け渡し
        Route::get('react/all/questions', 'ReactController@getAllQuestions'); // 全質問受け渡し
        Route::get('react/all/staffs', 'ReactController@getAllStaffs'); // 全管理者受け渡し
        Route::get('react/approved/questions', 'ReactController@getApprovedQuestions'); // 承認済み質問受け渡し
        Route::get('react/unapproved/questions', 'ReactController@getUnapprovedQuestions'); // 未承認質問受け渡し
        Route::get('react/curriculum/questions', 'ReactController@getCurriculumQuestions'); // カリキュラム範囲質問受け渡し
        Route::get('react/portfolio/questions', 'ReactController@getPortfolioQuestions'); // 成果物範囲質問受け渡し
        Route::get('react/id', 'ReactController@getUserId'); // ログインユーザーid受け渡し
        Route::get('react/question/{question}', 'ReactController@getQuestion'); // 個別質問データの受け渡し
    }); 
});    
    
