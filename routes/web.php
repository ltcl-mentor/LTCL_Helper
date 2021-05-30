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
    Route::get('/', 'PostController@search');
    Route::get('/show/{question}', 'PostController@show');
    Route::get('/history', 'PostController@history');
    
    
    Route::group(['middleware' => ['administrator']], function () {
        
        // 管理者権限を持っているユーザーのみがアクセス可能
        Route::get('/mentor', 'PostController@mentorTop')->name('mentor');
        
        Route::get('/documents/create', 'PostController@documentCreate');
        Route::get('/documents/index', 'PostController@documentIndex');
        Route::get('/documents/{document}/edit', 'PostController@documentEdit');
        Route::get('/documents/{document}', 'PostController@documentShow');
        Route::post('/documents/{document}/update', 'PostController@documentUpdate');
        Route::post('/documents/store', 'PostController@documentStore');
        
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
        
        Route::get('/relations/index', 'LinkController@index');
        Route::get('/relations/document/{document}', 'LinkController@getDocumentToQuestions');
        Route::get('/relations/question/{question}', 'LinkController@getQuestionToDocuments');
        Route::post('/relations/document/{document}', 'LinkController@postDocumentToQuestions');
        Route::post('/relations/question/{question}', 'LinkController@postQuestionToDocuments');
        
        Route::get('/users/index', 'PostController@userIndex');
        Route::post('/user/{user}/delete', 'PostController@userDelete');
    }); 
});    
    
