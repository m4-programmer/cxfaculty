import type { FormEvent } from 'react';
import { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import LandingPageForm from '@/components/admin/landing-page-form';
import SiteAppearanceForm from '@/components/admin/site-appearance-form';
import SiteIntegrationsForm from '@/components/admin/site-integrations-form';
import SiteScriptsForm from '@/components/admin/site-scripts-form';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import type { LandingPageContent } from '@/types/landing-page';
import type { SiteAppearance } from '@/types/site-appearance';
import type { SiteIntegrations } from '@/types/site-integrations';
import type { SiteScripts } from '@/types/site-scripts';

type AdminLandingEditPageProps = {
    content: LandingPageContent;
    integrations: SiteIntegrations;
    appearance: SiteAppearance;
    scripts: SiteScripts;
    flash?: { success?: string };
};

type Tab = 'content' | 'integrations' | 'appearance' | 'scripts';

export default function AdminLandingEdit() {
    const { content, integrations, appearance, scripts, flash } = usePage<AdminLandingEditPageProps>().props;
    const [activeTab, setActiveTab] = useState<Tab>('content');

    const contentForm = useForm({
        content,
    });

    const integrationsForm = useForm({
        integrations,
    });

    const appearanceForm = useForm({
        appearance,
    });

    const scriptsForm = useForm({
        scripts,
    });

    function submitContent(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        contentForm.put('/admin/landing', { preserveScroll: true });
    }

    function submitIntegrations(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        integrationsForm.put('/admin/landing/integrations', { preserveScroll: true });
    }

    function submitAppearance(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        appearanceForm.put('/admin/landing/appearance', { preserveScroll: true });
    }

    function submitScripts(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        scriptsForm.put('/admin/landing/scripts', { preserveScroll: true });
    }

    const tabs: Array<{ id: Tab; label: string }> = [
        { id: 'content', label: 'Page content' },
        { id: 'integrations', label: 'WhatsApp & community' },
        { id: 'appearance', label: 'Logo & blog colours' },
        { id: 'scripts', label: 'Analytics & scripts' },
    ];

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
                            Manage homepage content, branding, blog colours, analytics scripts, and WhatsApp CTAs.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/" target="_blank">
                                Preview site
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={dashboard()}>Back to dashboard</Link>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 border-b border-border pb-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
                                activeTab === tab.id
                                    ? 'border-b-2 border-primary text-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'content' && <LandingPageForm form={contentForm} onSubmit={submitContent} />}
                {activeTab === 'integrations' && (
                    <SiteIntegrationsForm form={integrationsForm} onSubmit={submitIntegrations} />
                )}
                {activeTab === 'appearance' && (
                    <SiteAppearanceForm form={appearanceForm} onSubmit={submitAppearance} />
                )}
                {activeTab === 'scripts' && <SiteScriptsForm form={scriptsForm} onSubmit={submitScripts} />}
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
