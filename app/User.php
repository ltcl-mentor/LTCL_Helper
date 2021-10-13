<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Question;
use App\Student;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'password', 'is_admin'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    public function questions()
    {
        return $this->belongsToMany('App\Question')->withPivot(['created_at'])->orderBy('pivot_created_at', 'desc');
    }
    
    public static function userDelete($data)
    {
        Student::where('user_id', $data->id)->delete();
        
        $data->questions()->detach();
        
        $related_questions = Question::where('user_id', $data->id)->get();
        
        foreach($related_questions as $related_question){
            $related_question['user_id'] = 0;
            $related_question->save();
        }
        
        $data->delete();
    }
}
