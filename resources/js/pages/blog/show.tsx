import { Head, Link, usePage } from '@inertiajs/react';
import CxPostCard, { type CxPostSummary } from '@/components/cx-landing/cx-post-card';
import ShareButtons from '@/components/blog/share-buttons';

type Post = {
    title: string;
    excerpt: string;
    body: string;
    published_at: string | null;
    slug: string;
    featured_image: string | null;
    tags: string[];
    reading_time: number;
    views: number;
    is_published: boolean;
    author: {
        name: string;
    };
};

type BlogShowPageProps = {
    post: Post;
    relatedPosts: CxPostSummary[];
    relatedPostsHeading: string;
    seo: {
        canonical: string;
        ogImage: string;
        jsonLd: Record<string, unknown>;
    };
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

export default function BlogShow() {
    const { post, relatedPosts, relatedPostsHeading, seo } = usePage<BlogShowPageProps>().props;

    return (
        <>
            <Head title={`${post.title} | CX Faculty`}>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={seo.canonical} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:url" content={seo.canonical} />
                <meta property="og:image" content={seo.ogImage} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt} />
                <meta name="twitter:image" content={seo.ogImage} />
                <script type="application/ld+json">{JSON.stringify(seo.jsonLd)}</script>
            </Head>

            <div className="cx-page">
                <Link href="/blog" className="cx-back-link cx-reveal">
                    ← Back to all articles
                </Link>

                <article className="cx-article cx-reveal">
                    {!post.is_published && (
                        <div className="cx-flash" style={{ marginBottom: '1.5rem' }}>
                            Draft preview — this post is not published yet.
                        </div>
                    )}

                    <header className="cx-article-header">
                        {post.tags.length > 0 && (
                            <div className="cx-post-card-tags" style={{ marginBottom: '1.25rem' }}>
                                {post.tags.map((tag) => (
                                    <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="cx-post-card-tag">
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <h1>{post.title}</h1>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: '1.5rem' }}>
                            {post.excerpt}
                        </p>

                        <div className="cx-article-meta">
                            <span>By {post.author.name}</span>
                            <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
                            <span>{post.reading_time} min read</span>
                            <span>{post.views} views</span>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <ShareButtons url={seo.canonical} title={post.title} excerpt={post.excerpt} />
                        </div>
                    </header>

                    {post.featured_image && (
                        <figure style={{ marginBottom: '2rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <img src={post.featured_image} alt={post.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
                        </figure>
                    )}

                    <div className="cx-article-body" dangerouslySetInnerHTML={{ __html: post.body }} />
                </article>

                {relatedPosts.length > 0 && (
                    <section className="cx-blog" style={{ padding: '6rem 0 0' }}>
                        <div className="cx-blog-header cx-reveal" style={{ marginBottom: '2.5rem' }}>
                            <div>
                                <div className="cx-section-label">
                                    <span>Continue exploring</span>
                                </div>
                                <h2 className="cx-headline">{relatedPostsHeading}</h2>
                            </div>
                            <Link href="/blog" className="cx-btn-outline">
                                View all posts
                            </Link>
                        </div>
                        <div className="cx-blog-grid">
                            {relatedPosts.map((related) => (
                                <CxPostCard key={related.slug} post={related} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
