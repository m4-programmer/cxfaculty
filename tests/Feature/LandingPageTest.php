<?php

namespace Tests\Feature;

use App\Models\LandingPage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LandingPageTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['is_admin' => true]);
    }

    public function test_home_page_renders_landing_content(): void
    {
        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertViewIs('home');
        $response->assertViewHas('landing.seo.title');
        $response->assertViewHas('landing.hero.headline_emphasis');
        $response->assertViewHas('featuredPosts');
        $response->assertSee(LandingPage::defaultContent()['hero']['headline_emphasis'], false);
    }

    public function test_v2_landing_page_is_available_for_comparison(): void
    {
        $response = $this->get(route('landing.v2'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('welcome-v2')
            ->has('landing.hero.headline')
            ->has('landing.sidebar.enabled')
        );
    }

    public function test_home_page_uses_persisted_landing_content(): void
    {
        $landingPage = LandingPage::current();
        $content = $landingPage->resolvedContent();
        $content['hero']['headline_emphasis'] = 'Custom emphasis from admin';
        $landingPage->update(['content' => $content]);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertSee('Custom emphasis from admin', false);
    }

    public function test_admin_can_view_landing_page_editor(): void
    {
        $response = $this->actingAs($this->admin())
            ->get(route('admin.landing.edit'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/landing/edit')
            ->has('content.seo.title')
            ->has('content.nav.cta_label')
            ->has('content.hero.headline_emphasis')
            ->has('content.hero.stats', 4)
            ->has('content.ticker.items')
            ->has('content.philosophy.pillars', 4)
            ->has('content.services.items', 3)
            ->has('content.process.steps', 4)
            ->has('content.manifesto.quote')
            ->has('content.why.cards', 4)
            ->has('content.industries.items')
            ->has('content.cta_strip.headline')
            ->has('content.blog.headline_emphasis')
            ->has('content.community.headline')
            ->has('content.contact.headline')
            ->has('content.footer.service_links')
            ->has('content.footer.company_links')
            ->has('content.footer.connect_links')
            ->has('integrations.whatsapp_scheduling_url')
            ->has('integrations.whatsapp_community_url')
            ->has('integrations.discovery_call_message')
            ->has('integrations.conversation_message')
        );
    }

    public function test_landing_page_cms_does_not_affect_v2_page(): void
    {
        $landingPage = LandingPage::current();
        $content = $landingPage->resolvedContent();
        $content['hero']['headline_emphasis'] = 'CMS-only headline change';
        $landingPage->update(['content' => $content]);

        $response = $this->get(route('landing.v2'));

        $response->assertInertia(fn (Assert $page) => $page
            ->where('landing.hero.headline', 'Transform your customer experience with clean design, smarter content, and a real CMS.')
            ->missing('landing.hero.headline_emphasis')
        );
    }

    public function test_admin_can_update_site_integrations(): void
    {
        $response = $this->actingAs($this->admin())
            ->put(route('admin.landing.integrations.update'), [
                'integrations' => [
                    'whatsapp_scheduling_url' => 'https://wa.me/15551234567',
                    'whatsapp_community_url' => 'https://chat.whatsapp.com/example-group',
                    'discovery_call_message' => 'Hi, I want a discovery call.',
                    'conversation_message' => 'Hi, let us talk about CX.',
                ],
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->get(route('home'))
            ->assertOk()
            ->assertSee('15551234567', false);

        $this->get(route('community.join'))
            ->assertOk()
            ->assertViewIs('community.join')
            ->assertViewHas('whatsappCommunityUrl', 'https://chat.whatsapp.com/example-group');
    }

    public function test_admin_can_update_footer_links(): void
    {
        $content = LandingPage::defaultContent();
        $content['footer']['company_links'][0] = [
            'label' => 'Our Story',
            'href' => '#why',
        ];

        $this->actingAs($this->admin())
            ->put(route('admin.landing.update'), ['content' => $content])
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->get(route('home'))
            ->assertOk()
            ->assertSee('Our Story', false);
    }

    public function test_landing_page_content_is_normalized_on_save(): void
    {
        $legacyContent = [
            'hero' => [
                'headline_emphasis' => 'Legacy headline',
            ],
            'sidebar' => [
                'enabled' => true,
            ],
        ];

        LandingPage::current()->update(['content' => $legacyContent]);

        $this->actingAs($this->admin())
            ->put(route('admin.landing.update'), [
                'content' => LandingPage::normalizeContent($legacyContent),
            ])
            ->assertRedirect();

        $resolved = LandingPage::current()->fresh()->resolvedContent();

        $this->assertSame('Legacy headline', $resolved['hero']['headline_emphasis']);
        $this->assertArrayHasKey('nav', $resolved);
        $this->assertArrayHasKey('manifesto', $resolved);
        $this->assertArrayNotHasKey('sidebar', $resolved);
    }

    public function test_admin_can_update_landing_page_content(): void
    {
        $content = LandingPage::defaultContent();
        $content['hero']['headline_emphasis'] = 'Updated hero emphasis';
        $content['services']['enabled'] = false;

        $response = $this->actingAs($this->admin())
            ->put(route('admin.landing.update'), [
                'content' => $content,
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('landing_pages', [
            'id' => LandingPage::current()->id,
        ]);

        $this->get(route('home'))
            ->assertOk()
            ->assertSee('Updated hero emphasis', false)
            ->assertDontSee('Service — 01', false);
    }

    public function test_guest_cannot_access_landing_page_editor(): void
    {
        $this->get(route('admin.landing.edit'))
            ->assertRedirect(route('login'));
    }

    public function test_non_admin_cannot_update_landing_page(): void
    {
        $user = User::factory()->create(['is_admin' => false]);
        $content = LandingPage::defaultContent();
        $content['hero']['headline_emphasis'] = 'Should not save';

        $this->actingAs($user)
            ->put(route('admin.landing.update'), ['content' => $content])
            ->assertForbidden();
    }
}
