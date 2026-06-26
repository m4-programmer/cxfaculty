<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteAppearanceRequest extends FormRequest
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
            'appearance.logo.height' => ['required', 'integer', 'min:24', 'max:120'],
            'appearance.blog.accent' => ['required', 'string', 'max:32'],
            'appearance.blog.accent_dark' => ['required', 'string', 'max:32'],
            'appearance.blog.background' => ['required', 'string', 'max:32'],
            'appearance.blog.surface' => ['required', 'string', 'max:32'],
            'appearance.blog.text' => ['required', 'string', 'max:32'],
            'appearance.blog.text_muted' => ['required', 'string', 'max:64'],
        ];
    }
}
