<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class Student extends Model
{
    protected $fillable = [
        'name', 'password', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
