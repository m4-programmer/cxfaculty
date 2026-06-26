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
        'appearance',
        'scripts',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'integrations' => 'array',
            'appearance' => 'array',
            'scripts' => 'array',
        ];
    }

    public static function current(): self
    {
        return static::query()->firstOrCreate([], [
            'integrations' => static::defaultIntegrations(),
            'appearance' => static::defaultAppearance(),
            'scripts' => static::defaultScripts(),
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
     * @return array<string, mixed>
     */
    public static function defaultAppearance(): array
    {
        return [
            'logo' => [
                'url' => '/logo.png',
                'height' => 44,
            ],
            'blog' => [
                'accent' => '#ffc107',
                'accent_dark' => '#e6a800',
                'background' => '#000000',
                'surface' => '#050505',
                'text' => '#ffffff',
                'text_muted' => 'rgba(255, 255, 255, 0.65)',
            ],
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function defaultScripts(): array
    {
        return [
            'head' => '',
            'body_end' => '',
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
     * @return array<string, mixed>
     */
    public function resolvedAppearance(): array
    {
        return static::normalizeAppearance($this->appearance);
    }

    /**
     * @return array<string, string>
     */
    public function resolvedScripts(): array
    {
        return array_merge(
            static::defaultScripts(),
            $this->scripts ?? [],
        );
    }

    /**
     * @param  array<string, mixed>|null  $appearance
     * @return array<string, mixed>
     */
    public static function normalizeAppearance(?array $appearance): array
    {
        $defaults = static::defaultAppearance();
        $appearance = $appearance ?? [];

        return [
            'logo' => [
                'url' => $appearance['logo']['url'] ?? $defaults['logo']['url'],
                'height' => (int) ($appearance['logo']['height'] ?? $defaults['logo']['height']),
            ],
            'blog' => [
                'accent' => $appearance['blog']['accent'] ?? $defaults['blog']['accent'],
                'accent_dark' => $appearance['blog']['accent_dark'] ?? $defaults['blog']['accent_dark'],
                'background' => $appearance['blog']['background'] ?? $defaults['blog']['background'],
                'surface' => $appearance['blog']['surface'] ?? $defaults['blog']['surface'],
                'text' => $appearance['blog']['text'] ?? $defaults['blog']['text'],
                'text_muted' => $appearance['blog']['text_muted'] ?? $defaults['blog']['text_muted'],
            ],
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function integrations(): array
    {
        return static::current()->resolvedIntegrations();
    }

    /**
     * @return array<string, mixed>
     */
    public static function appearance(): array
    {
        return static::current()->resolvedAppearance();
    }

    /**
     * @return array<string, string>
     */
    public static function scripts(): array
    {
        return static::current()->resolvedScripts();
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
