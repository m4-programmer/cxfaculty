@extends('layouts.cx')

@section('meta')
    <title>{{ $landing['seo']['title'] }}</title>
    <meta name="description" content="{{ $landing['seo']['description'] }}">
    <link rel="canonical" href="{{ url('/') }}">
@endsection

@section('content')
    <section class="cx-hero">
        <div class="cx-hero-grid-line"></div>
        <div class="cx-hero-content">
            <div class="cx-hero-eyebrow">
                <span>{{ $landing['hero']['eyebrow'] }}</span>
            </div>
            <h1>
                @foreach ($landing['hero']['headline_lines'] as $line)
                    {{ $line }}<br>
                @endforeach
                <em>{{ $landing['hero']['headline_emphasis'] }}</em>
            </h1>
            <p class="cx-hero-desc">{{ $landing['hero']['description'] }}</p>
            <div class="cx-hero-actions">
                <a href="#services" class="cx-btn-primary">
                    {{ $landing['hero']['cta_primary'] }}
                    @include('cx.partials.arrow-icon')
                </a>
                <a href="#process" class="cx-btn-outline">
                    {{ $landing['hero']['cta_secondary'] }}
                </a>
            </div>
        </div>
        <div class="cx-hero-visual">
            <div class="cx-hero-stat-grid">
                @foreach ($landing['hero']['stats'] as $stat)
                    <div class="cx-hero-stat">
                        <div class="cx-hero-stat-num">{{ $stat['value'] }}</div>
                        <div class="cx-hero-stat-label">{{ $stat['label'] }}</div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    @if ($landing['ticker']['enabled'])
        <div class="cx-ticker">
            <div class="cx-ticker-track">
                @foreach (array_merge($landing['ticker']['items'], $landing['ticker']['items']) as $item)
                    <span class="cx-ticker-item">
                        <span class="cx-ticker-dot"></span>
                        {{ $item }}
                    </span>
                @endforeach
            </div>
        </div>
    @endif

    @if ($landing['philosophy']['enabled'])
        <section class="cx-philosophy">
            <div class="cx-reveal">
                <div class="cx-section-label">
                    <span>{{ $landing['philosophy']['eyebrow'] }}</span>
                </div>
                @include('cx.partials.headline', [
                    'lines' => $landing['philosophy']['headline_lines'],
                    'emphasis' => $landing['philosophy']['headline_emphasis'],
                ])
                @foreach ($landing['philosophy']['paragraphs'] as $paragraph)
                    <p>{{ $paragraph }}</p>
                @endforeach
            </div>
            <div class="cx-reveal">
                @foreach ($landing['philosophy']['pillars'] as $pillar)
                    <div class="cx-pillar">
                        <span class="cx-pillar-num">{{ $pillar['number'] }}</span>
                        <div>
                            <h4>{{ $pillar['title'] }}</h4>
                            <p>{{ $pillar['description'] }}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </section>
    @endif

    @if ($landing['services']['enabled'])
        <section class="cx-services" id="services">
            <div class="cx-services-header cx-reveal">
                <div>
                    <div class="cx-section-label">
                        <span>{{ $landing['services']['eyebrow'] }}</span>
                    </div>
                    @include('cx.partials.headline', [
                        'lines' => $landing['services']['headline_lines'],
                        'emphasis' => $landing['services']['headline_emphasis'],
                    ])
                </div>
                <p>{{ $landing['services']['description'] }}</p>
            </div>
            <div class="cx-services-grid">
                @foreach ($landing['services']['items'] as $service)
                    <div class="cx-service-card cx-reveal">
                        <div class="cx-service-num">{{ $service['number'] }}</div>
                        <h3>{{ $service['title'] }}</h3>
                        <p>{{ $service['description'] }}</p>
                        <ul class="cx-service-features">
                            @foreach ($service['features'] as $feature)
                                <li>{{ $feature }}</li>
                            @endforeach
                        </ul>
                        <a href="#contact" class="cx-service-link">
                            {{ $service['cta_label'] }}
                            @include('cx.partials.arrow-icon', ['class' => 'h-3.5 w-3.5'])
                        </a>
                    </div>
                @endforeach
            </div>
        </section>
    @endif

    @if ($landing['process']['enabled'])
        <section class="cx-process" id="process">
            <div class="cx-process-header cx-reveal">
                <div class="cx-section-label center">
                    <span>{{ $landing['process']['eyebrow'] }}</span>
                </div>
                <h2 class="cx-headline" style="text-align: center">
                    {{ $landing['process']['headline'] }} <em>{{ $landing['process']['headline_emphasis'] }}</em>
                </h2>
                <p>{{ $landing['process']['description'] }}</p>
            </div>
            <div class="cx-process-steps">
                @foreach ($landing['process']['steps'] as $step)
                    <div class="cx-process-step cx-reveal">
                        <div class="cx-step-circle">
                            <span class="cx-step-num">{{ $step['number'] }}</span>
                        </div>
                        <h4>{{ $step['title'] }}</h4>
                        <p>{{ $step['description'] }}</p>
                    </div>
                @endforeach
            </div>
        </section>
    @endif

    @if ($landing['manifesto']['enabled'])
        <section class="cx-manifesto">
            <blockquote class="cx-reveal">
                &ldquo;{{ $landing['manifesto']['quote'] }} <em>{{ $landing['manifesto']['quote_emphasis'] }}</em>&rdquo;
            </blockquote>
            <cite>{{ $landing['manifesto']['attribution'] }}</cite>
        </section>
    @endif

    @if ($landing['why']['enabled'])
        <section class="cx-why" id="why">
            <div class="cx-why-inner">
                <div class="cx-why-left cx-reveal">
                    <div class="cx-section-label">
                        <span>{{ $landing['why']['eyebrow'] }}</span>
                    </div>
                    @include('cx.partials.headline', [
                        'lines' => $landing['why']['headline_lines'],
                        'emphasis' => $landing['why']['headline_emphasis'],
                    ])
                    <p>{{ $landing['why']['description'] }}</p>
                    <a href="{{ $conversationUrl }}" class="cx-btn-primary" target="_blank" rel="noopener noreferrer">
                        {{ $landing['why']['cta_label'] }}
                        @include('cx.partials.arrow-icon')
                    </a>
                </div>
                <div class="cx-why-right cx-reveal">
                    @foreach ($landing['why']['cards'] as $card)
                        <div class="cx-why-card">
                            <h4>{{ $card['title'] }}</h4>
                            <p>{{ $card['description'] }}</p>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    @endif

    @if ($landing['industries']['enabled'])
        <section class="cx-industries" id="industries">
            <div class="cx-reveal">
                <div class="cx-section-label">
                    <span>{{ $landing['industries']['eyebrow'] }}</span>
                </div>
                @include('cx.partials.headline', [
                    'lines' => $landing['industries']['headline_lines'],
                    'emphasis' => $landing['industries']['headline_emphasis'],
                ])
            </div>
            <div class="cx-industry-list cx-reveal">
                @foreach ($landing['industries']['items'] as $industry)
                    <div class="cx-industry-item">
                        <span class="cx-industry-name">{{ $industry }}</span>
                        @include('cx.partials.industry-arrow')
                    </div>
                @endforeach
            </div>
        </section>
    @endif

    @if ($landing['blog']['enabled'])
        <section class="cx-blog" id="blog">
            <div class="cx-blog-header cx-reveal">
                <div>
                    <div class="cx-section-label">
                        <span>{{ $landing['blog']['eyebrow'] }}</span>
                    </div>
                    <h2 class="cx-headline">
                        {{ $landing['blog']['headline'] }} <em>{{ $landing['blog']['headline_emphasis'] }}</em>
                    </h2>
                </div>
                <a href="{{ route('blog.index') }}" class="cx-btn-outline">
                    {{ $landing['blog']['cta'] }}
                </a>
            </div>
            <div class="cx-blog-grid">
                @forelse ($featuredPosts as $post)
                    @include('cx.partials.post-card', ['post' => $post])
                @empty
                    <div class="cx-reveal rounded-xl border border-white/10 bg-black/40 p-8 text-white/70 md:col-span-2 lg:col-span-3">
                        {{ $landing['blog']['empty_message'] }}
                    </div>
                @endforelse
            </div>
        </section>
    @endif

    @if ($landing['community']['enabled'])
        <section class="cx-community" id="community">
            <div class="cx-community-inner cx-reveal">
                <div>
                    <div class="cx-section-label">
                        <span>{{ $landing['community']['eyebrow'] }}</span>
                    </div>
                    <h2 class="cx-headline">{{ $landing['community']['headline'] }}</h2>
                    <p>{{ $landing['community']['description'] }}</p>
                </div>
                <a href="{{ route('community.join') }}" class="cx-btn-primary">
                    {{ $landing['community']['cta_label'] }}
                    @include('cx.partials.arrow-icon')
                </a>
            </div>
        </section>
    @endif

    @if ($landing['contact']['enabled'])
        <section class="cx-contact" id="contact">
            <div class="cx-contact-grid cx-reveal">
                <div>
                    <div class="cx-section-label">
                        <span>{{ $landing['contact']['eyebrow'] }}</span>
                    </div>
                    <h2 class="cx-headline">{{ $landing['contact']['headline'] }}</h2>
                    <p>{{ $landing['contact']['description'] }}</p>
                    @if (session('success'))
                        <div class="cx-flash">{{ session('success') }}</div>
                    @endif
                </div>
                <form method="post" action="{{ route('contact.submit') }}" class="cx-form">
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
                    <div class="cx-form-row">
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
                    </div>
                    <label>
                        Subject
                        <input type="text" name="subject" value="{{ old('subject') }}" required placeholder="What would you like help with?">
                        @error('subject')
                            <p class="cx-form-error">{{ $message }}</p>
                        @enderror
                    </label>
                    <label>
                        Message
                        <textarea name="message" rows="5" required placeholder="Tell us about your project">{{ old('message') }}</textarea>
                        @error('message')
                            <p class="cx-form-error">{{ $message }}</p>
                        @enderror
                    </label>
                    <button type="submit" class="cx-btn-primary">
                        {{ $landing['contact']['submit_label'] }}
                    </button>
                </form>
            </div>
        </section>
    @endif

    @if ($landing['cta_strip']['enabled'])
        <section class="cx-cta-strip">
            <div class="cx-reveal">
                <h2>{{ $landing['cta_strip']['headline'] }}</h2>
                <p>{{ $landing['cta_strip']['description'] }}</p>
            </div>
            <a href="{{ $discoveryCallUrl }}" class="cx-btn-dark cx-reveal" target="_blank" rel="noopener noreferrer">
                {{ $landing['cta_strip']['button_label'] }}
                @include('cx.partials.arrow-icon')
            </a>
        </section>
    @endif
@endsection
