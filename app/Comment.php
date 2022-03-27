<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Question;

class Comment extends Model
{
    protected $fillable=['comment', 'question_id', 'is_staff', 'comment_id', 'user_id', 'is_mentor_commented'];
    
    // ローカルで真偽値がきちんと出力されず0か1になってしまうので矯正
    // public function correctBoolean()
    // {
    //     if($this->is_staff === 1){
    //         $this->is_staff = true;
    //     }else if($this->is_staff === 0){
    //         $this->is_staff = false;
    //     }
    // }
    
    /**
     * リレーション
     */
    public function getQestionTitle()
    {
        $question = Question::find($this->question_id);
        return $question->title;
    }
    
    /**
     * 個別質問へのコメント付加処理
     */
    public static function setComment($question)
    {
        // 1. メインコメント処理
        $main_comments = self::where('question_id', $question->id)->where('comment_id', 0)->orderBy('created_at', 'asc')->get();
            
        if($main_comments){
            $sub_comments = [];
            foreach($main_comments as $key => $main_comment){
                // コメントやり取りの主体となる受講生の特定
                if($key === 0){
                    $target_student = $question->user_id;
                }else{
                    // メインコメントの投稿者が受講生か判別
                    if(!($main_comment->is_staff)){
                        $target_student = $main_comment->user_id;
                    }
                }
                
                // 2. リプライコメント処理
                $comments = Comment::where('comment_id', $main_comment->id)->orderBy('created_at', 'asc')->get();
                
                foreach($comments as $comment){
                    // メインコメントのからコメントやり取りの主体となる受講生の特定ができていない場合
                    if(!($target_student)){
                        // リプライコメントの投稿者が受講生か判別
                        if(User::isStudent($comment->user_id)){
                            $target_student = $comment->user_id;
                        }
                    }
                }
                
                $sub_comments[$main_comment->id] = $comments;
                $main_comment->target_student = $target_student;
            }
        }
        
        $question['main_comments'] = $main_comments;
        $question['sub_comments'] = $sub_comments;
        
        return $question;
    }
    
    public function question() {
        return $this->belongsTo('App\Question');
    }
}
