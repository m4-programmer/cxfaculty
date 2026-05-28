import { Head, Link, usePage } from '@inertiajs/react';

type Post = {
    title: string;
    excerpt: string;
    slug: string;
    published_at: string | null;
};

type PageProps = {
    posts: Post[];
};

export default function BlogIndex() {
    const { posts } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Blog | CX Faculty" />

            <main className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
                <div className="mb-12 max-w-3xl">
                    <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Customer Experience Blog</p>
                    <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                        Stories, strategy, and practical guidance for CX leaders.
                    </h1>
                    <p className="mt-5 text-lg leading-8 text-white/70">
                        Explore articles on experience design, performance, and how to manage your content with a modern admin workflow.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <article key={post.slug} className="group rounded-4xl border border-white/10 bg-white/5 p-8 transition hover:border-amber-300/40 hover:bg-white/10">
                                <h2 className="text-2xl font-semibold text-white transition group-hover:text-amber-300">
                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-white/70">{post.excerpt}</p>
                                <div className="mt-6 flex items-center justify-between text-sm text-white/50">
                                    <span>{post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}</span>
                                    <Link href={`/blog/${post.slug}`} className="font-semibold text-amber-300">
                                        Read article
                                    </Link>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="rounded-4xl border border-white/10 bg-white/5 p-8 text-white/70">
                            No blog posts are published yet. Create one in the admin panel.
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
