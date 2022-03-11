<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\QuestionRequest;
use App\Question;
use App\Document;
use App\User;
use App\Image;
use App\History;
use App\Slack;
use App\Export;
use Storage;
use Illuminate\Support\Facades\Auth;
use Validator;

class QuestionController extends Controller
{
    /** 共通処理 */
    
    /**
     * 質問詳細画面表示時に閲覧を記録
     */
    public function recordShow(Question $question)
    {
        // 質問閲覧履歴への記録
        $question->users()->attach(Auth::id());
        
        // データベースの容量を考慮して履歴保持の期限は２１日間
        History::historyDelete(21);
    }
    
    /**
     * 新規作成実行
     */
    public function store(QuestionRequest $request, Question $question)
    {
        // 質問に関する保存処理
        $input['category'] = $request['category'];
        $input['topic'] = $request['topic'];
        $input['curriculum_number'] = $request['curriculum_number'];
        $input['title'] = $request['title'];
        $input['remarks'] = $request['remarks'];
        $input['question'] = $request['question'];
        $input['is_resolved'] = 0;
        $input['check'] = false;
        $input['user_id'] = Auth::id();
        
        $question->fill($input)->save();
        
        // 質問作成したユーザの質問作成数を変更
        $user = Auth::user();
        $user->question_count += 1;
        $user->save();
        
        // 画像に関する処理
        // 画像は事前に保存されているので、実際に質問の中で使われていないものは削除
        // 質問の中で利用されているものには質問のIDを記録
        $image_paths = $request['images'];
        
        if(count(array_filter($image_paths)) !== 0){
            $delete_images = [];
            
            foreach($image_paths as $path){
                // 質問の中で対象の画像URLが使われていた場合
                if(strpos($question->question, $path)){
                    $image_data = Image::firstWhere('image_path', $path);
                    $image_data->question_id = $question->id;
                    $image_data->save();
                    
                // 質問の中で対象の画像URLが使われていなかった場合
                } else {
                    array_push($delete_images, $path);
                }
            }
            
            Image::imageDelete($delete_images);
        }
        
        // Slackへの通知
        // データ作成者が受講生だった場合のみ
        if(Auth::user()->is_admin === null){
            $message = "受講生によって質問が投稿されました。\n「". $question->title ."」\n以下のリンクから確認してください。\nhttps://stark-cliffs-73338.herokuapp.com/questions/" . $question->id;
            Slack::sendMessage($message, "mentor");
        }
        
        // csv出力チェック
        Question::exportCheck();
        
        return ["id" => $question->id, "is_admin" => Auth::user()->is_admin];
    }
    
    
    /**
     * 画像保存処理
     */
    public function imageStore(Request $request, Image $image)
    {
        $upload_image = $request->file('image');
        
        // 画像サイズが１MB以下であるか確認
        $validator = Validator::make($request->all(), [
            'image' => 'required|max:1024'
        ]);
        
        if($validator->fails()){
            return false;
        }
        
        if($upload_image){
            // リクエストに質問IDがあるか確認
            isset($request['question_id']) ? $question_id = $request['question_id'] : $question_id = 0;
            
            // リクエストにコメントIDがあるか確認
            isset($request['question_id']) ? $comment_id = $request['comment_id'] : $comment_id = 0;
            
            $image_path = $image->imageCreate($upload_image, $question_id, $comment_id);
            
            return $image_path;
        }
    }
    
    /**
     * 質問ステータス変更(質問解決)
     */
    public function resolved(Question $question)
    {
        $question->fill(['is_resolved' => true])->save();
        return $question;
    }
    
    /**
     * 公開中の質問一覧表示
     */
    // public function publicIndex()
    // {
    //     return view('Public.Question.index');
    // }
    
    
    /**
     * 受講生用質問作成画面表示
     */
    // public function publicCreate()
    // {
    //     return view('Public.Question.create');
    // }
    
    
    /**
     * 受講生用質問保存実行
     */
    // public function publicStore(QuestionRequest $request, Question $question)
    // {
    //     // 質問に関する処理
    //     $input['category'] = $request['category'];
    //     $input['topic'] = $request['topic'];
    //     $input['curriculum_number'] = $request['curriculum_number'];
    //     $input['question'] = $request['question'];
    //     $input['comment'] = $request['comment'];
        
    //     $question->fill($input);
        
    //     $question['check'] = false;
    //     $question['user_id'] = Auth::id();
        
    //     $question->save();
        
    //     // 画像に関する処理
    //     // $pictures = $request->file('image');
    //     // if($pictures){
    //     //     Image::imageCreate($pictures, $question->id);
    //     // }
        
    //     // Slackへの通知
    //     $message = "受講生によって質問が投稿されました。\n以下のリンクから確認してください。\nhttps://stark-cliffs-73338.herokuapp.com/questions/" . $question->id;
    //     Slack::sendMessage($message);
    // }
    
    
    
    /** 管理者用処理 */
    
