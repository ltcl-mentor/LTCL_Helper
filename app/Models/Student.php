<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;


class Student extends Model
{
    protected $fillable = [
        'name', 'password', 'user_id'
    ];
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
