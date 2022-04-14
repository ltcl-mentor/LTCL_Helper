<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Question;
use App\User;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use SoftDeletes;
    
    protected $fillable=['title', 'link', 'beginner', 'amature', 'master', 'all', 'user_id'];
    
    /**
     * リレーション関係
     */
    public function questions()
    {
        return $this->belongsToMany('App\Question');
    }
    
    public function user() {
        return $this->belongsTo('App\User')->withTimestamps();
    }
    
    /**
     * 関連記事一覧をペジネーションで取得する
     */
     public function getDocumentPagenate($keyword) {
         if($keyword) {
             $results = self::where('title', 'like', '%'.$keyword.'%');
         }
     }
    
    /**
     * 実行対象の記事データに関連する質問の全ID取得
     */
    public function getRelatedQuestionsIds(){
        $related_questions = $this->questions()->get(['question_id'])->toArray();
        $related_question_ids = [];
        
        foreach($related_questions as $question){
            $related_question_ids[] = $question['question_id'];
        }
        
        return $related_question_ids;
    }
    
    /**
     * 実行対象の記事に対してまだ紐付けがされていない全質問を取得
     */
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
    
    /**
     * 記事のデータの物理削除の実行
     * （対象：論理削除から３ヶ月が経過したもの）
     */
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
    
    /**
     * 参考記事作成者情報を追加
     */
    public function setAuthor()
    {
        $author = User::find($this->user_id);
        
        if($author){
            $this->author = $author->name;
        }else{
            $this->author = "削除済みユーザー";
        }
        
        return $this;
    }
    
    /**
     * ローカルで真偽値がきちんと出力されず0か1になってしまうので矯正して全件取得
     */
    // public static function getCorrectBooleanDocuments()
    // {
    //     $documents = self::get();
        
    //     foreach($documents as $document){
    //         $document->beginner === 1 ? $document->beginner = true : $document->beginner = false;
    //         $document->amature === 1 ? $document->amature = true : $document->amature = false;
    //         $document->master === 1 ? $document->master = true : $document->master = false;
    //         $document->all === 1 ? $document->all = true : $document->all = false;
    //     }
        
    //     return $documents;
    // }
    
    /**
     * 
     */
    // public function correctBoolean()
    // {
    //     $this->beginner === 1 ? $this->beginner = true : $this->beginner = false;
    //     $this->amature === 1 ? $this->amature = true : $this->amature = false;
    //     $this->master === 1 ? $this->master = true : $this->master = false;
    //     $this->all === 1 ? $this->all = true : $this->all = false;
    // }
}
