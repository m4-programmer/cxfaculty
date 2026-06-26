<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteScriptsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'scripts.head' => ['nullable', 'string', 'max:10000'],
            'scripts.body_end' => ['nullable', 'string', 'max:10000'],
        ];
    }
}
