<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->text('body')->change();
            $table->integer('reading_time')->nullable()->after('body');
            $table->string('tags')->nullable()->after('reading_time');
            $table->integer('views')->default(0)->after('tags');
        });
    }

    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn(['reading_time', 'tags', 'views']);
        });
    }
};
