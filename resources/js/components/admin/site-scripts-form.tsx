import type { FormEvent } from 'react';
import type { SiteScripts } from '@/types/site-scripts';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type Props = {
    form: {
        data: { scripts: SiteScripts };
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

export default function SiteScriptsForm({ form, onSubmit }: Props) {
    const { scripts } = form.data;

    function update(field: keyof SiteScripts, value: string) {
        form.setData('scripts', {
            ...scripts,
            [field]: value,
        });
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-lg font-semibold">Head scripts</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Paste Google Analytics, Tag Manager, or other scripts that belong inside the{' '}
                    <code className="rounded bg-muted px-1">&lt;head&gt;</code> tag.
                </p>
                <label className="mt-4 block space-y-2">
                    <Label htmlFor="scripts_head">Head markup</Label>
                    <textarea
                        id="scripts_head"
                        value={scripts.head}
                        onChange={(event) => update('head', event.target.value)}
                        rows={10}
                        placeholder={'<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"></script>\n<script>...</script>'}
                        className="flex min-h-40 w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-xs shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    />
                    <FieldError message={form.errors['scripts.head']} />
                </label>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-lg font-semibold">Body scripts</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Optional scripts injected before the closing{' '}
                    <code className="rounded bg-muted px-1">&lt;/body&gt;</code> tag (chat widgets, pixels, etc.).
                </p>
                <label className="mt-4 block space-y-2">
                    <Label htmlFor="scripts_body_end">Body markup</Label>
                    <textarea
                        id="scripts_body_end"
                        value={scripts.body_end}
                        onChange={(event) => update('body_end', event.target.value)}
                        rows={10}
                        placeholder="<script>...</script>"
                        className="flex min-h-40 w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-xs shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    />
                    <FieldError message={form.errors['scripts.body_end']} />
                </label>
            </section>

            <div className="flex justify-end">
                <Button type="submit" disabled={form.processing}>
                    {form.processing ? 'Saving…' : 'Save scripts'}
                </Button>
            </div>
        </form>
    );
}
