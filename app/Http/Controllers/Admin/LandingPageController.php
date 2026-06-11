<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LandingPage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('admin/landing/edit', [
            'content' => LandingPage::current()->resolvedContent(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'content.seo.title' => ['required', 'string', 'max:255'],
            'content.seo.description' => ['required', 'string', 'max:500'],
            'content.hero.badge' => ['required', 'string', 'max:100'],
            'content.hero.headline' => ['required', 'string', 'max:500'],
            'content.hero.description' => ['required', 'string', 'max:1000'],
            'content.hero.cards' => ['required', 'array', 'min:1', 'max:4'],
            'content.hero.cards.*.label' => ['required', 'string', 'max:100'],
            'content.hero.cards.*.description' => ['required', 'string', 'max:500'],
            'content.hero.cta_consultation' => ['required', 'string', 'max:100'],
            'content.hero.cta_community' => ['required', 'string', 'max:100'],
            'content.hero.cta_blog' => ['required', 'string', 'max:100'],
            'content.sidebar.enabled' => ['required', 'boolean'],
            'content.sidebar.eyebrow' => ['required', 'string', 'max:100'],
            'content.sidebar.headline' => ['required', 'string', 'max:500'],
            'content.sidebar.description' => ['required', 'string', 'max:1000'],
            'content.services.enabled' => ['required', 'boolean'],
            'content.services.eyebrow' => ['required', 'string', 'max:100'],
            'content.services.headline' => ['required', 'string', 'max:500'],
            'content.services.items' => ['required', 'array', 'min:1', 'max:6'],
            'content.services.items.*.title' => ['required', 'string', 'max:150'],
            'content.services.items.*.description' => ['required', 'string', 'max:500'],
            'content.blog.enabled' => ['required', 'boolean'],
            'content.blog.eyebrow' => ['required', 'string', 'max:100'],
            'content.blog.headline' => ['required', 'string', 'max:500'],
            'content.blog.cta' => ['required', 'string', 'max:100'],
            'content.blog.empty_message' => ['required', 'string', 'max:500'],
            'content.contact.enabled' => ['required', 'boolean'],
            'content.contact.eyebrow' => ['required', 'string', 'max:100'],
            'content.contact.headline' => ['required', 'string', 'max:500'],
            'content.contact.description' => ['required', 'string', 'max:1000'],
            'content.contact.submit_label' => ['required', 'string', 'max:100'],
        ]);

        $landingPage = LandingPage::current();
        $landingPage->update([
            'content' => $validated['content'],
        ]);

        return back()->with('success', 'Landing page updated successfully.');
    }
}
