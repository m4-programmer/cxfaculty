<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\ContactInquiry;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'totalPosts' => BlogPost::count(),
                'publishedPosts' => BlogPost::where('is_published', true)->count(),
                'draftPosts' => BlogPost::where('is_published', false)->count(),
                'totalViews' => (int) BlogPost::sum('views'),
                'unreadInquiries' => ContactInquiry::whereNull('read_at')->count(),
                'totalInquiries' => ContactInquiry::count(),
            ],
            'recentPosts' => BlogPost::with('author')
                ->orderByDesc('updated_at')
                ->take(5)
                ->get(['id', 'title', 'slug', 'is_published', 'published_at', 'updated_at']),
            'recentInquiries' => ContactInquiry::orderByDesc('created_at')
                ->take(5)
                ->get(['id', 'name', 'email', 'subject', 'read_at', 'created_at']),
        ]);
    }
}
