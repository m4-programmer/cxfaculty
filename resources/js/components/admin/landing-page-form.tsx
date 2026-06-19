import type { FormEvent } from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import type { LandingPageContent, LandingPageFooterLink } from '@/types/landing-page';
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

function LinesField({
    label,
    values,
    onChange,
    errorPrefix,
    errors,
}: {
    label: string;
    values: string[];
    onChange: (values: string[]) => void;
    errorPrefix: string;
    errors: Record<string, string>;
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{label}</span>
                <Button type="button" variant="outline" size="sm" onClick={() => onChange([...values, ''])}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add line
                </Button>
            </div>
            {values.map((value, index) => (
                <div key={index} className="flex gap-2">
                    <Input value={value} onChange={(event) => onChange(values.map((item, i) => (i === index ? event.target.value : item)))} />
                    {values.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => onChange(values.filter((_, i) => i !== index))}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                    <FieldError message={errors[`${errorPrefix}.${index}`]} />
                </div>
            ))}
        </div>
    );
}

function StringListField({
    label,
    values,
    onChange,
    errorPrefix,
    errors,
}: {
    label: string;
    values: string[];
    onChange: (values: string[]) => void;
    errorPrefix: string;
    errors: Record<string, string>;
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{label}</span>
                <Button type="button" variant="outline" size="sm" onClick={() => onChange([...values, ''])}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add item
                </Button>
            </div>
            {values.map((value, index) => (
                <div key={index} className="flex gap-2">
                    <Input value={value} onChange={(event) => onChange(values.map((item, i) => (i === index ? event.target.value : item)))} />
                    {values.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => onChange(values.filter((_, i) => i !== index))}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                    <FieldError message={errors[`${errorPrefix}.${index}`]} />
                </div>
            ))}
        </div>
    );
}

