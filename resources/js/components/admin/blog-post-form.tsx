import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import RichTextEditorClient from '@/components/admin/rich-text-editor-client';
import { uploadBlogImage } from '@/lib/csrf';

type Props = {
    form: any;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    heading: string;
    subheading: string;
};

function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export default function BlogPostForm({ form, onSubmit, submitLabel, heading, subheading }: Props) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadError('');
        setIsUploading(true);

        try {
            const url = await uploadBlogImage(file);
            form.setData('featured_image', url);
        } catch {
            setUploadError('Upload failed. Try again.');
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-8 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">{heading}</p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{subheading}</h1>
                </div>
                <div className="space-y-4 rounded-2xl border border-border bg-muted/30 p-5">
                    <div>
                        <p className="text-sm font-medium">Featured image</p>
                        <div className="mt-3 overflow-hidden rounded-2xl border border-dashed border-border bg-background">
                            {form.data.featured_image ? (
                                <img
                                    src={form.data.featured_image}
                                    alt="Featured preview"
                                    className="h-48 w-full object-cover"
                                />
                            ) : (
                                <div className="flex min-h-48 items-center justify-center text-center text-sm text-muted-foreground">
                                    Upload a cover image or insert one in the editor.
                                </div>
                            )}
                        </div>
                        <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                            <span>{isUploading ? 'Uploading…' : 'Upload cover'}</span>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" />
                        </label>
                        {uploadError && <p className="mt-2 text-sm text-destructive">{uploadError}</p>}
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <label className="block text-sm font-medium">
                    Title
                    <input
                        type="text"
                        value={form.data.title}
                        onChange={(event) => {
                            form.setData('title', event.target.value);
                            if (!form.data.slug) {
                                form.setData('slug', slugify(event.target.value));
                            }
                        }}
                        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                    />
                    {form.errors.title && <p className="mt-2 text-xs text-destructive">{form.errors.title}</p>}
                </label>
                <label className="block text-sm font-medium">
                    Slug
                    <input
                        type="text"
                        value={form.data.slug}
                        onChange={(event) => form.setData('slug', event.target.value)}
                        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                    />
                    {form.errors.slug && <p className="mt-2 text-xs text-destructive">{form.errors.slug}</p>}
                </label>
            </div>

            <label className="block text-sm font-medium">
                Excerpt
                <textarea
                    value={form.data.excerpt}
                    onChange={(event) => form.setData('excerpt', event.target.value)}
                    rows={3}
                    placeholder="A short summary for search results and social sharing"
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
                {form.errors.excerpt && <p className="mt-2 text-xs text-destructive">{form.errors.excerpt}</p>}
            </label>

            <div>
                <p className="text-sm font-medium">Article body</p>
                <div className="mt-2">
                    <RichTextEditorClient
                        value={form.data.body}
                        onChange={(value) => form.setData('body', value)}
                        onUploadStateChange={setIsUploading}
                    />
                </div>
                {form.errors.body && <p className="mt-2 text-xs text-destructive">{form.errors.body}</p>}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <label className="block text-sm font-medium">
                    Tags
                    <input
                        type="text"
                        value={form.data.tags}
                        onChange={(event) => form.setData('tags', event.target.value)}
                        placeholder="e.g. analytics, ux, customer experience"
                        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                    />
                    {form.errors.tags && <p className="mt-2 text-xs text-destructive">{form.errors.tags}</p>}
                </label>
                <label className="block text-sm font-medium">
                    Publish date
                    <input
                        type="datetime-local"
                        value={form.data.published_at}
                        onChange={(event) => form.setData('published_at', event.target.value)}
                        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                    />
                    {form.errors.published_at && <p className="mt-2 text-xs text-destructive">{form.errors.published_at}</p>}
                </label>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/30 p-6 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-3 text-sm font-medium">
                    <input
                        type="checkbox"
                        checked={form.data.is_published}
                        onChange={(event) => form.setData('is_published', event.target.checked)}
                        className="h-5 w-5 rounded border-input"
                    />
                    Publish post
                </label>
                <button
                    type="submit"
                    disabled={form.processing || isUploading}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {form.processing ? 'Saving…' : submitLabel}
                </button>
            </div>
        </form>
    );
}
