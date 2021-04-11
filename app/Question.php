<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable=['category','genre','curriculum_number','question','comment','check','user_id'];
    
    public function documents()
    {
        return $this->belongsToMany('App\Document');
    }
    
}
