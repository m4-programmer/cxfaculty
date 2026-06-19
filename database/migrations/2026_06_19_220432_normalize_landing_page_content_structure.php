<?php

use App\Models\LandingPage;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasTable('landing_pages')) {
            return;
        }

        LandingPage::query()->each(function (LandingPage $landingPage): void {
            $landingPage->update([
                'content' => LandingPage::normalizeContent($landingPage->content),
            ]);
        });

        LandingPage::query()->firstOrCreate([], [
            'content' => LandingPage::defaultContent(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Content normalization is not reversible.
    }
};
