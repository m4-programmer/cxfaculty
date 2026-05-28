<?php

namespace Tests\Feature;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminBlogPostActionsTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['is_admin' => true]);
    }

    private function createPost(User $admin, array $overrides = []): BlogPost
    {
        return BlogPost::create(array_merge([
            'author_id' => $admin->id,
            'title' => 'Test post',
            'slug' => 'test-post-'.uniqid(),
            'excerpt' => 'Test excerpt',
            'body' => '<p>Test body</p>',
            'is_published' => false,
            'published_at' => null,
        ], $overrides));
    }

    public function test_admin_can_toggle_post_publish_status(): void
    {
        $admin = $this->admin();
        $post = $this->createPost($admin);

        $this->actingAs($admin)
            ->patch(route('admin.posts.toggle-published', $post))
            ->assertRedirect();

        $post->refresh();
        $this->assertTrue($post->is_published);
        $this->assertNotNull($post->published_at);

        $this->actingAs($admin)
            ->patch(route('admin.posts.toggle-published', $post))
            ->assertRedirect();

        $post->refresh();
        $this->assertFalse($post->is_published);
    }

    public function test_admin_can_clone_a_post(): void
    {
        $admin = $this->admin();
        $post = $this->createPost($admin, [
            'title' => 'Original post',
            'slug' => 'original-post',
            'is_published' => true,
            'published_at' => now(),
        ]);

        $response = $this->actingAs($admin)
            ->post(route('admin.posts.clone', $post));

        $clone = BlogPost::where('slug', 'original-post-copy')->first();

        $this->assertNotNull($clone);
        $this->assertSame('Original post (Copy)', $clone->title);
        $this->assertFalse($clone->is_published);
        $this->assertSame(0, $clone->views);
        $response->assertRedirect(route('admin.posts.edit', $clone));
    }
}
