<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateLandingPageRequest;
use App\Http\Requests\Admin\UpdateSiteIntegrationsRequest;
use App\Models\LandingPage;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
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
}
