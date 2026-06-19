import { Link } from '@inertiajs/react';

export type CxPostSummary = {
    title: string;
    excerpt: string;
    slug: string;
    published_at: string | null;
    featured_image: string | null;
    tags: string[];
    reading_time: number;
};

type Props = {
    post: CxPostSummary;
};

function formatDate(value: string | null): string {
    if (!value) {
        return 'Draft';
    }

    return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function CxPostCard({ post }: Props) {
    return (
        <article className="cx-post-card cx-reveal">
            <Link href={`/blog/${post.slug}`} className="cx-post-card-image">
                {post.featured_image ? (
                    <img src={post.featured_image} alt={post.title} loading="lazy" />
                ) : (
                    <div className="cx-post-card-placeholder">CX Faculty</div>
                )}
            </Link>
            <div className="cx-post-card-body">
                {post.tags.length > 0 && (
                    <div className="cx-post-card-tags">
                        {post.tags.slice(0, 3).map((tag) => (
                            <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="cx-post-card-tag">
                                {tag}
                            </Link>
                        ))}
                    </div>
                )}
                <Link href={`/blog/${post.slug}`}>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                </Link>
                <div className="cx-post-card-meta">
                    <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
                    <span>{post.reading_time} min read</span>
                    <Link href={`/blog/${post.slug}`} className="cx-post-card-link">
                        Read article
                        <svg viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}
