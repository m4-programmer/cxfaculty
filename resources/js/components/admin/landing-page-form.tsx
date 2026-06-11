import type { FormEvent } from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import type { LandingPageContent } from '@/types/landing-page';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormData = {
    content: LandingPageContent;
};

type Props = {
    form: {
        data: FormData;
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

function Section({
    title,
    description,
    enabled,
    onEnabledChange,
    children,
    defaultOpen = false,
}: {
    title: string;
    description: string;
    enabled?: boolean;
    onEnabledChange?: (enabled: boolean) => void;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    return (
        <Collapsible defaultOpen={defaultOpen} className="rounded-2xl border border-border bg-card">
            <div className="flex items-start justify-between gap-4 p-5">
                <div className="flex-1">
                    <CollapsibleTrigger className="group flex w-full items-center justify-between gap-3 text-left">
                        <div>
                            <h2 className="text-lg font-semibold">{title}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                        </div>
                        <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                </div>
                {onEnabledChange !== undefined && (
                    <div className="flex items-center gap-2 pt-1">
                        <Checkbox
                            id={`${title}-enabled`}
                            checked={enabled}
                            onCheckedChange={(checked) => onEnabledChange(checked === true)}
                        />
                        <Label htmlFor={`${title}-enabled`} className="text-sm">
                            Visible
                        </Label>
                    </div>
                )}
            </div>
            <CollapsibleContent className="border-t border-border px-5 pb-5 pt-4">
                {children}
            </CollapsibleContent>
        </Collapsible>
    );
}

function TextField({
    label,
    value,
    onChange,
    error,
    multiline = false,
    rows = 3,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    multiline?: boolean;
    rows?: number;
}) {
    return (
        <label className="block space-y-2">
            <span className="text-sm font-medium">{label}</span>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    rows={rows}
                    className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
            ) : (
                <Input value={value} onChange={(event) => onChange(event.target.value)} />
            )}
            <FieldError message={error} />
        </label>
    );
}

export default function LandingPageForm({ form, onSubmit }: Props) {
    const { content } = form.data;

    function updateContent(path: string, value: unknown) {
        form.setData('content', {
            ...content,
            ...resolvePathUpdate(content, path, value),
        });
    }

    function updateHeroCard(index: number, field: 'label' | 'description', value: string) {
        const cards = content.hero.cards.map((card, cardIndex) =>
            cardIndex === index ? { ...card, [field]: value } : card,
        );
        updateContent('hero.cards', cards);
    }

    function addHeroCard() {
        if (content.hero.cards.length >= 4) {
            return;
        }

        updateContent('hero.cards', [...content.hero.cards, { label: '', description: '' }]);
    }

    function removeHeroCard(index: number) {
        if (content.hero.cards.length <= 1) {
            return;
        }

        updateContent(
            'hero.cards',
            content.hero.cards.filter((_, cardIndex) => cardIndex !== index),
        );
    }

    function updateServiceItem(index: number, field: 'title' | 'description', value: string) {
        const items = content.services.items.map((item, itemIndex) =>
            itemIndex === index ? { ...item, [field]: value } : item,
        );
        updateContent('services.items', items);
    }

    function addServiceItem() {
        if (content.services.items.length >= 6) {
            return;
        }

        updateContent('services.items', [...content.services.items, { title: '', description: '' }]);
    }

    function removeServiceItem(index: number) {
        if (content.services.items.length <= 1) {
            return;
        }

        updateContent(
            'services.items',
            content.services.items.filter((_, itemIndex) => itemIndex !== index),
        );
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Section title="SEO" description="Page title and meta description shown in search results." defaultOpen>
                <div className="grid gap-4">
                    <TextField
                        label="Page title"
                        value={content.seo.title}
                        onChange={(value) => updateContent('seo.title', value)}
                        error={form.errors['content.seo.title']}
                    />
                    <TextField
                        label="Meta description"
                        value={content.seo.description}
                        onChange={(value) => updateContent('seo.description', value)}
                        error={form.errors['content.seo.description']}
                        multiline
                    />
                </div>
            </Section>

            <Section title="Hero" description="Main headline, intro copy, highlight cards, and call-to-action buttons." defaultOpen>
                <div className="grid gap-4">
                    <TextField
                        label="Badge"
                        value={content.hero.badge}
                        onChange={(value) => updateContent('hero.badge', value)}
                        error={form.errors['content.hero.badge']}
                    />
                    <TextField
                        label="Headline"
                        value={content.hero.headline}
                        onChange={(value) => updateContent('hero.headline', value)}
                        error={form.errors['content.hero.headline']}
                        multiline
                    />
                    <TextField
                        label="Description"
                        value={content.hero.description}
                        onChange={(value) => updateContent('hero.description', value)}
                        error={form.errors['content.hero.description']}
                        multiline
                        rows={4}
                    />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Highlight cards</p>
                            <Button type="button" variant="outline" size="sm" onClick={addHeroCard}>
                                <Plus className="mr-1 h-4 w-4" />
                                Add card
                            </Button>
                        </div>
                        {content.hero.cards.map((card, index) => (
                            <div key={index} className="space-y-3 rounded-xl border border-border p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">Card {index + 1}</p>
                                    {content.hero.cards.length > 1 && (
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeHeroCard(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <TextField
                                    label="Label"
                                    value={card.label}
                                    onChange={(value) => updateHeroCard(index, 'label', value)}
                                    error={form.errors[`content.hero.cards.${index}.label`]}
                                />
                                <TextField
                                    label="Description"
                                    value={card.description}
                                    onChange={(value) => updateHeroCard(index, 'description', value)}
                                    error={form.errors[`content.hero.cards.${index}.description`]}
                                    multiline
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <TextField
                            label="Consultation button"
                            value={content.hero.cta_consultation}
                            onChange={(value) => updateContent('hero.cta_consultation', value)}
                            error={form.errors['content.hero.cta_consultation']}
                        />
                        <TextField
                            label="Community button"
                            value={content.hero.cta_community}
                            onChange={(value) => updateContent('hero.cta_community', value)}
                            error={form.errors['content.hero.cta_community']}
                        />
                        <TextField
                            label="Blog button"
                            value={content.hero.cta_blog}
                            onChange={(value) => updateContent('hero.cta_blog', value)}
                            error={form.errors['content.hero.cta_blog']}
                        />
                    </div>
                </div>
            </Section>

            <Section
                title="Sidebar panel"
                description="The highlighted card beside the hero on large screens."
                enabled={content.sidebar.enabled}
                onEnabledChange={(enabled) => updateContent('sidebar.enabled', enabled)}
            >
                <div className="grid gap-4">
                    <TextField
                        label="Eyebrow"
                        value={content.sidebar.eyebrow}
                        onChange={(value) => updateContent('sidebar.eyebrow', value)}
                        error={form.errors['content.sidebar.eyebrow']}
                    />
                    <TextField
                        label="Headline"
                        value={content.sidebar.headline}
                        onChange={(value) => updateContent('sidebar.headline', value)}
                        error={form.errors['content.sidebar.headline']}
                        multiline
                    />
                    <TextField
                        label="Description"
                        value={content.sidebar.description}
                        onChange={(value) => updateContent('sidebar.description', value)}
                        error={form.errors['content.sidebar.description']}
                        multiline
                        rows={4}
                    />
                </div>
            </Section>

            <Section
                title="Services"
                description="Feature cards describing your offerings."
                enabled={content.services.enabled}
                onEnabledChange={(enabled) => updateContent('services.enabled', enabled)}
            >
                <div className="grid gap-4">
                    <TextField
                        label="Eyebrow"
                        value={content.services.eyebrow}
                        onChange={(value) => updateContent('services.eyebrow', value)}
                        error={form.errors['content.services.eyebrow']}
                    />
                    <TextField
                        label="Headline"
                        value={content.services.headline}
                        onChange={(value) => updateContent('services.headline', value)}
                        error={form.errors['content.services.headline']}
                        multiline
                    />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Service items</p>
                            <Button type="button" variant="outline" size="sm" onClick={addServiceItem}>
                                <Plus className="mr-1 h-4 w-4" />
                                Add item
                            </Button>
                        </div>
                        {content.services.items.map((item, index) => (
                            <div key={index} className="space-y-3 rounded-xl border border-border p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">Item {index + 1}</p>
                                    {content.services.items.length > 1 && (
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeServiceItem(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <TextField
                                    label="Title"
                                    value={item.title}
                                    onChange={(value) => updateServiceItem(index, 'title', value)}
                                    error={form.errors[`content.services.items.${index}.title`]}
                                />
                                <TextField
                                    label="Description"
                                    value={item.description}
                                    onChange={(value) => updateServiceItem(index, 'description', value)}
                                    error={form.errors[`content.services.items.${index}.description`]}
                                    multiline
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section
                title="Blog preview"
                description="Heading and call-to-action above featured blog posts."
                enabled={content.blog.enabled}
                onEnabledChange={(enabled) => updateContent('blog.enabled', enabled)}
            >
                <div className="grid gap-4">
                    <TextField
                        label="Eyebrow"
                        value={content.blog.eyebrow}
                        onChange={(value) => updateContent('blog.eyebrow', value)}
                        error={form.errors['content.blog.eyebrow']}
                    />
                    <TextField
                        label="Headline"
                        value={content.blog.headline}
                        onChange={(value) => updateContent('blog.headline', value)}
                        error={form.errors['content.blog.headline']}
                        multiline
                    />
                    <TextField
                        label="View all button"
                        value={content.blog.cta}
                        onChange={(value) => updateContent('blog.cta', value)}
                        error={form.errors['content.blog.cta']}
                    />
                    <TextField
                        label="Empty state message"
                        value={content.blog.empty_message}
                        onChange={(value) => updateContent('blog.empty_message', value)}
                        error={form.errors['content.blog.empty_message']}
                        multiline
                    />
                </div>
            </Section>

            <Section
                title="Contact"
                description="Inquiry section heading and supporting copy."
                enabled={content.contact.enabled}
                onEnabledChange={(enabled) => updateContent('contact.enabled', enabled)}
            >
                <div className="grid gap-4">
                    <TextField
                        label="Eyebrow"
                        value={content.contact.eyebrow}
                        onChange={(value) => updateContent('contact.eyebrow', value)}
                        error={form.errors['content.contact.eyebrow']}
                    />
                    <TextField
                        label="Headline"
                        value={content.contact.headline}
                        onChange={(value) => updateContent('contact.headline', value)}
                        error={form.errors['content.contact.headline']}
                        multiline
                    />
                    <TextField
                        label="Description"
                        value={content.contact.description}
                        onChange={(value) => updateContent('contact.description', value)}
                        error={form.errors['content.contact.description']}
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="Submit button"
                        value={content.contact.submit_label}
                        onChange={(value) => updateContent('contact.submit_label', value)}
                        error={form.errors['content.contact.submit_label']}
                    />
                </div>
            </Section>

            <div className="flex justify-end">
                <Button type="submit" disabled={form.processing}>
                    {form.processing ? 'Saving…' : 'Save landing page'}
                </Button>
            </div>
        </form>
    );
}

function resolvePathUpdate(content: LandingPageContent, path: string, value: unknown): Partial<LandingPageContent> {
    const [section, field] = path.split('.');

    if (!field) {
        return {};
    }

    const sectionValue = content[section as keyof LandingPageContent];

    if (typeof sectionValue !== 'object' || sectionValue === null) {
        return {};
    }

    return {
        [section]: {
            ...sectionValue,
            [field]: value,
        },
    } as Partial<LandingPageContent>;
}
