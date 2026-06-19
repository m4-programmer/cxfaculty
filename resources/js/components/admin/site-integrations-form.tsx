import type { FormEvent } from 'react';
import type { SiteIntegrations } from '@/types/site-integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
    form: {
        data: { integrations: SiteIntegrations };
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

export default function SiteIntegrationsForm({ form, onSubmit }: Props) {
    const { integrations } = form.data;

    function update(field: keyof SiteIntegrations, value: string) {
        form.setData('integrations', {
            ...integrations,
            [field]: value,
        });
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-lg font-semibold">WhatsApp scheduling</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Used by the discovery call and start a conversation buttons on the main landing page.
                </p>
                <div className="mt-4 grid gap-4">
                    <label className="block space-y-2">
                        <Label htmlFor="whatsapp_scheduling_url">WhatsApp number or link</Label>
                        <Input
                            id="whatsapp_scheduling_url"
                            value={integrations.whatsapp_scheduling_url}
                            onChange={(event) => update('whatsapp_scheduling_url', event.target.value)}
                            placeholder="https://wa.me/1234567890"
                        />
                        <FieldError message={form.errors['integrations.whatsapp_scheduling_url']} />
                    </label>
                    <label className="block space-y-2">
                        <Label htmlFor="discovery_call_message">Discovery call pre-filled message</Label>
                        <textarea
                            id="discovery_call_message"
                            value={integrations.discovery_call_message}
                            onChange={(event) => update('discovery_call_message', event.target.value)}
                            rows={3}
                            className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                        <FieldError message={form.errors['integrations.discovery_call_message']} />
                    </label>
                    <label className="block space-y-2">
                        <Label htmlFor="conversation_message">Start a conversation pre-filled message</Label>
                        <textarea
                            id="conversation_message"
                            value={integrations.conversation_message}
                            onChange={(event) => update('conversation_message', event.target.value)}
                            rows={3}
                            className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                        <FieldError message={form.errors['integrations.conversation_message']} />
                    </label>
                </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-lg font-semibold">WhatsApp community</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Shown after someone submits the join community form at <code className="rounded bg-muted px-1">/community/join</code>.
                </p>
                <div className="mt-4">
                    <label className="block space-y-2">
                        <Label htmlFor="whatsapp_community_url">Community invite link</Label>
                        <Input
                            id="whatsapp_community_url"
                            value={integrations.whatsapp_community_url}
                            onChange={(event) => update('whatsapp_community_url', event.target.value)}
                            placeholder="https://chat.whatsapp.com/..."
                        />
                        <FieldError message={form.errors['integrations.whatsapp_community_url']} />
                    </label>
                </div>
            </section>

            <div className="flex justify-end">
                <Button type="submit" disabled={form.processing}>
                    {form.processing ? 'Saving…' : 'Save WhatsApp & community settings'}
                </Button>
            </div>
        </form>
    );
}
