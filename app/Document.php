<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Question;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use SoftDeletes;
    
    protected $fillable=['title','link'];
    
    public function questions()
    {
        return $this->belongsToMany('App\Question');
    }
    
    public function getRelatedQuestionsIds(){
        $related_questions = $this->questions()->get(['question_id'])->toArray();
        foreach($related_questions as $question){
            $related_question_ids[] = $question['question_id'];
        }
        
        return $related_question_ids;
    }
    
    public function getUnrelatedQuestions()
    {
        $related_question_ids = $this->questions()->select('question_id')->get();
        // 取得したidを配列に変換
        foreach($related_question_ids as $related_question_id){
            $related_ids_array[] = $related_question_id['question_id'];
        }
        // 紐付けがすでに行われているデータ以外(まだ紐付けのできていないデータ)を取得
        return Question::whereNotIn('id', $related_ids_array)->get();
    }
    
    public static function documentForceDelete()
    {
        $deleted_documents = self::onlyTrashed()->get();
        $today = date("Y-m-d H:i:s");
        foreach($deleted_documents as $deleted_document){
            $month_diff = $deleted_document['deleted_at']->diffInMonths($today);
            // 論理削除されてから３ヶ月以上経過していた場合に物理削除を実行
            if($month_diff > 3){
                $deleted_document->forceDelete();
            }
        }
    }
}
