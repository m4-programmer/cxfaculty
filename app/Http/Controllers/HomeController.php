<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\LandingPage;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('home', [
            'landing' => LandingPage::current()->resolvedContent(),
            'featuredPosts' => $this->featuredPosts(),
        ]);
    }

    /**
     * @return Collection<int, array<string, mixed>>
     */
    protected function featuredPosts(): Collection
    {
        return BlogPost::published()
            ->orderByDesc('published_at')
            ->take(3)
            ->get(['title', 'excerpt', 'slug', 'published_at', 'featured_image', 'reading_time', 'tags'])
            ->map(fn (BlogPost $post) => [
                'title' => $post->title,
                'excerpt' => $post->excerpt,
                'slug' => $post->slug,
                'published_at' => $post->published_at?->toIso8601String(),
                'featured_image' => $post->featured_image,
                'reading_time' => $post->reading_time ?? 1,
                'tags' => $post->tags ? array_filter(array_map('trim', explode(',', $post->tags))) : [],
            ]);
    }
}
