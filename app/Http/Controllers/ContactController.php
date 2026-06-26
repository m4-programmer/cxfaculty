<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Mail\ContactInquiryReceived;
use App\Models\ContactInquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;

class ContactController extends Controller
{
    public function store(StoreContactRequest $request): RedirectResponse
    {
        $key = 'contact-form:'.$request->ip();

        if (RateLimiter::tooManyAttempts($key, 5)) {
            return redirect()
                ->to(route('home').'#contact')
                ->withErrors([
                    'message' => 'Too many submissions. Please try again in a few minutes.',
                ]);
        }

        RateLimiter::hit($key, 300);

        $validated = $request->validated();

        $inquiry = ContactInquiry::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
        ]);

        Mail::to(config('cx.owner_email'))->send(new ContactInquiryReceived($inquiry));

        return redirect()
            ->to(route('home').'#contact')
            ->with([
                'success' => 'Thank you! Your inquiry has been received. We will get back to you shortly.',
                'contact_submitted' => true,
            ]);
    }
}
