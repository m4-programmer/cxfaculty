import type { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminPostsCreate() {
    const form = useForm({
        title: '',
        slug: '',
        excerpt: '',
        body: '',
        published_at: '',
        is_published: true,
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        form.post('/admin/posts', {
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title="Create Blog Post | Admin" />

            <main className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-amber-300">New blog post</p>
                        <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">Create post</h1>
                    </div>
                    <Link
                        href="/admin/posts"
                        className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
                    >
                        Back to posts
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <label className="block text-sm font-medium text-white/80">
                            Title
                            <input
                                value={form.data.title}
                                onChange={(event) => form.setData('title', event.target.value)}
                                type="text"
                                className="mt-2 w-full rounded-3xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                            />
                            {form.errors.title && <p className="mt-2 text-xs text-rose-400">{form.errors.title}</p>}
                        </label>
                        <label className="block text-sm font-medium text-white/80">
                            Slug
                            <input
                                value={form.data.slug}
                                onChange={(event) => form.setData('slug', event.target.value)}
                                type="text"
                                className="mt-2 w-full rounded-3xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                            />
                            {form.errors.slug && <p className="mt-2 text-xs text-rose-400">{form.errors.slug}</p>}
                        </label>
                    </div>

                    <label className="block text-sm font-medium text-white/80">
                        Excerpt
                        <textarea
                            value={form.data.excerpt}
                            onChange={(event) => form.setData('excerpt', event.target.value)}
                            rows={3}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                        />
                        {form.errors.excerpt && <p className="mt-2 text-xs text-rose-400">{form.errors.excerpt}</p>}
                    </label>

                    <label className="block text-sm font-medium text-white/80">
                        Body
                        <textarea
                            value={form.data.body}
                            onChange={(event) => form.setData('body', event.target.value)}
                            rows={10}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                        />
                        {form.errors.body && <p className="mt-2 text-xs text-rose-400">{form.errors.body}</p>}
                    </label>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <label className="block text-sm font-medium text-white/80">
                            Publish date
                            <input
                                value={form.data.published_at}
                                onChange={(event) => form.setData('published_at', event.target.value)}
                                type="datetime-local"
                                className="mt-2 w-full rounded-3xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                            />
                            {form.errors.published_at && <p className="mt-2 text-xs text-rose-400">{form.errors.published_at}</p>}
                        </label>
                        <label className="flex items-center gap-3 text-sm font-medium text-white/80">
                            <input
                                checked={form.data.is_published}
                                onChange={(event) => form.setData('is_published', event.target.checked)}
                                type="checkbox"
                                className="h-5 w-5 rounded border-white/10 bg-black/80 text-amber-300 focus:ring-amber-300"
                            />
                            Publish now
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={form.processing}
                        className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Save post
                    </button>
                </form>
            </main>
        </>
    );
}
