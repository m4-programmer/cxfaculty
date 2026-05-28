import { Link } from '@inertiajs/react';

export type PostSummary = {
    title: string;
    excerpt: string;
    slug: string;
    published_at: string | null;
    featured_image: string | null;
    tags: string[];
    reading_time: number;
    views?: number;
};

type Props = {
    post: PostSummary;
    featured?: boolean;
};

function formatDate(value: string | null): string {
    if (!value) return 'Draft';
    return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function PostCard({ post, featured = false }: Props) {
    return (
        <article
            className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:border-amber-300/40 hover:bg-white/[0.08] ${
                featured ? 'lg:flex-row' : ''
            }`}
        >
            <Link href={`/blog/${post.slug}`} className={`block overflow-hidden ${featured ? 'lg:w-2/5' : ''}`}>
                <div className={`relative overflow-hidden bg-slate-950/70 ${featured ? 'h-full min-h-56' : 'h-52'}`}>
                    {post.featured_image ? (
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
                            <span className="text-xs uppercase tracking-[0.28em] text-white/40">CX Faculty</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
            </Link>

            <div className={`flex flex-1 flex-col p-6 sm:p-8 ${featured ? 'lg:w-3/5' : ''}`}>
                {post.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                            <Link
                                key={tag}
                                href={`/blog?tag=${encodeURIComponent(tag)}`}
                                className="rounded-full bg-amber-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200 transition hover:bg-amber-300/20"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                )}

                <Link href={`/blog/${post.slug}`} className="block flex-1">
                    <h2 className={`font-semibold text-white transition group-hover:text-amber-300 ${featured ? 'text-3xl' : 'text-xl sm:text-2xl'}`}>
                        {post.title}
                    </h2>
                    <p className={`mt-3 line-clamp-3 leading-7 text-white/65 ${featured ? 'text-base' : 'text-sm'}`}>
                        {post.excerpt}
                    </p>
                </Link>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-sm text-white/50">
                    <div className="flex flex-wrap items-center gap-3">
                        <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
                        <span>{post.reading_time} min read</span>
                        {post.views !== undefined && <span>{post.views} views</span>}
                    </div>
                    <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 font-semibold text-amber-300 transition hover:text-amber-200"
                    >
                        Read article
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
