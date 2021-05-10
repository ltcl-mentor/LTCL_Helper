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


Route::get('/', 'PostController@search')->middleware('auth');
Route::get('/show/{question}','PostController@show')->middleware('auth');
// Route::get('/mentor','PostController@mentorTop')->middleware('auth');


// Route::get('/questions/create','PostController@questionCreate')->middleware('auth');
// Route::get('/questions/index','PostController@questionIndex')->middleware('auth');
// Route::get('/questions/{question}/edit','PostController@questionEdit')->middleware('auth');
// Route::get('/questions/{question}/check','PostController@questionCheck')->middleware('auth');
// Route::get('/questions/{question}','PostController@questionShow')->middleware('auth');
Route::post('/questions/{question}/update','PostController@questionUpdate');
Route::post('/questions/store','PostController@questionStore');


// Route::get('/documents/create','PostController@documentCreate')->middleware('auth');
// Route::get('/documents/index','PostController@documentIndex')->middleware('auth');
// Route::get('/documents/{document}/edit','PostController@documentEdit')->middleware('auth');
// Route::get('/documents/{document}/link','PostController@linkDocumentToQuestion')->name('link')->middleware('auth');
Route::post('/documents/{document}/update','PostController@documentUpdate');
Route::post('/documents/store','PostController@documentStore');

Route::post('/storeLinks/{document}','PostController@storeLinks');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home')->middleware('auth');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::group(['middleware' => ['auth:api','administrator']], function () {

    Route::get('/mentor','PostController@mentorTop');
    
    Route::get('/questions/create','PostController@questionCreate');
    Route::get('/questions/index','PostController@questionIndex');
    Route::get('/questions/{question}/edit','PostController@questionEdit');
    Route::get('/questions/{question}/check','PostController@questionCheck');
    Route::get('/questions/{question}','PostController@questionShow');
    
    Route::get('/documents/create','PostController@documentCreate');
    Route::get('/documents/index','PostController@documentIndex');
    Route::get('/documents/{document}/edit','PostController@documentEdit');
    Route::get('/documents/{document}/link','PostController@linkDocumentToQuestion');
});
