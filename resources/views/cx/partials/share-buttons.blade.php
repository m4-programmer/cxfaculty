@props([
    'url',
    'title',
])

@php
    $encodedUrl = urlencode($url);
    $encodedTitle = urlencode($title);
@endphp

<div class="flex flex-wrap items-center gap-3">
    <span class="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Share</span>

    <button
        type="button"
        class="cx-share-btn"
        data-copy-url="{{ $url }}"
        onclick="copyShareLink(this)"
    >
        <span class="cx-share-copy-label">Copy link</span>
    </button>

    <a
        href="https://twitter.com/intent/tweet?url={{ $encodedUrl }}&text={{ $encodedTitle }}"
        target="_blank"
        rel="noopener noreferrer"
        class="cx-share-btn"
        aria-label="Share on X"
    >X</a>

    <a
        href="https://www.linkedin.com/sharing/share-offsite/?url={{ $encodedUrl }}"
        target="_blank"
        rel="noopener noreferrer"
        class="cx-share-btn"
        aria-label="Share on LinkedIn"
    >LinkedIn</a>

    <a
        href="https://www.facebook.com/sharer/sharer.php?u={{ $encodedUrl }}"
        target="_blank"
        rel="noopener noreferrer"
        class="cx-share-btn"
        aria-label="Share on Facebook"
    >Facebook</a>
</div>

@once
    @push('scripts')
        <script>
            function copyShareLink(button) {
                const url = button.getAttribute('data-copy-url');
                const label = button.querySelector('.cx-share-copy-label');

                function markCopied() {
                    if (label) {
                        label.textContent = 'Copied';
                        window.setTimeout(function () {
                            label.textContent = 'Copy link';
                        }, 2000);
                    }
                }

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url).then(markCopied).catch(function () {
                        fallbackCopy(url);
                        markCopied();
                    });
                } else {
                    fallbackCopy(url);
                    markCopied();
                }
            }

            function fallbackCopy(value) {
                const input = document.createElement('input');
                input.value = value;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
            }
        </script>
        <style>
            .cx-share-btn {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                border-radius: 9999px;
                border: 1px solid rgba(255, 255, 255, 0.15);
                background: rgba(255, 255, 255, 0.05);
                padding: 0.5rem 1rem;
                font-size: 0.75rem;
                font-weight: 600;
                letter-spacing: 0.18em;
                text-transform: uppercase;
                color: #fff;
                text-decoration: none;
                cursor: pointer;
                transition: border-color 0.2s, color 0.2s;
            }

            .cx-share-btn:hover {
                border-color: #ffc107;
                color: #ffc107;
            }
        </style>
    @endpush
@endonce
