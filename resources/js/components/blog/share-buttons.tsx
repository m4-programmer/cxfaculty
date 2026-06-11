import { Check, Copy, Facebook, Linkedin, Share2 } from 'lucide-react';
import { useState } from 'react';

type Props = {
    url: string;
    title: string;
    excerpt?: string;
};

function buildShareUrl(platform: 'twitter' | 'linkedin' | 'facebook', url: string, title: string): string {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    switch (platform) {
        case 'twitter':
            return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        case 'linkedin':
            return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        case 'facebook':
            return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    }
}

export default function ShareButtons({ url, title, excerpt }: Props) {
    const [copied, setCopied] = useState(false);

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            const input = document.createElement('input');
            input.value = url;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        }
    }

    async function nativeShare() {
        if (!navigator.share) {
            return;
        }

        try {
            await navigator.share({
                title,
                text: excerpt ?? title,
                url,
            });
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                return;
            }
        }
    }

    const shareLinks = [
        { platform: 'twitter' as const, label: 'X', icon: Share2 },
        { platform: 'linkedin' as const, label: 'LinkedIn', icon: Linkedin },
        { platform: 'facebook' as const, label: 'Facebook', icon: Facebook },
    ];

    return (
        <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Share</span>

            <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
            >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy link'}
            </button>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                    type="button"
                    onClick={nativeShare}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
                >
                    <Share2 className="h-4 w-4" />
                    Share
                </button>
            )}

            {shareLinks.map(({ platform, label, icon: Icon }) => (
                <a
                    key={platform}
                    href={buildShareUrl(platform, url, title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
                    aria-label={`Share on ${label}`}
                >
                    <Icon className="h-4 w-4" />
                    {label}
                </a>
            ))}
        </div>
    );
}
