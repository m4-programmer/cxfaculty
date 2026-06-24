@extends('layouts.cx')

@section('meta')
    <title>Blog | CX Faculty</title>
    <meta name="description" content="Explore customer experience articles, strategy guides, and practical insights from CX Faculty.">
    <link rel="canonical" href="{{ route('blog.index') }}">
@endsection

@section('content')
    <div class="cx-page">
        <header class="cx-page-hero cx-reveal">
            <div class="cx-section-label">
                <span>Latest Insights</span>
            </div>
            <h1>Stories and frameworks from the front lines of CX.</h1>
            <p>
                {{ $totalPublished }} published {{ $totalPublished === 1 ? 'article' : 'articles' }} on strategy, customer
                journeys, and building better experiences.
            </p>
        </header>

        <section class="cx-blog-toolbar cx-reveal">
            <form method="get" action="{{ route('blog.index') }}" class="cx-blog-search">
                <input
                    type="search"
                    name="search"
                    value="{{ $filters['search'] ?? '' }}"
                    placeholder="Search articles, topics, or tags…"
                >
                @if (! empty($filters['tag']))
                    <input type="hidden" name="tag" value="{{ $filters['tag'] }}">
                @endif
                <button type="submit" class="cx-btn-primary">Search</button>
            </form>
            @if (! empty($filters['search']) || ! empty($filters['tag']))
                <a href="{{ route('blog.index') }}" class="cx-btn-outline">Clear filters</a>
            @endif
        </section>

        @if ($popularTags->isNotEmpty())
            <div class="cx-tag-list cx-reveal">
                @foreach ($popularTags as $tag)
                    <a
                        href="{{ route('blog.index', array_filter(['tag' => $tag, 'search' => $filters['search'] ?? null])) }}"
                        class="cx-tag {{ ($filters['tag'] ?? '') === $tag ? 'active' : '' }}"
                    >{{ $tag }}</a>
                @endforeach
            </div>
        @endif

        @if ($posts->count() > 0)
            <div class="cx-blog-grid">
                @foreach ($posts as $post)
                    @include('cx.partials.post-card', ['post' => $post])
                @endforeach
            </div>
        @else
            <div class="cx-empty cx-reveal">
                <p>No articles found.</p>
                <a href="{{ route('blog.index') }}" class="cx-btn-primary" style="margin-top: 1.5rem; display: inline-flex;">
                    View all posts
                </a>
            </div>
        @endif

        {{ $posts->links('vendor.pagination.cx') }}
    </div>
@endsection
