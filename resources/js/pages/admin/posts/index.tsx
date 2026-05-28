import type { FormEvent } from 'react';
import { useState } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { confirmDeletePost } from '@/lib/confirm-dialog';
import { dashboard } from '@/routes';

type Post = {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    published_at: string | null;
    is_published: boolean;
    tags: string | string[];
    featured_image: string | null;
    reading_time: number;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Paginated<T> = {
    data: T[];
    links: PaginationLink[];
};

type AdminPostsIndexPageProps = {
    posts: Paginated<Post>;
    filters: { search?: string; status?: string };
    flash?: { success?: string };
};

export default function AdminPostsIndex() {
    const { posts, filters, flash } = usePage<AdminPostsIndexPageProps>().props;
    const [busySlug, setBusySlug] = useState<string | null>(null);
    const form = useForm({
        search: filters.search ?? '',
        status: filters.status ?? '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        router.get('/admin/posts', form.data, { preserveState: true, replace: true });
    }

    async function destroy(post: Post) {
        const confirmed = await confirmDeletePost(post.title);
        if (!confirmed) return;
        router.delete(`/admin/posts/${post.slug}`, { preserveScroll: true });
    }

    function togglePublished(post: Post) {
        setBusySlug(post.slug);
        router.patch(
            `/admin/posts/${post.slug}/toggle-published`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setBusySlug(null),
            },
        );
    }

    function clonePost(slug: string) {
        setBusySlug(slug);
        router.post(
            `/admin/posts/${slug}/clone`,
            {},
            {
                onFinish: () => setBusySlug(null),
            },
        );
    }

    return (
        <>
            <Head title="Blog Posts | Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {flash?.success && (
                    <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Admin CMS</p>
                        <h1 className="text-3xl font-bold tracking-tight">Blog posts</h1>
                    </div>
                    <Button asChild>
                        <Link href="/admin/posts/create">New post</Link>
                    </Button>
                </div>

                <form onSubmit={submit} className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
                    <input
                        type="search"
                        value={form.data.search}
                        onChange={(e) => form.setData('search', e.target.value)}
                        placeholder="Search by title, excerpt, or tag…"
                        className="rounded-xl border border-input bg-background px-4 py-2 text-sm"
                    />
                    <select
                        value={form.data.status}
                        onChange={(e) => form.setData('status', e.target.value)}
                        className="rounded-xl border border-input bg-background px-4 py-2 text-sm"
                    >
                        <option value="">All statuses</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                    <Button type="submit" variant="secondary">Search</Button>
                </form>

                <div className="space-y-4">
                    {posts.data.length > 0 ? (
                        posts.data.map((post) => (
                            <article key={post.slug} className="rounded-2xl border border-border bg-card p-5">
                                <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5">
                                                <Checkbox
                                                    id={`publish-${post.slug}`}
                                                    checked={post.is_published}
                                                    disabled={busySlug === post.slug}
                                                    onCheckedChange={() => togglePublished(post)}
                                                />
                                                <Label
                                                    htmlFor={`publish-${post.slug}`}
                                                    className="cursor-pointer text-sm font-medium"
                                                >
                                                    {post.is_published ? 'Published' : 'Draft'}
                                                </Label>
                                            </div>
                                            <span className="text-xs text-muted-foreground">
                                                {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Unscheduled'}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{post.reading_time} min read</span>
                                        </div>
                                        <h2 className="mt-3 text-xl font-semibold">{post.title}</h2>
                                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/posts/${post.slug}/edit`}>Edit</Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={busySlug === post.slug}
                                            onClick={() => clonePost(post.slug)}
                                        >
                                            <Copy className="mr-1.5 h-4 w-4" />
                                            Clone
                                        </Button>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/blog/${post.slug}`} target="_blank">Preview</Link>
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => destroy(post)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
                            No posts found. Create your first article.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

AdminPostsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Blog posts', href: '/admin/posts' },
    ],
};