function LinkListField({
    label,
    links,
    onChange,
    errorPrefix,
    errors,
}: {
    label: string;
    links: LandingPageFooterLink[];
    onChange: (links: LandingPageFooterLink[]) => void;
    errorPrefix: string;
    errors: Record<string, string>;
}) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{label}</span>
                <Button type="button" variant="outline" size="sm" onClick={() => onChange([...links, { label: '', href: '' }])}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add link
                </Button>
            </div>
            {links.map((link, index) => (
                <div key={index} className="grid gap-3 rounded-xl border border-border p-4 md:grid-cols-[1fr_1fr_auto]">
                    <TextField
                        label="Label"
                        value={link.label}
                        onChange={(value) => onChange(links.map((item, i) => (i === index ? { ...item, label: value } : item)))}
                        error={errors[`${errorPrefix}.${index}.label`]}
                    />
                    <TextField
                        label="URL or anchor"
                        value={link.href}
                        onChange={(value) => onChange(links.map((item, i) => (i === index ? { ...item, href: value } : item)))}
                        error={errors[`${errorPrefix}.${index}.href`]}
                    />
                    {links.length > 1 && (
                        <div className="flex items-end">
                            <Button type="button" variant="ghost" size="icon" onClick={() => onChange(links.filter((_, i) => i !== index))}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            ))}
        </div>
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

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Section title="SEO" description="Page title and meta description." defaultOpen>
                <div className="grid gap-4">
                    <TextField label="Page title" value={content.seo.title} onChange={(v) => updateContent('seo.title', v)} error={form.errors['content.seo.title']} />
                    <TextField label="Meta description" value={content.seo.description} onChange={(v) => updateContent('seo.description', v)} error={form.errors['content.seo.description']} multiline />
                </div>
            </Section>

            <Section title="Navigation" description="Top navigation call-to-action label." defaultOpen>
                <TextField label="Nav CTA label" value={content.nav.cta_label} onChange={(v) => updateContent('nav.cta_label', v)} error={form.errors['content.nav.cta_label']} />
            </Section>

            <Section title="Hero" description="Main headline, stats, and primary actions." defaultOpen>
                <div className="grid gap-4">
                    <TextField label="Eyebrow" value={content.hero.eyebrow} onChange={(v) => updateContent('hero.eyebrow', v)} error={form.errors['content.hero.eyebrow']} />
                    <LinesField label="Headline lines" values={content.hero.headline_lines} onChange={(v) => updateContent('hero.headline_lines', v)} errorPrefix="content.hero.headline_lines" errors={form.errors} />
                    <TextField label="Headline emphasis" value={content.hero.headline_emphasis} onChange={(v) => updateContent('hero.headline_emphasis', v)} error={form.errors['content.hero.headline_emphasis']} />
                    <TextField label="Description" value={content.hero.description} onChange={(v) => updateContent('hero.description', v)} error={form.errors['content.hero.description']} multiline rows={4} />
                    <div className="space-y-3">
                        <p className="text-sm font-medium">Stats</p>
                        {content.hero.stats.map((stat, index) => (
                            <div key={index} className="grid gap-3 rounded-xl border border-border p-4 md:grid-cols-2">
                                <TextField label="Value" value={stat.value} onChange={(v) => updateContent('hero.stats', content.hero.stats.map((s, i) => (i === index ? { ...s, value: v } : s)))} error={form.errors[`content.hero.stats.${index}.value`]} />
                                <TextField label="Label" value={stat.label} onChange={(v) => updateContent('hero.stats', content.hero.stats.map((s, i) => (i === index ? { ...s, label: v } : s)))} error={form.errors[`content.hero.stats.${index}.label`]} />
                            </div>
                        ))}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <TextField label="Primary CTA" value={content.hero.cta_primary} onChange={(v) => updateContent('hero.cta_primary', v)} error={form.errors['content.hero.cta_primary']} />
                        <TextField label="Secondary CTA" value={content.hero.cta_secondary} onChange={(v) => updateContent('hero.cta_secondary', v)} error={form.errors['content.hero.cta_secondary']} />
                    </div>
                </div>
            </Section>

            <Section title="Ticker" description="Scrolling capability strip below the hero." enabled={content.ticker.enabled} onEnabledChange={(v) => updateContent('ticker.enabled', v)}>
                <StringListField label="Ticker items" values={content.ticker.items} onChange={(v) => updateContent('ticker.items', v)} errorPrefix="content.ticker.items" errors={form.errors} />
            </Section>

            <Section title="Philosophy" description="Left narrative and right pillars." enabled={content.philosophy.enabled} onEnabledChange={(v) => updateContent('philosophy.enabled', v)}>
                <div className="grid gap-4">
                    <TextField label="Eyebrow" value={content.philosophy.eyebrow} onChange={(v) => updateContent('philosophy.eyebrow', v)} error={form.errors['content.philosophy.eyebrow']} />
                    <LinesField label="Headline lines" values={content.philosophy.headline_lines} onChange={(v) => updateContent('philosophy.headline_lines', v)} errorPrefix="content.philosophy.headline_lines" errors={form.errors} />
                    <TextField label="Headline emphasis" value={content.philosophy.headline_emphasis} onChange={(v) => updateContent('philosophy.headline_emphasis', v)} error={form.errors['content.philosophy.headline_emphasis']} />
                    <StringListField label="Paragraphs" values={content.philosophy.paragraphs} onChange={(v) => updateContent('philosophy.paragraphs', v)} errorPrefix="content.philosophy.paragraphs" errors={form.errors} />
                    {content.philosophy.pillars.map((pillar, index) => (
                        <div key={index} className="space-y-3 rounded-xl border border-border p-4">
                            <TextField label={`Pillar ${index + 1} number`} value={pillar.number} onChange={(v) => updateContent('philosophy.pillars', content.philosophy.pillars.map((p, i) => (i === index ? { ...p, number: v } : p)))} />
                            <TextField label="Title" value={pillar.title} onChange={(v) => updateContent('philosophy.pillars', content.philosophy.pillars.map((p, i) => (i === index ? { ...p, title: v } : p)))} />
                            <TextField label="Description" value={pillar.description} onChange={(v) => updateContent('philosophy.pillars', content.philosophy.pillars.map((p, i) => (i === index ? { ...p, description: v } : p)))} multiline />
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Services" description="Three practice cards with feature bullets." enabled={content.services.enabled} onEnabledChange={(v) => updateContent('services.enabled', v)}>
                <div className="grid gap-4">
                    <TextField label="Eyebrow" value={content.services.eyebrow} onChange={(v) => updateContent('services.eyebrow', v)} />
                    <LinesField label="Headline lines" values={content.services.headline_lines} onChange={(v) => updateContent('services.headline_lines', v)} errorPrefix="content.services.headline_lines" errors={form.errors} />
                    <TextField label="Headline emphasis" value={content.services.headline_emphasis} onChange={(v) => updateContent('services.headline_emphasis', v)} />
                    <TextField label="Description" value={content.services.description} onChange={(v) => updateContent('services.description', v)} multiline rows={4} />
                    {content.services.items.map((item, index) => (
                        <div key={index} className="space-y-3 rounded-xl border border-border p-4">
                            <TextField label="Number label" value={item.number} onChange={(v) => updateContent('services.items', content.services.items.map((s, i) => (i === index ? { ...s, number: v } : s)))} />
                            <TextField label="Title" value={item.title} onChange={(v) => updateContent('services.items', content.services.items.map((s, i) => (i === index ? { ...s, title: v } : s)))} />
                            <TextField label="Description" value={item.description} onChange={(v) => updateContent('services.items', content.services.items.map((s, i) => (i === index ? { ...s, description: v } : s)))} multiline />
                            <StringListField label="Features" values={item.features} onChange={(v) => updateContent('services.items', content.services.items.map((s, i) => (i === index ? { ...s, features: v } : s)))} errorPrefix={`content.services.items.${index}.features`} errors={form.errors} />
                            <TextField label="CTA label" value={item.cta_label} onChange={(v) => updateContent('services.items', content.services.items.map((s, i) => (i === index ? { ...s, cta_label: v } : s)))} />
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Process" description="Four-step approach section." enabled={content.process.enabled} onEnabledChange={(v) => updateContent('process.enabled', v)}>
                <div className="grid gap-4">
                    <TextField label="Eyebrow" value={content.process.eyebrow} onChange={(v) => updateContent('process.eyebrow', v)} />
                    <TextField label="Headline prefix" value={content.process.headline} onChange={(v) => updateContent('process.headline', v)} />
                    <TextField label="Headline emphasis" value={content.process.headline_emphasis} onChange={(v) => updateContent('process.headline_emphasis', v)} />
                    <TextField label="Description" value={content.process.description} onChange={(v) => updateContent('process.description', v)} multiline />
                    {content.process.steps.map((step, index) => (
                        <div key={index} className="grid gap-3 rounded-xl border border-border p-4 md:grid-cols-3">
                            <TextField label="Number" value={step.number} onChange={(v) => updateContent('process.steps', content.process.steps.map((s, i) => (i === index ? { ...s, number: v } : s)))} />
                            <TextField label="Title" value={step.title} onChange={(v) => updateContent('process.steps', content.process.steps.map((s, i) => (i === index ? { ...s, title: v } : s)))} />
                            <TextField label="Description" value={step.description} onChange={(v) => updateContent('process.steps', content.process.steps.map((s, i) => (i === index ? { ...s, description: v } : s)))} multiline />
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Manifesto" description="Quote band between process and why us." enabled={content.manifesto.enabled} onEnabledChange={(v) => updateContent('manifesto.enabled', v)}>
                <div className="grid gap-4">
                    <TextField label="Quote" value={content.manifesto.quote} onChange={(v) => updateContent('manifesto.quote', v)} multiline />
                    <TextField label="Quote emphasis" value={content.manifesto.quote_emphasis} onChange={(v) => updateContent('manifesto.quote_emphasis', v)} />
                    <TextField label="Attribution" value={content.manifesto.attribution} onChange={(v) => updateContent('manifesto.attribution', v)} />
                </div>
            </Section>

            <Section title="Why us" description="Practitioner story and proof cards." enabled={content.why.enabled} onEnabledChange={(v) => updateContent('why.enabled', v)}>
                <div className="grid gap-4">
                    <TextField label="Eyebrow" value={content.why.eyebrow} onChange={(v) => updateContent('why.eyebrow', v)} />
                    <LinesField label="Headline lines" values={content.why.headline_lines} onChange={(v) => updateContent('why.headline_lines', v)} errorPrefix="content.why.headline_lines" errors={form.errors} />
                    <TextField label="Headline emphasis" value={content.why.headline_emphasis} onChange={(v) => updateContent('why.headline_emphasis', v)} />
                    <TextField label="Description" value={content.why.description} onChange={(v) => updateContent('why.description', v)} multiline rows={4} />
                    <TextField label="WhatsApp CTA label" value={content.why.cta_label} onChange={(v) => updateContent('why.cta_label', v)} />
                    {content.why.cards.map((card, index) => (
                        <div key={index} className="space-y-3 rounded-xl border border-border p-4">
                            <TextField label="Title" value={card.title} onChange={(v) => updateContent('why.cards', content.why.cards.map((c, i) => (i === index ? { ...c, title: v } : c)))} />
                            <TextField label="Description" value={card.description} onChange={(v) => updateContent('why.cards', content.why.cards.map((c, i) => (i === index ? { ...c, description: v } : c)))} multiline />
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Industries" description="Sector list grid." enabled={content.industries.enabled} onEnabledChange={(v) => updateContent('industries.enabled', v)}>
                <div className="grid gap-4">
                    <TextField label="Eyebrow" value={content.industries.eyebrow} onChange={(v) => updateContent('industries.eyebrow', v)} />
                    <LinesField label="Headline lines" values={content.industries.headline_lines} onChange={(v) => updateContent('industries.headline_lines', v)} errorPrefix="content.industries.headline_lines" errors={form.errors} />
                    <TextField label="Headline emphasis" value={content.industries.headline_emphasis} onChange={(v) => updateContent('industries.headline_emphasis', v)} />
                    <StringListField label="Industries" values={content.industries.items} onChange={(v) => updateContent('industries.items', v)} errorPrefix="content.industries.items" errors={form.errors} />
                </div>
            </Section>

            <Section title="Blog preview" description="Featured posts section on the landing page." enabled={content.blog.enabled} onEnabledChange={(v) => updateContent('blog.enabled', v)}>
                <div className="grid gap-4">
                    <TextField label="Eyebrow" value={content.blog.eyebrow} onChange={(v) => updateContent('blog.eyebrow', v)} />
                    <TextField label="Headline" value={content.blog.headline} onChange={(v) => updateContent('blog.headline', v)} />
                    <TextField label="Headline emphasis" value={content.blog.headline_emphasis} onChange={(v) => updateContent('blog.headline_emphasis', v)} />
                    <TextField label="View all button" value={content.blog.cta} onChange={(v) => updateContent('blog.cta', v)} />
                    <TextField label="Empty state message" value={content.blog.empty_message} onChange={(v) => updateContent('blog.empty_message', v)} multiline />
                </div>
            </Section>

            <Section title="Community" description="Join community call-to-action block." enabled={content.community.enabled} onEnabledChange={(v) => updateContent('community.enabled', v)}>
                <div className="grid gap-4">
                    <TextField label="Eyebrow" value={content.community.eyebrow} onChange={(v) => updateContent('community.eyebrow', v)} />
                    <TextField label="Headline" value={content.community.headline} onChange={(v) => updateContent('community.headline', v)} />
                    <TextField label="Description" value={content.community.description} onChange={(v) => updateContent('community.description', v)} multiline rows={4} />
                    <TextField label="CTA label" value={content.community.cta_label} onChange={(v) => updateContent('community.cta_label', v)} />
                </div>
            </Section>

            <Section title="Contact form" description="Inquiry form section copy." enabled={content.contact.enabled} onEnabledChange={(v) => updateContent('contact.enabled', v)}>
                <div className="grid gap-4">
                    <TextField label="Eyebrow" value={content.contact.eyebrow} onChange={(v) => updateContent('contact.eyebrow', v)} />
                    <TextField label="Headline" value={content.contact.headline} onChange={(v) => updateContent('contact.headline', v)} multiline />
                    <TextField label="Description" value={content.contact.description} onChange={(v) => updateContent('contact.description', v)} multiline rows={4} />
                    <TextField label="Submit button" value={content.contact.submit_label} onChange={(v) => updateContent('contact.submit_label', v)} />
                </div>
            </Section>

            <Section title="CTA strip" description="Amber band with discovery call button (opens WhatsApp)." enabled={content.cta_strip.enabled} onEnabledChange={(v) => updateContent('cta_strip.enabled', v)}>
                <div className="grid gap-4">
                    <TextField label="Headline" value={content.cta_strip.headline} onChange={(v) => updateContent('cta_strip.headline', v)} multiline />
                    <TextField label="Description" value={content.cta_strip.description} onChange={(v) => updateContent('cta_strip.description', v)} multiline rows={4} />
                    <TextField label="Button label" value={content.cta_strip.button_label} onChange={(v) => updateContent('cta_strip.button_label', v)} />
                    <p className="text-sm text-muted-foreground">
                        WhatsApp URL and pre-filled messages are managed under the <strong>WhatsApp & community</strong> tab.
                    </p>
                </div>
            </Section>

            <Section title="Footer" description="Brand copy, copyright, and footer navigation links.">
                <div className="grid gap-6">
                    <TextField label="Brand description" value={content.footer.brand_description} onChange={(v) => updateContent('footer.brand_description', v)} multiline rows={4} error={form.errors['content.footer.brand_description']} />
                    <TextField label="Copyright" value={content.footer.copyright} onChange={(v) => updateContent('footer.copyright', v)} error={form.errors['content.footer.copyright']} />
                    <TextField label="Tagline" value={content.footer.tagline} onChange={(v) => updateContent('footer.tagline', v)} error={form.errors['content.footer.tagline']} />
                    <LinkListField
                        label="Service links"
                        links={content.footer.service_links}
                        onChange={(v) => updateContent('footer.service_links', v)}
                        errorPrefix="content.footer.service_links"
                        errors={form.errors}
                    />
                    <LinkListField
                        label="Company links"
                        links={content.footer.company_links}
                        onChange={(v) => updateContent('footer.company_links', v)}
                        errorPrefix="content.footer.company_links"
                        errors={form.errors}
                    />
                    <LinkListField
                        label="Connect links"
                        links={content.footer.connect_links}
                        onChange={(v) => updateContent('footer.connect_links', v)}
                        errorPrefix="content.footer.connect_links"
                        errors={form.errors}
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
