<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\ContactInquiryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\SitemapController;
use App\Models\BlogPost;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'featuredPosts' => BlogPost::published()
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
            ]),
    ]);
})->name('home');

Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('contact.submit');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{post}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::post('/admin/posts/upload-image', [ImageUploadController::class, 'store'])->name('admin.posts.upload-image');
    Route::post('/admin/posts/delete-image', [ImageUploadController::class, 'delete'])->name('admin.posts.delete-image');

    Route::patch('/admin/posts/{post}/toggle-published', [BlogPostController::class, 'togglePublished'])
        ->name('admin.posts.toggle-published');
    Route::post('/admin/posts/{post}/clone', [BlogPostController::class, 'clone'])
        ->name('admin.posts.clone');

    Route::resource('admin/posts', BlogPostController::class)
        ->names('admin.posts')
        ->except(['show']);

    Route::get('/admin/inquiries', [ContactInquiryController::class, 'index'])->name('admin.inquiries.index');
    Route::get('/admin/inquiries/{inquiry}', [ContactInquiryController::class, 'show'])->name('admin.inquiries.show');
    Route::delete('/admin/inquiries/{inquiry}', [ContactInquiryController::class, 'destroy'])->name('admin.inquiries.destroy');
});

require __DIR__.'/settings.php';
