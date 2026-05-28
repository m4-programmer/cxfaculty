import type { FormEvent } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import PostCard, { type PostSummary } from '@/components/blog/post-card';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Paginated<T> = {
    data: T[];
    links: PaginationLink[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};

type BlogIndexPageProps = {
    posts: Paginated<PostSummary>;
    filters: {
        search?: string;
        tag?: string;
    };
    popularTags: string[];
    totalPublished: number;
};

export default function BlogIndex() {
    const { posts, filters, popularTags, totalPublished } = usePage<BlogIndexPageProps>().props;
    const form = useForm({
        search: filters.search ?? '',
        tag: filters.tag ?? '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        router.get('/blog', { search: form.data.search, tag: form.data.tag || undefined }, { preserveState: true, replace: true });
    }

    function filterByTag(tag: string) {
        router.get('/blog', { tag, search: form.data.search || undefined }, { preserveState: true, replace: true });
    }

    function clearFilters() {
        form.setData({ search: '', tag: '' });
        router.get('/blog', {}, { preserveState: true, replace: true });
    }

    const [featuredPost, ...restPosts] = posts.data;
    const hasFilters = Boolean(filters.search || filters.tag);

    return (
        <>
            <Head title="Blog | CX Faculty">
                <meta name="description" content="Explore customer experience articles, strategy guides, and practical insights from CX Faculty." />
                <link rel="canonical" href={`${window.location.origin}/blog`} />
            </Head>

            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <section className="mb-12">
                    <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Customer Experience Blog</p>
                    <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Insights for CX leaders who want clarity, speed, and impact.
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                        {totalPublished} published {totalPublished === 1 ? 'article' : 'articles'} on strategy, content, and building better customer journeys.
                    </p>
                </section>

                <section className="mb-10 grid gap-6 lg:grid-cols-[1fr_280px]">
                    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                        <input
                            type="search"
                            value={form.data.search}
                            onChange={(event) => form.setData('search', event.target.value)}
                            placeholder="Search articles, topics, or tags…"
                            className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/80 px-5 py-3 text-sm text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                        />
                        <button
                            type="submit"
                            className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-400"
                        >
                            Search
                        </button>
                    </form>

                    {hasFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="rounded-full border border-white/15 px-5 py-3 text-sm text-white/80 transition hover:border-amber-300 hover:text-amber-300"
                        >
                            Clear filters
                        </button>
                    )}
                </section>

                {popularTags.length > 0 && (
                    <section className="mb-10">
                        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/50">Popular topics</p>
                        <div className="flex flex-wrap gap-2">
                            {popularTags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => filterByTag(tag)}
                                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                                        filters.tag === tag
                                            ? 'bg-amber-300 text-black'
                                            : 'border border-white/10 bg-white/5 text-white/70 hover:border-amber-300/40 hover:text-amber-200'
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {posts.data.length > 0 ? (
                    <div className="space-y-8">
                        {!hasFilters && featuredPost && (
                            <PostCard post={featuredPost} featured />
                        )}

                        <div className={`grid gap-6 ${hasFilters ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
                            {(hasFilters ? posts.data : restPosts).map((post) => (
                                <PostCard key={post.slug} post={post} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white/70">
                        <p className="text-lg font-medium text-white">No articles found</p>
                        <p className="mt-2 text-sm">Try a broader search or explore a different topic.</p>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-6 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black"
                        >
                            View all posts
                        </button>
                    </div>
                )}

                {posts.links.length > 3 && (
                    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                        {posts.links.map((link, index) => (
                            <span key={index}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        preserveState
                                        className={`inline-flex min-w-10 items-center justify-center rounded-full border px-4 py-2 text-sm transition ${
                                            link.active
                                                ? 'border-amber-300 bg-amber-300/10 text-amber-300'
                                                : 'border-white/10 bg-white/5 text-white/80 hover:border-amber-300 hover:text-amber-300'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span className="inline-flex min-w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/40">
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </span>
                                )}
                            </span>
                        ))}
                    </nav>
                )}
            </main>
        </>
    );
}
