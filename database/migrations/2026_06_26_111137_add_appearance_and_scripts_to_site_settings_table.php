<?php

use App\Models\SiteSetting;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->json('appearance')->nullable()->after('integrations');
            $table->json('scripts')->nullable()->after('appearance');
        });

        SiteSetting::query()->each(function (SiteSetting $setting): void {
            $setting->update([
                'appearance' => SiteSetting::defaultAppearance(),
                'scripts' => SiteSetting::defaultScripts(),
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn(['appearance', 'scripts']);
        });
    }
};
