import type { FormEvent } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import LandingPageForm from '@/components/admin/landing-page-form';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import type { LandingPageContent } from '@/types/landing-page';

type AdminLandingEditPageProps = {
    content: LandingPageContent;
    flash?: { success?: string };
};

export default function AdminLandingEdit() {
    const { content, flash } = usePage<AdminLandingEditPageProps>().props;

    const form = useForm({
        content,
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.put('/admin/landing', { preserveScroll: true });
    }

    return (
        <>
            <Head title="Landing Page | Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {flash?.success && (
                    <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Site content</p>
                        <h1 className="text-2xl font-bold">Landing page</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Update homepage copy, section visibility, and call-to-action labels.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/" target="_blank">Preview site</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={dashboard()}>Back to dashboard</Link>
                        </Button>
                    </div>
                </div>

                <LandingPageForm form={form} onSubmit={submit} />
            </div>
        </>
    );
}

AdminLandingEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Landing page', href: '#' },
    ],
};
