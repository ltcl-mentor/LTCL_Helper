<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Question;

class Document extends Model
{
    protected $fillable=['title','link'];
    
    public function questions()
    {
        return $this->belongsToMany('App\Question');
    }
    
    public function getRelatedQuestions()
    {
        $related_question_ids = $this->questions()->select('question_id')->get();
        // 取得したidを配列に変換
        foreach($related_question_ids as $related_question_id){
            $related_ids_array[] = $related_question_id['question_id'];
        }
        // 紐付けがすでに行われているデータ以外(まだ紐付けのできていないデータ)を取得
        return Question::whereNotIn('id', $related_ids_array)->get();
    }
}
