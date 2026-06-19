<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'integrations',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'integrations' => 'array',
        ];
    }

    public static function current(): self
    {
        return static::query()->firstOrCreate([], [
            'integrations' => static::defaultIntegrations(),
        ]);
    }

    /**
     * @return array<string, string>
     */
    public static function defaultIntegrations(): array
    {
        return [
            'whatsapp_scheduling_url' => '',
            'whatsapp_community_url' => '',
            'discovery_call_message' => "Hello, I'd like to book a discovery call about our customer experience goals.",
            'conversation_message' => "Hello, I'd like to start a conversation about improving our customer experience.",
        ];
    }

    /**
     * @return array<string, string>
     */
    public function resolvedIntegrations(): array
    {
        $integrations = array_merge(
            static::defaultIntegrations(),
            $this->integrations ?? [],
        );

        if ($integrations['whatsapp_scheduling_url'] === '') {
            $integrations['whatsapp_scheduling_url'] = (string) config('cx.whatsapp_scheduling_url');
        }

        if ($integrations['whatsapp_community_url'] === '') {
            $integrations['whatsapp_community_url'] = (string) config('cx.whatsapp_community_url');
        }

        return $integrations;
    }

    /**
     * @return array<string, string>
     */
    public static function integrations(): array
    {
        return static::current()->resolvedIntegrations();
    }

    public static function whatsappSchedulingUrl(): string
    {
        return static::integrations()['whatsapp_scheduling_url'];
    }

    public static function whatsappCommunityUrl(): string
    {
        return static::integrations()['whatsapp_community_url'];
    }
}
