<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    public function index(): Response
    {
        $posts = BlogPost::orderByDesc('published_at')
            ->get(['id', 'title', 'slug', 'published_at', 'is_published']);

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/posts/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('blog_posts', 'slug')],
            'excerpt' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'published_at' => ['nullable', 'date'],
            'is_published' => ['boolean'],
        ]);

        BlogPost::create([
            'author_id' => Auth::id(),
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'excerpt' => $validated['excerpt'],
            'body' => $validated['body'],
            'published_at' => $validated['published_at'] ?? now(),
            'is_published' => $validated['is_published'] ?? false,
        ]);

        return to_route('admin.posts.index')->with('success', 'Blog post created.');
    }

    public function edit(BlogPost $post): Response
    {
        return Inertia::render('admin/posts/edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, BlogPost $post): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('blog_posts', 'slug')->ignore($post->id)],
            'excerpt' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'published_at' => ['nullable', 'date'],
            'is_published' => ['boolean'],
        ]);

        $post->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'excerpt' => $validated['excerpt'],
            'body' => $validated['body'],
            'published_at' => $validated['published_at'] ?? now(),
            'is_published' => $validated['is_published'] ?? false,
        ]);

        return to_route('admin.posts.index')->with('success', 'Blog post updated.');
    }

    public function destroy(BlogPost $post): RedirectResponse
    {
        BlogPost::destroy($post->id);

        return to_route('admin.posts.index')->with('success', 'Blog post deleted.');
    }
}
