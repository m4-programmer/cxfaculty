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
        $response->assertInertia(fn (Assert $page) => $page
            ->component('welcome')
            ->has('landing.seo.title')
            ->has('landing.hero.headline')
            ->has('landing.services.items', 3)
        );
    }

    public function test_home_page_uses_persisted_landing_content(): void
    {
        $landingPage = LandingPage::current();
        $content = $landingPage->resolvedContent();
        $content['hero']['headline'] = 'Custom headline from admin';
        $landingPage->update(['content' => $content]);

        $response = $this->get(route('home'));

        $response->assertInertia(fn (Assert $page) => $page
            ->where('landing.hero.headline', 'Custom headline from admin')
        );
    }

    public function test_admin_can_view_landing_page_editor(): void
    {
        $response = $this->actingAs($this->admin())
            ->get(route('admin.landing.edit'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/landing/edit')
            ->has('content.hero.headline')
        );
    }

    public function test_admin_can_update_landing_page_content(): void
    {
        $content = LandingPage::defaultContent();
        $content['hero']['headline'] = 'Updated hero headline';
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
            ->assertInertia(fn (Assert $page) => $page
                ->where('landing.hero.headline', 'Updated hero headline')
                ->where('landing.services.enabled', false)
            );
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
        $content['hero']['headline'] = 'Should not save';

        $this->actingAs($user)
            ->put(route('admin.landing.update'), ['content' => $content])
            ->assertForbidden();
    }
}
