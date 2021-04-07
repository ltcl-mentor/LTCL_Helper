<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable=['title','link'];
    
    public function questions()
    {
        return $this->belongsToMany('App\Question');
    }
}
