<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(Request $request): Response
    {
        $query = BlogPost::published();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('body', 'like', "%{$search}%")
                    ->orWhere('tags', 'like', "%{$search}%");
            });
        }

        if ($request->filled('tag')) {
            $query->where('tags', 'like', '%'.$request->input('tag').'%');
        }

        $posts = $query->orderByDesc('published_at')
            ->paginate(12)
            ->withQueryString();

        $posts->getCollection()->transform(fn (BlogPost $post) => $this->transformPostSummary($post));

        $allTags = BlogPost::published()
            ->whereNotNull('tags')
            ->pluck('tags')
            ->flatMap(fn ($tags) => array_filter(array_map('trim', explode(',', $tags))))
            ->countBy()
            ->sortDesc()
            ->take(12)
            ->keys()
            ->values();

        return Inertia::render('blog/index', [
            'posts' => $posts,
            'filters' => $request->only('search', 'tag'),
            'popularTags' => $allTags,
            'totalPublished' => BlogPost::published()->count(),
        ]);
    }

    public function show(BlogPost $post): Response
    {
        $canPreview = Auth::check() && Auth::user()->is_admin;
        abort_unless($post->is_published || $canPreview, 404);

        if ($post->is_published) {
            $post->increment('views');
        }

        $post->load('author');

        $relatedPosts = $this->getRelatedPosts($post, 6);
        $hasTagMatches = $this->hasTagMatches($post);

        $canonicalUrl = url('/blog/'.$post->slug);
        $featuredImage = $post->featured_image
            ? (str_starts_with($post->featured_image, 'http') ? $post->featured_image : url($post->featured_image))
            : url('/images/og-image.png');

        return Inertia::render('blog/show', [
            'post' => [
                'title' => $post->title,
                'excerpt' => $post->excerpt,
                'body' => $post->body,
                'slug' => $post->slug,
                'published_at' => $post->published_at?->toIso8601String(),
                'featured_image' => $post->featured_image,
                'tags' => $post->tags ? array_filter(array_map('trim', explode(',', $post->tags))) : [],
                'reading_time' => $post->reading_time ?? 1,
                'views' => $post->views,
                'is_published' => $post->is_published,
                'author' => [
                    'name' => $post->author?->name ?? 'CX Faculty Team',
                ],
            ],
            'relatedPosts' => $relatedPosts,
            'relatedPostsHeading' => $hasTagMatches ? 'Related articles' : 'Keep reading',
            'seo' => [
                'canonical' => $canonicalUrl,
                'ogImage' => $featuredImage,
                'jsonLd' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'BlogPosting',
                    'headline' => $post->title,
                    'description' => $post->excerpt,
                    'image' => $featuredImage,
                    'datePublished' => $post->published_at?->toIso8601String(),
                    'dateModified' => $post->updated_at?->toIso8601String(),
                    'author' => [
                        '@type' => 'Person',
                        'name' => $post->author?->name ?? 'CX Faculty Team',
                    ],
                    'publisher' => [
                        '@type' => 'Organization',
                        'name' => config('app.name', 'CX Faculty'),
                    ],
                    'mainEntityOfPage' => $canonicalUrl,
                ],
            ],
        ]);
    }

    private function getRelatedPosts(BlogPost $post, int $limit = 6): array
    {
        $excludeIds = collect([$post->id]);
        $related = collect();

        $tags = $post->tags
            ? array_filter(array_map('trim', explode(',', $post->tags)))
            : [];

        if ($tags !== []) {
            $tagged = BlogPost::published()
                ->where('id', '!=', $post->id)
                ->where(function ($query) use ($tags) {
                    foreach ($tags as $tag) {
                        $query->orWhere('tags', 'like', '%'.$tag.'%');
                    }
                })
                ->orderByDesc('published_at')
                ->take($limit)
                ->get();

            $related = $related->merge($tagged);
            $excludeIds = $excludeIds->merge($tagged->pluck('id'));
        }

        if ($related->count() < $limit) {
            $remaining = $limit - $related->count();

            $more = BlogPost::published()
                ->whereNotIn('id', $excludeIds->unique()->all())
                ->orderByDesc('published_at')
                ->take($remaining)
                ->get();

            $related = $related->merge($more);
        }

        return $related
            ->map(fn (BlogPost $related) => $this->transformPostSummary($related))
            ->values()
            ->all();
    }

    private function hasTagMatches(BlogPost $post): bool
    {
        $tags = $post->tags
            ? array_filter(array_map('trim', explode(',', $post->tags)))
            : [];

        if ($tags === []) {
            return false;
        }

        return BlogPost::published()
            ->where('id', '!=', $post->id)
            ->where(function ($query) use ($tags) {
                foreach ($tags as $tag) {
                    $query->orWhere('tags', 'like', '%'.$tag.'%');
                }
            })
            ->exists();
    }

    private function transformPostSummary(BlogPost $post): array
    {
        return [
            'title' => $post->title,
            'excerpt' => $post->excerpt,
            'slug' => $post->slug,
            'published_at' => $post->published_at?->toIso8601String(),
            'featured_image' => $post->featured_image,
            'tags' => $post->tags ? array_filter(array_map('trim', explode(',', $post->tags))) : [],
            'reading_time' => $post->reading_time ?? 1,
            'views' => $post->views ?? 0,
        ];
    }
}
