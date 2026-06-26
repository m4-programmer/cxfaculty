import type { FormEvent } from 'react';
import { router } from '@inertiajs/react';
import type { SiteAppearance } from '@/types/site-appearance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
    form: {
        data: { appearance: SiteAppearance };
        setData: (key: string, value: unknown) => void;
        errors: Record<string, string>;
        processing: boolean;
    };
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return <p className="mt-1 text-xs text-destructive">{message}</p>;
}

const blogColorFields: Array<{ key: keyof SiteAppearance['blog']; label: string }> = [
    { key: 'accent', label: 'Accent' },
    { key: 'accent_dark', label: 'Accent (hover)' },
    { key: 'background', label: 'Background' },
    { key: 'surface', label: 'Card surface' },
    { key: 'text', label: 'Text' },
    { key: 'text_muted', label: 'Muted text' },
];

export default function SiteAppearanceForm({ form, onSubmit }: Props) {
    const { appearance } = form.data;

    function updateBlog(field: keyof SiteAppearance['blog'], value: string) {
        form.setData('appearance', {
            ...appearance,
            blog: {
                ...appearance.blog,
                [field]: value,
            },
        });
    }

    function uploadLogo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        router.post('/admin/landing/logo', formData, {
            preserveScroll: true,
            forceFormData: true,
        });
    }

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-lg font-semibold">Site logo</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Upload a custom logo and control how large it appears in the navigation and footer.
                </p>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="rounded-xl border border-border bg-black px-6 py-4">
                        <img
                            src={appearance.logo.url}
                            alt="Current logo preview"
                            style={{ height: appearance.logo.height }}
                            className="w-auto max-w-[220px] object-contain"
                        />
                    </div>
                    <form onSubmit={uploadLogo} className="flex flex-col gap-3">
                        <label className="block space-y-2">
                            <Label htmlFor="logo">Upload new logo</Label>
                            <Input id="logo" name="logo" type="file" accept="image/*" required />
                        </label>
                        <Button type="submit" variant="outline">
                            Upload logo
                        </Button>
                    </form>
                </div>
            </section>

            <form onSubmit={onSubmit} className="space-y-6">
                <section className="rounded-2xl border border-border bg-card p-5">
                    <label className="block max-w-xs space-y-2">
                        <Label htmlFor="logo_height">Logo height (px)</Label>
                        <Input
                            id="logo_height"
                            type="number"
                            min={24}
                            max={120}
                            value={appearance.logo.height}
                            onChange={(event) =>
                                form.setData('appearance', {
                                    ...appearance,
                                    logo: {
                                        ...appearance.logo,
                                        height: Number(event.target.value),
                                    },
                                })
                            }
                        />
                        <FieldError message={form.errors['appearance.logo.height']} />
                    </label>

                    <div className="mt-6 rounded-xl border border-border bg-background/40 p-4">
                        <h3 className="font-medium">Blog colour palette</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            These colours apply to blog listing and article pages.
                        </p>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {blogColorFields.map(({ key, label }) => (
                                <label key={key} className="block space-y-2">
                                    <Label htmlFor={`blog_${key}`}>{label}</Label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            id={`blog_${key}`}
                                            type="color"
                                            value={
                                                appearance.blog[key].startsWith('#')
                                                    ? appearance.blog[key]
                                                    : '#000000'
                                            }
                                            onChange={(event) => updateBlog(key, event.target.value)}
                                            className="h-10 w-12 cursor-pointer rounded border border-input bg-transparent p-1"
                                        />
                                        <Input
                                            value={appearance.blog[key]}
                                            onChange={(event) => updateBlog(key, event.target.value)}
                                        />
                                    </div>
                                    <FieldError message={form.errors[`appearance.blog.${key}`]} />
                                </label>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="flex justify-end">
                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? 'Saving…' : 'Save appearance settings'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
