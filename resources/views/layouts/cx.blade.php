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
    <link rel="icon" href="/logo.png" sizes="any">
    <link rel="icon" href="/logo.png" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="stylesheet" href="{{ asset('css/cx-landing.css') }}">
    <style>.hidden { display: none !important; }</style>
    @stack('head')
</head>
<body class="cx-body">
    <div class="cx-landing">
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
</body>
</html>
