<?php

namespace App\Http\Controllers;

use App\Models\CommunityMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Inertia\Response;

class CommunityController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('community/join', [
            'whatsappCommunityUrl' => config('cx.whatsapp_community_url'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $key = 'community-join:'.$request->ip();

        if (RateLimiter::tooManyAttempts($key, 5)) {
            return back()->withErrors([
                'email' => 'Too many submissions. Please try again in a few minutes.',
            ]);
        }

        RateLimiter::hit($key, 300);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'website' => ['nullable', 'max:0'],
        ]);

        CommunityMember::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'ip_address' => $request->ip(),
        ]);

        return back()->with([
            'success' => 'You are in! Use the link below to join our WhatsApp community.',
            'communityJoined' => true,
        ]);
    }
}
