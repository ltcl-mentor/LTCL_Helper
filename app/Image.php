<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;

class Image extends Model
{
    protected $fillable=['image_path', 'question_id'];
    
    /**
     * S3上の画像データ削除処理
     */
    public static function imageDelete($images)
    {
        foreach($images as $image){
            $image_path = substr($image->image_path, 51);
            Storage::disk('s3')->delete($image_path);
            self::find($image->id)->delete();
        }
    }
    
    /**
     * S3への画像データ保存処理
     */
    public static function imageCreate($image, $question_id)
    {
        // バケットの`myprefix`フォルダへアップロード
        $path = Storage::disk('s3')->putFile('myprefix', $image, 'public');
        // アップロードした画像のフルパスを取得
        $image_path = Storage::disk('s3')->url($path);
        
        // self::create([
        //     'image_path' => Storage::disk('s3')->url($path),
        //     'question_id' => $question_id,
        // ]);
        
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
