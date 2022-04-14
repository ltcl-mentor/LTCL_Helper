<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Storage;

class Image extends Model
{
    protected $fillable=['image_path', 'question_id', 'comment_id', 'user_id'];
    
    /**
     * リレーション関係
     */
    public function question() {
        return $this->belongsTo('App\Question');
    }
    
    public function comment() {
        return $this->belongsTo('App\Comment');
    }
    
    public function user() {
        return $this->belongsTo('App\User');
    }
    
    /**
     * 画像データ削除処理
     */
    public static function imageDelete($image_paths)
    {
        foreach($image_paths as $path){
            // S3上のデータを削除
            $delete_path = substr($path, 51);
            Storage::disk('s3')->delete($delete_path);
            
            // ローカルのデータを削除
            self::firstWhere('image_path', $path)->delete();
        }
        
        // foreach($images as $image){
        //     $image_path = substr($image->image_path, 51);
        //     Storage::disk('s3')->delete($image_path);
        //     self::find($image->id)->delete();
        // }
    }
    
    /**
     * S3への画像データ保存処理
     */
    public static function imageCreate($image, $question_id, $comment_id)
    {
        // バケットの`myprefix`フォルダへアップロード
        $path = Storage::disk('s3')->putFile('myprefix', $image, 'public');
        // アップロードした画像のフルパスを取得
        $image_path = Storage::disk('s3')->url($path);
        
        self::create([
            'image_path' => Storage::disk('s3')->url($path),
            'question_id' => $question_id,
            'comment_id' => $comment_id,
            'user_id' => Auth::id(),
        ]);
        
        return $image_path;
        
        // foreach($images as $image){
        //     // バケットの`myprefix`フォルダへアップロード
        //     $path = Storage::disk('s3')->putFile('myprefix', $image, 'public');
        //     self::create([
        //         // アップロードした画像のフルパスを取得
        //         'image_path' => Storage::disk('s3')->url($path),
        //         'question_id' => $question_id,
        //     ]);
        // };
    }
}
