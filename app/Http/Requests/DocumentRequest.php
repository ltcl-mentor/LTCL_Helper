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
            'title' => 'required|max:50',
            'link' => 'required',
        ];
    }
    
    public function messages()
    {
        return [
            'title.required' => '記事のタイトルは必須です。',
            'title.max' => '記事のタイトルは字数制限50文字です。',
            'link.required' => '記事のリンクは必須です。',
        ];
    }
}
