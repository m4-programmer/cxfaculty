<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        $posts = BlogPost::published()
            ->orderByDesc('published_at')
            ->get(['title', 'excerpt', 'slug', 'published_at']);

        return Inertia::render('blog/index', [
            'posts' => $posts,
        ]);
    }

    public function show(BlogPost $post): Response
    {
        abort_unless($post->is_published || Auth::check(), 404);

        return Inertia::render('blog/show', [
            'post' => $post,
        ]);
    }
}
