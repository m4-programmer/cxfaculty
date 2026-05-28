<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Models\BlogPost;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'featuredPosts' => BlogPost::published()
            ->orderByDesc('published_at')
            ->take(3)
            ->get(['title', 'excerpt', 'slug', 'published_at']),
    ]);
})->name('home');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.submit');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{post}', [BlogController::class, 'show'])->name('blog.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('admin/posts', BlogPostController::class)
        ->names('admin.posts')
        ->except(['show']);
});

require __DIR__.'/settings.php';
