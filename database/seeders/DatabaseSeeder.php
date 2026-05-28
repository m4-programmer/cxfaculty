<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'is_admin' => true,
        ]);

        BlogPost::create([
            'author_id' => $admin->id,
            'title' => 'Launching a customer-first experience in 30 days',
            'slug' => 'launching-a-customer-first-experience-in-30-days',
            'excerpt' => 'A practical roadmap for tuning your web presence, content, and blog workflow around customer experience.',
            'body' => '<h2>Start with the customer journey</h2><p>Start by auditing the experience, then map every touchpoint from the first visit through support. Publish thoughtful articles that educate your audience and build trust at every stage.</p><p>Use clear headlines, fast page loads, and mobile-friendly sections so your messaging converts across devices.</p><ul><li>Audit your current touchpoints</li><li>Define your content pillars</li><li>Launch with a focused blog strategy</li></ul>',
            'featured_image' => null,
            'tags' => 'customer experience, strategy, launch',
            'reading_time' => 3,
            'published_at' => now(),
            'is_published' => true,
        ]);

        BlogPost::create([
            'author_id' => $admin->id,
            'title' => 'How to build a content engine that scales',
            'slug' => 'how-to-build-a-content-engine-that-scales',
            'excerpt' => 'Learn how to create a repeatable content workflow with a modern CMS and rich editor for your team.',
            'body' => '<h2>Content at scale</h2><p>A great content engine combines editorial strategy with the right tools. Use a rich text editor, structured metadata, and a clean publishing pipeline to keep quality high as volume grows.</p><blockquote><p>Consistency beats perfection when building audience trust.</p></blockquote><p>Schedule posts, tag them for discoverability, and review analytics to refine your approach over time.</p>',
            'featured_image' => null,
            'tags' => 'content, cms, blogging',
            'reading_time' => 4,
            'published_at' => now()->subDays(3),
            'is_published' => true,
        ]);
    }
}
