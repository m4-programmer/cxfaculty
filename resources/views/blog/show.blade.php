@extends('layouts.cx')

@php
    $publishedAt = $post['published_at'] ?? null;
    $formattedDate = $publishedAt
        ? \Illuminate\Support\Carbon::parse($publishedAt)->format('F j, Y')
        : 'Draft';
@endphp

@section('meta')
    <title>{{ $post['title'] }} | CX Faculty</title>
    <meta name="description" content="{{ $post['excerpt'] }}">
    <link rel="canonical" href="{{ $seo['canonical'] }}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="{{ $post['title'] }}">
    <meta property="og:description" content="{{ $post['excerpt'] }}">
    <meta property="og:url" content="{{ $seo['canonical'] }}">
    <meta property="og:image" content="{{ $seo['ogImage'] }}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $post['title'] }}">
    <meta name="twitter:description" content="{{ $post['excerpt'] }}">
    <meta name="twitter:image" content="{{ $seo['ogImage'] }}">
    <script type="application/ld+json">{!! json_encode($seo['jsonLd'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
@endsection

@section('content')
    <div class="cx-page">
        <a href="{{ route('blog.index') }}" class="cx-back-link cx-reveal">
            ← Back to all articles
        </a>

        <article class="cx-article cx-reveal">
            @if (! $post['is_published'])
                <div class="cx-flash" style="margin-bottom: 1.5rem">
                    Draft preview — this post is not published yet.
                </div>
            @endif

            <header class="cx-article-header">
                @if (! empty($post['tags']))
                    <div class="cx-post-card-tags" style="margin-bottom: 1.25rem">
                        @foreach ($post['tags'] as $tag)
                            <a href="{{ route('blog.index', ['tag' => $tag]) }}" class="cx-post-card-tag">{{ $tag }}</a>
                        @endforeach
                    </div>
                @endif

                <h1>{{ $post['title'] }}</h1>
                <p style="font-size: 1.05rem; line-height: 1.8; color: rgba(255,255,255,0.65); margin-bottom: 1.5rem">
                    {{ $post['excerpt'] }}
                </p>

                <div class="cx-article-meta">
                    <span>By {{ $post['author']['name'] }}</span>
                    <time datetime="{{ $publishedAt }}">{{ $formattedDate }}</time>
                    <span>{{ $post['reading_time'] }} min read</span>
                    <span>{{ $post['views'] }} views</span>
                </div>

                <div style="margin-bottom: 2rem">
                    @include('cx.partials.share-buttons', [
                        'url' => $seo['canonical'],
                        'title' => $post['title'],
                    ])
                </div>
            </header>

            @if (! empty($post['featured_image']))
                <figure style="margin-bottom: 2rem; overflow: hidden; border: 1px solid rgba(255,255,255,0.08)">
                    <img src="{{ $post['featured_image'] }}" alt="{{ $post['title'] }}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover">
                </figure>
            @endif

            <div class="cx-article-body">
                {!! $post['body'] !!}
            </div>
        </article>

        @if (count($relatedPosts) > 0)
            <section class="cx-blog" style="padding: 6rem 0 0">
                <div class="cx-blog-header cx-reveal" style="margin-bottom: 2.5rem">
                    <div>
                        <div class="cx-section-label">
                            <span>Continue exploring</span>
                        </div>
                        <h2 class="cx-headline">{{ $relatedPostsHeading }}</h2>
                    </div>
                    <a href="{{ route('blog.index') }}" class="cx-btn-outline">View all posts</a>
                </div>
                <div class="cx-blog-grid">
                    @foreach ($relatedPosts as $related)
                        @include('cx.partials.post-card', ['post' => $related])
                    @endforeach
                </div>
            </section>
        @endif
    </div>
@endsection
