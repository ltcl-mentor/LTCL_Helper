<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DocumentRequest extends FormRequest
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
            'post.title' => 'required|max:50',
            'post.link' => 'required',
        ];
    }
    
    public function messages()
    {
        return [
            'post.title.required' => '記事のタイトルは必須です。',
            'post.title.max' => '記事のタイトルは字数制限50文字です。',
            'post.link.required' => '記事のリンクは必須です。',
        ];
    }
}
