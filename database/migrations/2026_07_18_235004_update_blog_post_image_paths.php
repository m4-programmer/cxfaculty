<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update existing image paths from /storage/blog-images/ to /blog-images/
        DB::table('blog_posts')
            ->whereNotNull('featured_image')
            ->where('featured_image', 'like', '%/storage/blog-images/%')
            ->update([
                'featured_image' => DB::raw("REPLACE(featured_image, '/storage/blog-images/', '/blog-images/')"),
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert paths back to /storage/blog-images/
        DB::table('blog_posts')
            ->whereNotNull('featured_image')
            ->where('featured_image', 'like', '%/blog-images/%')
            ->where('featured_image', 'not like', '%/storage/blog-images/%')
            ->update([
                'featured_image' => DB::raw("REPLACE(featured_image, '/blog-images/', '/storage/blog-images/')"),
            ]);
    }
};
