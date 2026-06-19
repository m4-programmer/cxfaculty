import type { FormEvent } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import CxPostCard, { type CxPostSummary } from '@/components/cx-landing/cx-post-card';

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
    posts: Paginated<CxPostSummary>;
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

    const hasFilters = Boolean(filters.search || filters.tag);

    return (
        <>
            <Head title="Blog | CX Faculty">
                <meta name="description" content="Explore customer experience articles, strategy guides, and practical insights from CX Faculty." />
                <link rel="canonical" href={`${typeof window !== 'undefined' ? window.location.origin : ''}/blog`} />
            </Head>

            <div className="cx-page">
                <header className="cx-page-hero cx-reveal">
                    <div className="cx-section-label">
                        <span>Latest Insights</span>
                    </div>
                    <h1>Stories and frameworks from the front lines of CX.</h1>
                    <p>
                        {totalPublished} published {totalPublished === 1 ? 'article' : 'articles'} on strategy, customer
                        journeys, and building better experiences.
                    </p>
                </header>

                <section className="cx-blog-toolbar cx-reveal">
                    <form onSubmit={submit} className="cx-blog-search">
                        <input
                            type="search"
                            value={form.data.search}
                            onChange={(event) => form.setData('search', event.target.value)}
                            placeholder="Search articles, topics, or tags…"
                        />
                        <button type="submit" className="cx-btn-primary">
                            Search
                        </button>
                    </form>
                    {hasFilters && (
                        <button type="button" onClick={clearFilters} className="cx-btn-outline">
                            Clear filters
                        </button>
                    )}
                </section>

                {popularTags.length > 0 && (
                    <div className="cx-tag-list cx-reveal">
                        {popularTags.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => filterByTag(tag)}
                                className={`cx-tag ${filters.tag === tag ? 'active' : ''}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}

                {posts.data.length > 0 ? (
                    <div className="cx-blog-grid">
                        {posts.data.map((post) => (
                            <CxPostCard key={post.slug} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="cx-empty cx-reveal">
                        <p>No articles found.</p>
                        <button type="button" onClick={clearFilters} className="cx-btn-primary" style={{ marginTop: '1.5rem' }}>
                            View all posts
                        </button>
                    </div>
                )}

                {posts.links.length > 3 && (
                    <nav className="cx-pagination" aria-label="Pagination">
                        {posts.links.map((link, index) => (
                            <span key={index}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        preserveState
                                        className={link.active ? 'active' : undefined}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                )}
                            </span>
                        ))}
                    </nav>
                )}
            </div>
        </>
    );
}
