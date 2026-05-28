import type { FormEvent } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import BlogPostForm from '@/components/admin/blog-post-form';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

type Post = {
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    featured_image: string | null;
    tags: string | null;
    published_at: string | null;
    is_published: boolean;
};

type AdminPostsEditPageProps = {
    post: Post;
    flash?: { success?: string };
};

function toDatetimeLocal(value: string | null): string {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
}

export default function AdminPostsEdit() {
    const { post, flash } = usePage<AdminPostsEditPageProps>().props;
    const form = useForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        featured_image: post.featured_image,
        tags: post.tags ?? '',
        published_at: toDatetimeLocal(post.published_at),
        is_published: post.is_published,
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.put(`/admin/posts/${post.slug}`, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Edit Blog Post | Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {flash?.success && (
                    <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold">Edit post</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/blog/${post.slug}`} target="_blank">Preview</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/admin/posts">Back to posts</Link>
                        </Button>
                    </div>
                </div>

                <BlogPostForm
                    form={form}
                    onSubmit={submit}
                    submitLabel="Save changes"
                    heading="Edit article"
                    subheading="Update content, cover image, and metadata."
                />
            </div>
        </>
    );
}

AdminPostsEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Blog posts', href: '/admin/posts' },
        { title: 'Edit', href: '#' },
    ],
};
