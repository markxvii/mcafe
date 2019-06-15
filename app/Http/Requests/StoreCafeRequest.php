<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCafeRequest extends FormRequest
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
            'name' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zip' => 'required|regex:/\b\d{6}\b/',
            'brewMethods' => 'sometimes|array',
            'website' => 'sometimes|url'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => '咖啡店名字不能为空',
            'address.required' => '咖啡店地址不能为空',
            'city.required' => '咖啡店所在城市不能为空',
            'state.required' => '咖啡店所在省份不能为空',
            'zip.required' => '咖啡店邮编不能为空',
            'zip.regex' => '无效的邮政编码',
            'brewMethods.array' => '无效的冲泡方法',
            'website.url' => '无效的咖啡店地址',
        ];
    }
}
