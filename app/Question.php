<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Document;

class Question extends Model
{
    protected $fillable=['category','topic','curriculum_number','question','comment','check','user_id'];
    
    static $category = ['カリキュラム', '成果物'];
    
    static $topic = ['AWS', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'];
    
    // リレーション関係
    public function documents()
    {
        return $this->belongsToMany('App\Document');
    }
    
    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }
    
    public function getRelatedDocuments()
    {
        $related_document_ids = $this->documents()->select('document_id')->get();
        // 取得したidを配列に変換
        foreach($related_document_ids as $related_document_id){
            $related_ids_array[] = $related_document_id['document_id'];
        }
        // 紐付けがすでに行われているデータ以外(まだ紐付けのできていないデータ)を取得
        return Document::whereNotIn('id', $related_ids_array)->get();
    }
}
