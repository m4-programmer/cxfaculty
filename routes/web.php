<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\ContactInquiryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LandingPageController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('contact.submit');

Route::get('/community/join', [CommunityController::class, 'create'])->name('community.join');
Route::post('/community/join', [CommunityController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('community.join.submit');

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

    Route::get('/admin/landing', [LandingPageController::class, 'edit'])->name('admin.landing.edit');
    Route::put('/admin/landing', [LandingPageController::class, 'update'])->name('admin.landing.update');
});

require __DIR__.'/settings.php';
