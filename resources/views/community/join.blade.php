@extends('layouts.cx')

@section('meta')
    <title>Join the Community | CX Faculty</title>
    <meta name="description" content="Join the CX Faculty WhatsApp community for customer experience insights, discussions, and updates.">
    <link rel="canonical" href="{{ route('community.join') }}">
@endsection

@section('content')
    <div class="cx-page">
        <a href="{{ route('home') }}" class="cx-back-link cx-reveal">
            ← Back to home
        </a>

        <section class="cx-community-inner cx-reveal" style="max-width: 720px">
            <div>
                <div class="cx-section-label">
                    <span>Join the Community</span>
                </div>
                <h2 class="cx-headline">Connect with CX leaders</h2>
                <p>
                    Connect with other customer experience professionals, share ideas, and get early access to new
                    content and events.
                </p>
            </div>

            @if (session('communityJoined') && session('success'))
                <div class="cx-flash">
                    <p>{{ session('success') }}</p>
                    @if ($whatsappCommunityUrl)
                        <a
                            href="{{ $whatsappCommunityUrl }}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="cx-btn-primary"
                            style="margin-top: 1.25rem"
                        >
                            Open WhatsApp community
                        </a>
                    @else
                        <p style="margin-top: 1rem; font-size: 0.875rem">
                            The WhatsApp invite link will be shared with you shortly.
                        </p>
                    @endif
                </div>
            @else
                <form method="post" action="{{ route('community.join.submit') }}" class="cx-form" style="margin-top: 2rem">
                    @csrf
                    <input
                        type="text"
                        name="website"
                        value="{{ old('website') }}"
                        tabindex="-1"
                        autocomplete="off"
                        class="hidden"
                        aria-hidden="true"
                    >

                    <label>
                        Name
                        <input type="text" name="name" value="{{ old('name') }}" required placeholder="Your name">
                        @error('name')
                            <p class="cx-form-error">{{ $message }}</p>
                        @enderror
                    </label>

                    <label>
                        Email
                        <input type="email" name="email" value="{{ old('email') }}" required placeholder="email@example.com">
                        @error('email')
                            <p class="cx-form-error">{{ $message }}</p>
                        @enderror
                    </label>

                    <label>
                        Phone <span style="color: rgba(255,255,255,0.4)">(optional)</span>
                        <input type="tel" name="phone" value="{{ old('phone') }}" placeholder="+1 555 000 0000">
                        @error('phone')
                            <p class="cx-form-error">{{ $message }}</p>
                        @enderror
                    </label>

                    <button type="submit" class="cx-btn-primary">Join community</button>
                </form>
            @endif
        </section>
    </div>
@endsection
