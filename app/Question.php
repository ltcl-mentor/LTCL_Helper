<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Document;
use Illuminate\Database\Eloquent\SoftDeletes;


class Question extends Model
{
    use SoftDeletes;
    
    protected $fillable=['category', 'topic', 'curriculum_number', 'question', 'comment', 'check', 'user_id'];
    
    static $category = ['カリキュラム', '成果物'];
    
    static $topic = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', 'マイグレーション', 'リレーション', 'Laravel拡張', '画像処理', 'Heroku環境', 'API', 'デザイン'];
    
    // リレーション関係
    public function documents()
    {
        return $this->belongsToMany('App\Document');
    }
    
    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }
    
    // 指定の質問に対してまだ紐付けがされていない参考記事を取得
    public function getUnrelatedDocuments()
    {
        $related_document_ids = $this->documents()->select('document_id')->get();
        // 取得したidを配列に変換
        foreach($related_document_ids as $related_document_id){
            $related_ids_array[] = $related_document_id['document_id'];
        }
        // 紐付けがすでに行われているデータ以外(まだ紐付けのできていないデータ)を取得
        return Document::whereNotIn('id', $related_ids_array)->get();
    }
    
    // 質問のデータの物理削除の実行
    public static function questionForceDelete()
    {
        $deleted_questions = self::onlyTrashed()->get();
        $today = date("Y-m-d H:i:s");
        foreach($deleted_questions as $deleted_question){
            $month_diff = $deleted_question['deleted_at']->diffInMonths($today);
            // 論理削除されてから３ヶ月以上経過していた場合に物理削除を実行
            if($month_diff > 3){
                $deleted_question->forceDelete();
            }
        }
    }
    
    // 質問の絞り込み検索
    public static function conditionSearch($category, $topic, $curriculum_number, $keyword)
    {
        $basic_data = self::where('check', true)
                        ->where('category', $category)
                        ->where('topic', $topic);
                        
        if($keyword && $curriculum_number){
            $results = $basic_data
                        ->where('curriculum_number', $curriculum_number)
                        ->where('question', 'LIKE', '%'.$keyword.'%');
                        
        }elseif($curriculum_number){
            $results = $basic_data->where('curriculum_number', $curriculum_number);
                        
        }elseif($keyword){
            $results = $basic_data->where('question', 'LIKE', '%'.$keyword.'%');
            
        }else{
            $results = $basic_data;
        }
        
        return $results->orderBy('question', 'asc')->get();
    }
}
