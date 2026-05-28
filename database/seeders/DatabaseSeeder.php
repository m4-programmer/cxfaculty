<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        \App\Models\BlogPost::create([
            'author_id' => $user->id,
            'title' => 'Launching a customer-first experience in 30 days',
            'slug' => 'launching-a-customer-first-experience-in-30-days',
            'excerpt' => 'A practical roadmap for tuning your web presence, content, and blog workflow around customer experience.',
            'body' => '<p>Start by auditing the experience, then map every touchpoint from the first visit through support. Publish thoughtful articles that educate your audience and build trust at every stage.</p>\n<p>Use clear headlines, fast page loads, and mobile-friendly sections so your messaging converts across devices.</p>',
            'published_at' => now(),
            'is_published' => true,
        ]);
    }
}
