<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteIntegrationsRequest extends FormRequest
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
            'integrations.whatsapp_scheduling_url' => ['nullable', 'string', 'max:500'],
            'integrations.whatsapp_community_url' => ['nullable', 'string', 'max:500'],
            'integrations.discovery_call_message' => ['required', 'string', 'max:500'],
            'integrations.conversation_message' => ['required', 'string', 'max:500'],
        ];
    }
}
