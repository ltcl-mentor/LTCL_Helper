<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'post.category' => 'required',
            'post.topic' => 'required',
            'post.curriculum_number' => 'required|max:5',
            'post.question' => 'required|string',
            'post.comment' => 'required|string',
        ];
    }
}
