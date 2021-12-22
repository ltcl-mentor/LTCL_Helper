<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable=['comment', 'question_id', 'is_staff', 'comment_id', 'user_id', 'is_mentor_commented'];
    
    // ローカルで真偽値がきちんと出力されず0か1になってしまうので矯正
    public function correctBoolean()
    {
        if($this->is_staff === 1){
            $this->is_staff = true;
        }else if($this->is_staff === 0){
            $this->is_staff = false;
        }
    }
}
