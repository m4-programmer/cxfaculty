<?php

namespace Tests\Feature;

use App\Models\ContactInquiry;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class SiteSettingsTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['is_admin' => true]);
    }

    public function test_admin_can_update_blog_colour_palette(): void
    {
        $response = $this->actingAs($this->admin())
            ->put(route('admin.landing.appearance.update'), [
                'appearance' => [
                    'logo' => ['height' => 56],
                    'blog' => [
                        'accent' => '#ff0000',
                        'accent_dark' => '#cc0000',
                        'background' => '#111111',
                        'surface' => '#222222',
                        'text' => '#ffffff',
                        'text_muted' => 'rgba(255,255,255,0.5)',
                    ],
                ],
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $appearance = SiteSetting::current()->fresh()->resolvedAppearance();
        $this->assertSame(56, $appearance['logo']['height']);
        $this->assertSame('#ff0000', $appearance['blog']['accent']);
    }

    public function test_admin_can_update_third_party_scripts(): void
    {
        $script = '<script>console.log("analytics")</script>';

        $this->actingAs($this->admin())
            ->put(route('admin.landing.scripts.update'), [
                'scripts' => [
                    'head' => $script,
                    'body_end' => '',
                ],
            ])
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertSame($script, SiteSetting::scripts()['head']);
    }

    public function test_admin_can_upload_site_logo(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('logo.png', 200, 80);

        $this->actingAs($this->admin())
            ->post(route('admin.landing.logo.upload'), [
                'logo' => $file,
            ])
            ->assertRedirect()
            ->assertSessionHas('success');

        $url = SiteSetting::appearance()['logo']['url'];
        $this->assertStringStartsWith('/storage/site/', $url);
    }

    public function test_admin_notifications_include_unread_inquiry_count(): void
    {
        ContactInquiry::create([
            'name' => 'Jane',
            'email' => 'jane@example.com',
            'subject' => 'Test',
            'message' => 'Hello',
            'ip_address' => '127.0.0.1',
            'read_at' => null,
        ]);
        ContactInquiry::create([
            'name' => 'John',
            'email' => 'john@example.com',
            'subject' => 'Test',
            'message' => 'Hello',
            'ip_address' => '127.0.0.1',
            'read_at' => now(),
        ]);

        $this->actingAs($this->admin())
            ->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('adminNotifications.unreadInquiries', 1)
            );
    }
}
