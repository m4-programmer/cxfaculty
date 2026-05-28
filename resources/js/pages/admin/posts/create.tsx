import type { FormEvent } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import BlogPostForm from '@/components/admin/blog-post-form';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

function toDatetimeLocal(value: string | null): string {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
}

export default function AdminPostsCreate() {
    const form = useForm({
        title: '',
        slug: '',
        excerpt: '',
        body: '',
        featured_image: null as string | null,
        tags: '',
        published_at: toDatetimeLocal(new Date().toISOString()),
        is_published: false,
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post('/admin/posts', { preserveScroll: true });
    }

    return (
        <>
            <Head title="Create Blog Post | Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Create post</h1>
                    <Button variant="outline" asChild>
                        <Link href="/admin/posts">Back to posts</Link>
                    </Button>
                </div>

                <BlogPostForm
                    form={form}
                    onSubmit={submit}
                    submitLabel="Create post"
                    heading="New article"
                    subheading="Write and publish content for your audience."
                />
            </div>
        </>
    );
}

AdminPostsCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Blog posts', href: '/admin/posts' },
        { title: 'Create', href: '/admin/posts/create' },
    ],
};
