import { Head, Link, usePage } from '@inertiajs/react';

type Post = {
    title: string;
    excerpt: string;
    body: string;
    published_at: string | null;
    slug: string;
};

type PageProps = {
    post: Post;
};

export default function BlogShow() {
    const { post } = usePage<PageProps>().props;

    return (
        <>
            <Head title={`${post.title} | CX Faculty`} />

            <main className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
                <div className="mb-10 flex items-center justify-between gap-4 rounded-4xl border border-white/10 bg-white/5 p-8 text-white">
                    <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Blog article</p>
                        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{post.title}</h1>
                        <p className="mt-4 text-sm text-white/50">{post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}</p>
                    </div>
                    <Link
                        href="/blog"
                        className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
                    >
                        Back to blog
                    </Link>
                </div>

                <article className="max-w-none rounded-4xl border border-white/10 bg-white/5 p-10 text-white">
                    <div className="space-y-6">
                        <p className="font-semibold text-amber-300">{post.excerpt}</p>
                        <div className="space-y-8 text-sm leading-8 text-white/75" dangerouslySetInnerHTML={{ __html: post.body }} />
                    </div>
                </article>
            </main>
        </>
    );
}
