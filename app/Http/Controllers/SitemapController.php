<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $posts = BlogPost::published()
            ->orderByDesc('published_at')
            ->get(['slug', 'updated_at']);

        $content = view('sitemap', [
            'posts' => $posts,
        ])->render();

        return response($content, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
