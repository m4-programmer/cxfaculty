import { Head, Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

type Post = {
    id: number;
    title: string;
    slug: string;
    published_at: string | null;
    is_published: boolean;
};

type PageProps = {
    posts: Post[];
};

export default function AdminPostsIndex() {
    const { posts } = usePage<PageProps>().props;

    function destroy(slug: string) {
        if (!confirm('Delete this post?')) {
            return;
        }

        router.delete(`/admin/posts/${slug}`);
    }

    return (
        <>
            <Head title="Admin | Blog Posts" />

            <main className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Admin CMS</p>
                        <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">Manage blog posts</h1>
                    </div>
                    <Link
                        href="/admin/posts/create"
                        className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-400"
                    >
                        New post
                    </Link>
                </div>

                <div className="grid gap-4">
                    {posts.map((post) => (
                        <div key={post.slug} className="flex flex-col gap-4 rounded-4xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
                                <p className="mt-2 text-sm text-white/60">{post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}</p>
                                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/50">{post.is_published ? 'Published' : 'Draft'}</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={`/admin/posts/${post.slug}/edit`}
                                    className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => destroy(post.slug)}
                                    className="rounded-full border border-rose-400/30 bg-rose-500/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-rose-200 transition hover:bg-rose-500/20"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
