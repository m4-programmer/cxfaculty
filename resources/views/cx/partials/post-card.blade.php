@php
    $publishedAt = $post['published_at'] ?? null;
    $formattedDate = $publishedAt
        ? \Illuminate\Support\Carbon::parse($publishedAt)->format('F j, Y')
        : 'Draft';
@endphp

<article class="cx-post-card cx-reveal">
    <a href="{{ route('blog.show', $post['slug']) }}" class="cx-post-card-image">
        @if (! empty($post['featured_image']))
            <img src="{{ $post['featured_image'] }}" alt="{{ $post['title'] }}" loading="lazy">
        @else
            <div class="cx-post-card-placeholder">CX Faculty</div>
        @endif
    </a>
    <div class="cx-post-card-body">
        @if (! empty($post['tags']))
            <div class="cx-post-card-tags">
                @foreach (array_slice($post['tags'], 0, 3) as $tag)
                    <a href="{{ route('blog.index', ['tag' => $tag]) }}" class="cx-post-card-tag">{{ $tag }}</a>
                @endforeach
            </div>
        @endif
        <a href="{{ route('blog.show', $post['slug']) }}">
            <h3>{{ $post['title'] }}</h3>
            <p>{{ $post['excerpt'] }}</p>
        </a>
        <div class="cx-post-card-meta">
            <time datetime="{{ $publishedAt }}">{{ $formattedDate }}</time>
            <span>{{ $post['reading_time'] ?? 1 }} min read</span>
            <a href="{{ route('blog.show', $post['slug']) }}" class="cx-post-card-link">
                Read article
                @include('cx.partials.arrow-icon')
            </a>
        </div>
    </div>
</article>
