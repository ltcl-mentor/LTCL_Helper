<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable=['category','topic','curriculum_number','question','comment','check','user_id'];
    
    public function documents()
    {
        return $this->belongsToMany('App\Document');
    }
    
    public static function getCheckedParticalQuestion($category,$topic)
    {
        return self::where('check',1)->where('category',$category)->where('topic',$topic)->get();
    }
    
    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }
}
