import { Head, Link, usePage } from '@inertiajs/react';
import BlogContent from '@/components/blog/blog-content';
import PostCard, { type PostSummary } from '@/components/blog/post-card';
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
    relatedPosts: PostSummary[];
    relatedPostsHeading: string;
    seo: {
        canonical: string;
        ogImage: string;
        jsonLd: Record<string, unknown>;
    };
};

function formatDate(value: string | null): string {
    if (!value) return 'Draft';
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

            <main>
                <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                    {!post.is_published && (
                        <div className="mb-6 rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
                            Draft preview — this post is not published yet.
                        </div>
                    )}

                    <nav className="mb-8">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-amber-300">
                            ← Back to all articles
                        </Link>
                    </nav>

                    <article>
                        <header className="mb-10">
                            {post.tags.length > 0 && (
                                <div className="mb-5 flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
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

                            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                {post.title}
                            </h1>

                            <p className="mt-5 text-lg leading-8 text-white/70">{post.excerpt}</p>

                            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-white/10 py-5 text-sm text-white/55">
                                <span>By {post.author.name}</span>
                                <span aria-hidden="true">·</span>
                                <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
                                <span aria-hidden="true">·</span>
                                <span>{post.reading_time} min read</span>
                                <span aria-hidden="true">·</span>
                                <span>{post.views} views</span>
                            </div>

                            <div className="mt-6">
                                <ShareButtons url={seo.canonical} title={post.title} excerpt={post.excerpt} />
                            </div>
                        </header>

                        {post.featured_image && (
                            <figure className="mb-10 overflow-hidden rounded-3xl border border-white/10">
                                <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="aspect-[16/9] w-full object-cover"
                                />
                            </figure>
                        )}

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
                            <BlogContent html={post.body} />
                        </div>
                    </article>
                </div>

                {relatedPosts.length > 0 && (
                    <section className="mt-8 border-t border-white/10 bg-gradient-to-b from-transparent to-white/[0.02] py-16">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Continue exploring</p>
                                    <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                        {relatedPostsHeading}
                                    </h2>
                                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
                                        Finished reading? Discover more insights on customer experience, content, and strategy.
                                    </p>
                                </div>
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
                                >
                                    View all articles
                                </Link>
                            </div>

                            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {relatedPosts.map((related) => (
                                    <PostCard key={related.slug} post={related} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
