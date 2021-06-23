<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;

class Image extends Model
{
    protected $fillable=['image_path', 'question_id'];
    
    public static function imageDelete($images)
    {
        foreach($images as $image){
            $image_path = substr($image->image_path, 51);
            Storage::disk('s3')->delete($image_path);
            self::find($image->id)->delete();
        }
    }
    
    public static function imageCreate($images, $question_id)
    {
        foreach($images as $image){
            // バケットの`myprefix`フォルダへアップロード
            $path = Storage::disk('s3')->putFile('myprefix', $image, 'public');
            self::create([
                // アップロードした画像のフルパスを取得
                'image_path' => Storage::disk('s3')->url($path),
                'question_id' => $question_id,
            ]);
        };
    }
}