    /**
     * 編集実行
     */
    public function update(QuestionRequest $request, Question $question)
    {
        // 質問に関する更新処理
        $input['category'] = $request['category'];
        $input['topic'] = $request['topic'];
        $input['curriculum_number'] = $request['curriculum_number'];
        $input['title'] = $request['title'];
        $input['remarks'] = $request['remarks'];
        $input['question'] = $request['question'];
        
        $question->fill($input)->save();
        
        // 画像に関する処理
        // 新規に追加された画像は事前に保存されているので、実際に質問の中で使われていないものを削除
        $image_paths = $request['images'];
        
        // 質問の中で使われなくなった画像も削除するので、テーブルから取得して画像URLを追加
        $used_images = Image::where('question_id', $question->id)->get(['image_path']);
        
        if(count($used_images) !== 0){
            foreach($used_images as $used_image){
                array_push($image_paths, $used_image->image_path);
            }
        }
        
        if(count(array_filter($image_paths)) !== 0){
            $delete_images = [];
            
            foreach($image_paths as $path){
                // 質問の中で対象の画像URLが使われていた場合
                if(strpos($question->question, $path)){
                    $image_data = Image::firstWhere('image_path', $path);
                    $image_data->question_id = $question->id;
                    $image_data->save();
                    
                // 質問の中で対象の画像URLが使われていなかった場合
                } else {
                    array_push($delete_images, $path);
                }
            }
            
            Image::imageDelete($delete_images);
        }
        
        // Slackへの通知
        $message = Auth::user()->name . "によって質問が編集されました。\n「". $question->title ."」\n以下のリンクから確認してください。\nhttps://stark-cliffs-73338.herokuapp.com/questions/" . $question->id;
        Slack::sendMessage($message, "mentor");
        
        return ["id" => $question->id];
    }
    
    /**
     * 削除実行
     */
    public function delete(Question $question)
    {
        // 質問の削除
        // 対象を論理削除
        $question->delete();
        
        // 質問作成したユーザの質問作成数を変更
        $user = Auth::find($question->user_id);
        $user->question_count += 1;
        $user->save();
        
        // 過去に論理削除されたデータの中で３ヶ月経過したものを物理削除
        // 質問で利用された画像の削除はこちらで実行
        Question::questionForceDelete();
    }
    
    /**
     * 公開処理
     */
    public function check(Question $question)
    {
        $question->fill(['check' => true])->save();
        return $question;
    }
    
    /**
     * 非公開処理
     */
    public function uncheck(Question $question)
    {
        $question->fill(['check' => false])->save();
        return $question;
    }
    
    
    /**
     * 質問の定期出力(csv)
     */
    public static function questionsExport()
    {
        $headers = [ //ヘッダー情報
            'Content-type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename=questionExport.csv',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];
        
        // データベースからデータ取得
        // 質問の総数と出力済み件数取得
        $question_count = Question::count();
        $exported_question_count = Export::sum('export_size');
        
        // 未出力件数取得
        $yet_exported_question_count = $question_count - $exported_question_count;
        
        // 未出力件数分のデータを出力
        $questions = Question::orderBy('created_at', 'DESC')->skip($exported_question_count)->take($yet_exported_question_count)->get();
        
        // 出力記録データ生成(出力件数を記録)
        Export::create(['export_size' => $yet_exported_question_count]);
        
        // ファイル生成処理
        $callback = function() use ($questions)
        {
            //ファイル作成
            $createCsvFile = fopen('php://output', 'w');
            
            //1行目の情報
            $columns = [
                'id',
                'category',
                'topic',
                'curriculum_number',
                'title',
                'remarks',
                'question',
                'is_resolved',
                'check',
                'user_id',
                'author',
                'created_at',
                'updated_at',
                'deleted_at',
            ];
            
            //文字化け対策
            mb_convert_variables('SJIS-win', 'UTF-8', $columns);
            
            //1行目の情報を追記
            fputcsv($createCsvFile, $columns);
            
            //データを1行ずつ回す
            foreach ($questions as $question) {
                $author = User::find($question->user_id);
                $csv = [
                    $question->id,
                    $question->category,
                    $question->topic,
                    $question->curriculum_number,
                    $question->title,
                    $question->remarks,
                    $question->question,
                    $question->is_resolved,
                    $question->check,
                    $question->user_id,
                    $author->name,
                    $question->created_at,
                    $question->updated_at,
                    $question->deleted_at,
                ];
                
                //文字化け対策
                mb_convert_variables('SJIS-win', 'UTF-8', $csv);
                
                //ファイルに追記する
                fputcsv($createCsvFile, $csv);
            }
            
            //ファイル閉じる
            fclose($createCsvFile);
            
        };
        
        //実行
        return response()->stream($callback, 200, $headers);
    }
    
    /**
     * 初期画面表示
     */
    // public function index(Question $question)
    // {
    //     return view('Mentor.Question.index');
    // }
    
    /**
     * 新規作成画面表示
     */
    // public function create()
    // {
    //     return view('Mentor.Question.create');
    // }
    
    /**
     * 詳細画面表示
     */
    // public function show(Question $question, User $user)
    // {
    //     return view('Mentor.Question.show')->with(['question_id' => $question->id]);
    // }
    
    /**
     * 編集画面表示
     */
    // public function edit(Question $question)
    // {
    //     return view('Mentor.Question.edit')->with(['question_id' => $question->id]);
    // }
}
