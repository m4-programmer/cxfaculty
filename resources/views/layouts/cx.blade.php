@php
    $blogThemeStyle = ($applyBlogTheme ?? false)
        ? '--cx-amber: '.$blogTheme['accent'].'; --cx-amber-dark: '.$blogTheme['accent_dark'].'; --cx-black: '.$blogTheme['background'].'; --cx-white: '.$blogTheme['text'].'; background: '.$blogTheme['background'].'; color: '.$blogTheme['text'].';'
        : '';
@endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="cx-html">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @hasSection('meta')
        @yield('meta')
    @else
        <title>{{ config('app.name', 'CX Faculty') }}</title>
    @endif
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="icon" href="{{ $siteLogo['url'] }}" sizes="any">
    <link rel="icon" href="{{ $siteLogo['url'] }}" type="image/png">
    <link rel="apple-touch-icon" href="{{ $siteLogo['url'] }}">
    <link rel="stylesheet" href="{{ asset('css/cx-landing.css') }}">
    <style>
        .hidden { display: none !important; }
        .cx-landing { --cx-logo-height: {{ $siteLogo['height'] }}px; }
        @if ($applyBlogTheme ?? false)
        .cx-blog-themed .cx-post-card,
        .cx-blog-themed .cx-empty,
        .cx-blog-themed .cx-article {
            background-color: {{ $blogTheme['surface'] }};
        }
        .cx-blog-themed .cx-page-hero p,
        .cx-blog-themed .cx-article-meta,
        .cx-blog-themed .cx-post-card-meta {
            color: {{ $blogTheme['text_muted'] }};
        }
        .cx-blog-themed .cx-post-card-tag.active,
        .cx-blog-themed .cx-tag.active {
            border-color: {{ $blogTheme['accent'] }};
            color: {{ $blogTheme['accent'] }};
        }
        @endif
    </style>
    @if (! empty($siteScripts['head']))
        {!! $siteScripts['head'] !!}
    @endif
    @stack('head')
</head>
<body class="cx-body">
    <div class="cx-landing {{ ($applyBlogTheme ?? false) ? 'cx-blog-themed' : '' }}" @if($blogThemeStyle) style="{{ $blogThemeStyle }}" @endif>
        <div class="cx-cursor" id="cx-cursor"></div>
        <div class="cx-cursor-ring" id="cx-cursor-ring"></div>

        @include('cx.partials.nav')

        <main class="cx-main">
            @yield('content')
        </main>

        @include('cx.partials.footer')
    </div>

    @include('cx.partials.scripts')
    @stack('scripts')
    @if (! empty($siteScripts['body_end']))
        {!! $siteScripts['body_end'] !!}
    @endif
</body>
</html>
