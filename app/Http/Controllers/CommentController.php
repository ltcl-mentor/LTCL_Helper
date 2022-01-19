<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Question;
use App\Image;
use App\Slack;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * 新規作成実行
     */
    public function store(Request $request, Comment $comment)
    {
        // コメントに関する保存処理
        $input['comment'] = $request['comment'];
        $input['question_id'] = $request['question_id'];
        $input['comment_id'] = $request['comment_id'];
        
        $comment->fill($input);
        
        $comment['user_id'] = Auth::id();
        
        // コメント入力者が受講生かどうか判別
        // このデータは詳細ページでのコメント入力を許可するか否かの判別に利用
        if(Auth::user()->is_admin === 'staff'){
            $comment['is_staff'] = true;
        }else{
            $comment['is_staff'] = false;
        }
        
        /**
         * コメント入力状況の判定
         * true: メンターの入力が済み、受講生の入力待ち
         * false: 受講生の入力がされ、メンターの返答待ち
         * null: コメント未入力。またはリプライコメントデータ
         */
        // メインコメントデータかつメンターがコメントを入力した場合
        if($comment->comment_id === 0 && $comment->is_staff === true){
            $comment['is_mentor_commented'] = true;
        
        // メインコメントデータかつ受講生がコメントを入力した場合
        }elseif($comment->comment_id === 0 && $comment->is_staff === false){
            $comment['is_mentor_commented'] = false;
            
        // リプライコメントデータの場合
        }else{
            $main_comment = $comment->find($comment->comment_id);
            // メンターがコメントを入力した場合
            if($comment->is_staff === true){
                $main_comment['is_mentor_commented'] = true;
                
            // 受講生がコメントを入力した場合
            }elseif($comment->is_staff === false){
                $main_comment['is_mentor_commented'] = false;
            }
            $main_comment->save();
        }
        
        $comment->save();
        
        // 画像に関する処理
        // 画像は事前に保存されているので、実際にコメントの中で使われていないものは削除
        // コメントの中で利用されているものには質問のIDを記録
        $image_paths = $request['images'];
        
        if(count(array_filter($image_paths)) !== 0){
            $delete_images = [];
            
            foreach($image_paths as $path){
                // コメントの中で対象の画像URLが使われていた場合
                if(strpos($comment->comment, $path)){
                    $image_data = Image::firstWhere('image_path', $path);
                    $image_data->comment_id = $comment->id;
                    $image_data->save();
                    
                // コメントの中で対象の画像URLが使われていなかった場合
                }else{
                    array_push($delete_images, $path);
                }
            }
            
            Image::imageDelete($delete_images);
        }
        
        // Slackへの通知
        // データ作成者が受講生だった場合
        if(Auth::user()->is_admin === null){
            $message = "受講生によってコメントが入力されました。\n以下のリンクから確認してください。\nhttps://stark-cliffs-73338.herokuapp.com/questions/" . $comment->question_id;
            Slack::sendMessage($message);
        }
        
        return ['id' => $comment->question_id];
    }
    
    /**
     * 編集実行
     */
    public function update(Request $request, Comment $comment)
    {
        // コメントに関する更新処理
        $input['comment'] = $request['comment'];
        
        $comment->fill($input);
        
        $comment->save();
        
        
        // 画像に関する処理
        // 新規に追加された画像は事前に保存されているので、実際にコメントの中で使われていないものを削除
        $image_paths = $request['images'];
        
        // コメントの中で使われなくなった画像も削除するので、テーブルから取得して画像URLを追加
        $used_images = Image::where('comment_id', $comment->id)->get(['image_path']);
        
        if(count($used_images) !== 0){
            foreach($used_images as $used_image){
                array_push($image_paths, $used_image->image_path);
            }
        }
        
        if(count(array_filter($image_paths)) !== 0){
            $delete_images = [];
            
            foreach($image_paths as $path){
                // コメントの中で対象の画像URLが使われていた場合
                if(strpos($comment->comment, $path)){
                    $image_data = Image::firstWhere('image_path', $path);
                    $image_data->question_id = $question->id;
                    $image_data->save();
                    
                // コメントの中で対象の画像URLが使われていなかった場合
                } else {
                    array_push($delete_images, $path);
                }
            }
            
            Image::imageDelete($delete_images);
        }
        
        // Slackへの通知
        // データ作成者が受講生だった場合
        if(Auth::user()->is_admin === null){
            $message = "受講生によってコメントが更新されました。\n以下のリンクから確認してください。\nhttps://stark-cliffs-73338.herokuapp.com/questions/" . $comment->question_id;
            Slack::sendMessage($message);
        }
        
        return ['id' => $comment->question_id];
    }
    
    /**
     * 削除実行
     */
    public function delete(Comment $comment)
    {
        $delete_images = [];
        
        // 対象コメントがメインコメントかリプライコメントか判別
        // メインコメントだった場合は関連するリプライコメントを削除した後にメインコメントの削除
        if($comment->comment_id === 0){
            $sub_comments = Comment::where('comment_id', $comment->id)->get();
            foreach($sub_comments as $sub_comment){
                // リプライコメントの関連画像の削除
                $used_images = Image::where('comment_id', $sub_comment->id)->get(['image_path']);
                
                if(count($used_images) !== 0){
                    foreach($used_images as $used_image){
                        array_push($delete_images, $used_image->image_path);
                    }
                }
                
                $sub_comment->delete();
            }
        }
        
        // メインコメントの関連画像の削除
        $used_images = Image::where('comment_id', $comment->id)->get(['image_path']);
        
        if(count($used_images) !== 0){
            foreach($used_images as $used_image){
                array_push($delete_images, $used_image->image_path);
            }
        }
        
        Image::imageDelete($delete_images);
        
        // コメントの削除
        // 対象を物理削除
        $comment->delete();
        
        // // 過去に論理削除されたデータの中で３ヶ月経過したものを物理削除
        // // 質問で利用された画像の削除はこちらで実行
        // Question::questionForceDelete();
    }
}
