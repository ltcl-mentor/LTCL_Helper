<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Document;
use App\Image;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use SoftDeletes;
    
    protected $fillable=['category', 'topic', 'curriculum_number', 'title', 'remarks', 'question', 'is_resolved', 'check', 'user_id'];
    
    static $category = ['カリキュラム', '成果物'];
    
    static $topic = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', 'マイグレーション', 'リレーション', 'Laravel拡張', '画像処理', 'Heroku環境', 'API', 'デザイン'];
    
    /**
     * リレーション関係
     */
    public function documents()
    {
        return $this->belongsToMany('App\Document');
    }
    
    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }
    
    /**
     * 実行対象の質問データに関連する記事の全ID取得
     */
    public function getRelatedDocumentsIds(){
        $related_documents = $this->documents()->get(['document_id'])->toArray();
        $related_document_ids = [];
        
        foreach($related_documents as $document){
            $related_document_ids[] = $document['document_id'];
        }
        
        return $related_document_ids;
    }
    
    /**
     * 実行対象の質問に対してまだ紐付けがされていない全記事を取得
     */
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
    
    /**
     * 質問のデータの物理削除の実行
     * （対象：論理削除から３ヶ月が経過したもの）
     */
    public static function questionForceDelete()
    {
        $deleted_questions = self::onlyTrashed()->get();
        
        $today = date("Y-m-d H:i:s");
        
        foreach($deleted_questions as $deleted_question){
            $month_diff = $deleted_question['deleted_at']->diffInMonths($today);
            // 論理削除されてから３ヶ月以上経過していた場合に物理削除を実行
            if($month_diff > 3){
                // 関連画像の削除
                $used_images = Image::where('question_id', $question->id)->get(['image_path']);
                
                $delete_images = [];
                
                if(count($used_images) !== 0){
                    foreach($used_images as $used_image){
                        array_push($delete_images, $used_image->image_path);
                    }
                }
                
                Image::imageDelete($delete_images);
                
                // 物理削除実行
                $deleted_question->forceDelete();
            }
        }
    }
    
    /**
     * 質問の検索
     * 「絞り込み」「キーザード」共通
     */
    public static function conditionSearch($category, $topic, $curriculum_number, $keyword, $searchType, $freeword)
    {
        if($freeword){
            // フリーワード検索
            // 検索ワードが複数の場合に要素を配列に変換し、空文字列の要素を排除
            $freewords = explode("/", $freeword);
            $noEmptyFreewords = array_filter($freewords);
            
            if($searchType === "OR"){
                // OR検索
                // 複数の検索ワードのいづれかに該当するものを選出
                $results = self::where('check', true)
                        ->where(function ($query) use ($noEmptyFreewords) {
                            $i = 0;
                            foreach ($noEmptyFreewords as $searchFreeword) {
                                $where = (!$i) ? 'where' : 'orWhere';
                                $i++;
                                $query->$where('question', 'like', '%'.$searchFreeword.'%');
                            }
                        });
            }else{
                // AND検索
                $basic_data = self::where('check', true);
                
                // 複数の検索ワードの全てに該当するものを選出
                foreach($noEmptyFreewords as $searchWord){
                    $basic_data->where('question', 'LIKE', '%'.$searchWord.'%');
                };
                $results = $basic_data;
            }
            
        }else{
            // 絞り込み検索
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
        }
        
        return $results->orderBy('question', 'asc')->get();
    }
}
