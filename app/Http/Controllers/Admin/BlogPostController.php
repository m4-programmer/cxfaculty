<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Services\HtmlSanitizer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', BlogPost::class);

        $query = BlogPost::with('author');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('tags', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            if ($request->input('status') === 'published') {
                $query->where('is_published', true);
            } elseif ($request->input('status') === 'draft') {
                $query->where('is_published', false);
            }
        }

        $posts = $query->orderByDesc('updated_at')->paginate(10)->withQueryString();

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
            'filters' => $request->only('search', 'status'),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', BlogPost::class);

        return Inertia::render('admin/posts/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create', BlogPost::class);

        $validated = $this->validatePost($request);

        BlogPost::create([
            'author_id' => Auth::id(),
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'excerpt' => $validated['excerpt'],
            'body' => HtmlSanitizer::clean($validated['body']),
            'featured_image' => $validated['featured_image'] ?? null,
            'tags' => $validated['tags'] ?? null,
            'reading_time' => $this->readingTime($validated['body']),
            'published_at' => $validated['published_at'] ?? now(),
            'is_published' => $validated['is_published'] ?? false,
        ]);

        return to_route('admin.posts.index')->with('success', 'Blog post created successfully.');
    }

    public function edit(BlogPost $post): Response
    {
        $this->authorize('update', $post);

        return Inertia::render('admin/posts/edit', [
            'post' => $post->load('author'),
        ]);
    }

    public function update(Request $request, BlogPost $post): RedirectResponse
    {
        $this->authorize('update', $post);

        $validated = $this->validatePost($request, $post);

        $post->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'excerpt' => $validated['excerpt'],
            'body' => HtmlSanitizer::clean($validated['body']),
            'featured_image' => $validated['featured_image'] ?? $post->featured_image,
            'tags' => $validated['tags'] ?? null,
            'reading_time' => $this->readingTime($validated['body']),
            'published_at' => $validated['published_at'] ?? now(),
            'is_published' => $validated['is_published'] ?? false,
        ]);

        return to_route('admin.posts.index')->with('success', 'Blog post updated successfully.');
    }

    public function destroy(BlogPost $post): RedirectResponse
    {
        $this->authorize('delete', $post);

        $post->delete();

        return to_route('admin.posts.index')->with('success', 'Blog post deleted successfully.');
    }

    public function togglePublished(BlogPost $post): RedirectResponse
    {
        $this->authorize('update', $post);

        $isPublished = ! $post->is_published;

        $post->update([
            'is_published' => $isPublished,
            'published_at' => $isPublished && ! $post->published_at ? now() : $post->published_at,
        ]);

        $message = $isPublished ? 'Post published.' : 'Post moved to drafts.';

        return back()->with('success', $message);
    }

    public function clone(BlogPost $post): RedirectResponse
    {
        $this->authorize('view', $post);
        $this->authorize('create', BlogPost::class);

        $clone = BlogPost::create([
            'author_id' => Auth::id(),
            'title' => $post->title.' (Copy)',
            'slug' => $this->uniqueSlug($post->slug.'-copy'),
            'excerpt' => $post->excerpt,
            'body' => $post->body,
            'featured_image' => $post->featured_image,
            'tags' => $post->tags,
            'reading_time' => $post->reading_time,
            'views' => 0,
            'published_at' => null,
            'is_published' => false,
        ]);

        return to_route('admin.posts.edit', $clone)
            ->with('success', 'Post duplicated. Review the copy and publish when ready.');
    }

    private function uniqueSlug(string $base): string
    {
        $slug = $base;
        $counter = 1;

        while (BlogPost::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$counter;
            $counter++;
        }

        return $slug;
    }

    private function validatePost(Request $request, ?BlogPost $post = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('blog_posts', 'slug')->ignore($post?->id)],
            'excerpt' => ['required', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'featured_image' => ['nullable', 'string', 'max:500'],
            'tags' => ['nullable', 'string', 'max:255'],
            'published_at' => ['nullable', 'date_format:Y-m-d\TH:i'],
            'is_published' => ['nullable', 'boolean'],
        ]);
    }

    private function readingTime(string $body): int
    {
        $wordCount = str_word_count(strip_tags($body));

        return max(1, (int) ceil($wordCount / 200));
    }
}
