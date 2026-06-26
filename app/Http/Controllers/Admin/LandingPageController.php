<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateLandingPageRequest;
use App\Http\Requests\Admin\UpdateSiteAppearanceRequest;
use App\Http\Requests\Admin\UpdateSiteIntegrationsRequest;
use App\Http\Requests\Admin\UpdateSiteScriptsRequest;
use App\Http\Requests\Admin\UploadSiteLogoRequest;
use App\Models\LandingPage;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    public function edit(): Response
    {
        $siteSetting = SiteSetting::current();

        return Inertia::render('admin/landing/edit', [
            'content' => LandingPage::current()->resolvedContent(),
            'integrations' => array_merge(
                SiteSetting::defaultIntegrations(),
                $siteSetting->integrations ?? [],
            ),
            'appearance' => $siteSetting->resolvedAppearance(),
            'scripts' => $siteSetting->resolvedScripts(),
        ]);
    }

    public function update(UpdateLandingPageRequest $request): RedirectResponse
    {
        $landingPage = LandingPage::current();
        $landingPage->update([
            'content' => LandingPage::normalizeContent($request->validated('content')),
        ]);

        return back()->with('success', 'Landing page updated successfully.');
    }

    public function updateIntegrations(UpdateSiteIntegrationsRequest $request): RedirectResponse
    {
        SiteSetting::current()->update([
            'integrations' => $request->validated('integrations'),
        ]);

        return back()->with('success', 'WhatsApp and community settings updated successfully.');
    }

    public function updateAppearance(UpdateSiteAppearanceRequest $request): RedirectResponse
    {
        $current = SiteSetting::current();
        $appearance = SiteSetting::normalizeAppearance(array_merge(
            $current->resolvedAppearance(),
            $request->validated('appearance'),
        ));

        $current->update(['appearance' => $appearance]);

        return back()->with('success', 'Logo and blog appearance updated successfully.');
    }

    public function uploadLogo(UploadSiteLogoRequest $request): RedirectResponse
    {
        $current = SiteSetting::current();
        $appearance = $current->resolvedAppearance();
        $existingUrl = $appearance['logo']['url'] ?? '/logo.png';

        if (str_starts_with($existingUrl, '/storage/site/')) {
            $existingPath = str_replace('/storage/', '', $existingUrl);
            Storage::disk('public')->delete($existingPath);
        }

        $path = $request->file('logo')->store('site', 'public');
        $appearance['logo']['url'] = Storage::url($path);

        $current->update(['appearance' => $appearance]);

        return back()->with('success', 'Logo uploaded successfully.');
    }

    public function updateScripts(UpdateSiteScriptsRequest $request): RedirectResponse
    {
        SiteSetting::current()->update([
            'scripts' => $request->validated('scripts'),
        ]);

        return back()->with('success', 'Third-party scripts updated successfully.');
    }
}
