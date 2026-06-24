<?php

namespace Tests\Feature;

use App\Models\CommunityMember;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommunityJoinTest extends TestCase
{
    use RefreshDatabase;

    public function test_community_join_page_renders(): void
    {
        config(['cx.whatsapp_community_url' => 'https://chat.whatsapp.com/example']);

        $response = $this->get(route('community.join'));

        $response->assertOk();
        $response->assertViewIs('community.join');
        $response->assertViewHas('whatsappCommunityUrl', 'https://chat.whatsapp.com/example');
    }

    public function test_community_form_stores_member_and_shows_success(): void
    {
        config(['cx.whatsapp_community_url' => 'https://chat.whatsapp.com/example']);

        $response = $this->post(route('community.join.submit'), [
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'phone' => '+15550000000',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');
        $response->assertSessionHas('communityJoined', true);

        $this->assertDatabaseHas('community_members', [
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'phone' => '+15550000000',
        ]);
    }

    public function test_community_form_rejects_honeypot_submissions(): void
    {
        $response = $this->post(route('community.join.submit'), [
            'name' => 'Bot User',
            'email' => 'bot@example.com',
            'website' => 'https://spam.test',
        ]);

        $response->assertSessionHasErrors('website');
        $this->assertDatabaseCount('community_members', 0);
    }

    public function test_community_form_requires_valid_email(): void
    {
        $response = $this->post(route('community.join.submit'), [
            'name' => 'John Smith',
            'email' => 'not-an-email',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertSame(0, CommunityMember::count());
    }
}
