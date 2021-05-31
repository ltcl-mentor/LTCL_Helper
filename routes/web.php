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
Auth::routes(['register' => false]);

Route::group(['middleware' => ['auth']], function () {
    
    // ログイン済みユーザーのみアクセス可能
    Route::get('/', 'HomeController@search');
    Route::get('/show/{question}', 'HomeController@show');
    // Route::get('/history', 'HomeController@history');
    
    
    Route::group(['middleware' => ['administrator']], function () {
        
        // 管理者権限を持っているユーザーのみがアクセス可能
        Route::get('/mentor', 'HomeController@mentorTop')->name('mentor');
        
        Route::get('/documents/create', 'DocumentController@create');
        Route::get('/documents/index', 'DocumentController@index');
        Route::get('/documents/{document}/edit', 'DocumentController@edit');
        Route::get('/documents/{document}', 'DocumentController@show');
        Route::post('/documents/{document}/update', 'DocumentController@update');
        Route::post('/documents/store', 'DocumentController@store');
        
        Route::get('/links/index', 'LinkController@index');
        Route::get('/links/document/{document}', 'LinkController@getDocumentToQuestions');
        Route::get('/links/question/{question}', 'LinkController@getQuestionToDocuments');
        Route::post('/links/document/{document}', 'LinkController@postDocumentToQuestions');
        Route::post('/links/question/{question}', 'LinkController@postQuestionToDocuments');
        
        Route::get('/questions/create', 'QuestionController@create');
        Route::get('/questions/index', 'QuestionController@index');
        Route::get('/questions/approval', 'QuestionController@approval');
        Route::get('/questions/{question}/edit', 'QuestionController@edit');
        Route::get('/questions/{question}', 'QuestionController@show');
        Route::post('/questions/store', 'QuestionController@store');
        Route::post('/questions/{question}/check', 'QuestionController@check');
        Route::post('/questions/{question}/delete', 'QuestionController@delete');
        Route::post('/questions/{question}/uncheck', 'QuestionController@uncheck');
        Route::post('/questions/{question}/update', 'QuestionController@update');

        Route::get('react/all/documents', 'ReactController@getAllDocuments');
        Route::get('react/all/questions', 'ReactController@getAllQuestions');
        Route::get('react/all/staffs', 'ReactController@getAllStaffs');
        Route::get('react/approved/questions', 'ReactController@getApprovedQuestions');
        Route::get('react/unapproved/questions', 'ReactController@getUnapprovedQuestions');
        Route::get('react/curriculum/questions', 'ReactController@getCurriculumQuestions');
        Route::get('react/portfolio/questions', 'ReactController@getPortfolioQuestions');
        Route::get('react/id', 'ReactController@getUserId');
        Route::get('react/question/{question}', 'ReactController@getQuestion');
                
        Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
        Route::post('register', 'Auth\RegisterController@register');
        
        Route::get('/users/index', 'UserController@index');
        Route::post('/user/{user}/delete', 'UserController@delete');
    }); 
});    
    
