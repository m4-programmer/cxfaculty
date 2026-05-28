<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <meta name="description" content="CX Faculty provides customer experience strategy, blog insights, and a secure admin CMS for managing content and inquiries.">
        <meta name="theme-color" content="#000000">

        <meta property="og:type" content="website">
        <meta property="og:title" content="{{ config('app.name', 'CX Faculty') }}">
        <meta property="og:description" content="Customer experience consulting, blog stories, and an admin CMS for managing posts and inquiries.">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ asset('images/og-image.png') }}">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])

        <x-inertia::head>
            <title>{{ config('app.name', 'CX Faculty') }}</title>
        </x-inertia::head>

        <style>
            html {
                scroll-behavior: smooth;
            }

            body {
                min-height: 100vh;
            }

            .landing-body {
                font-family: 'DM Sans', sans-serif;
            }

            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    scroll-behavior: auto !important;
                    animation-duration: 0.01ms !important;
                    transition-duration: 0.01ms !important;
                }
            }
        </style>
    </head>
    <body class="font-sans antialiased landing-body">
        <x-inertia::app />
    </body>
</html>
