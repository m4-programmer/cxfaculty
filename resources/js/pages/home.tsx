import type { FormEvent } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import CxPostCard, { type CxPostSummary } from '@/components/cx-landing/cx-post-card';
import { ArrowIcon, CxHeadline } from '@/components/cx-landing/cx-headline';
import { buildWhatsAppUrl } from '@/lib/cx-landing';
import type { LandingPageContent } from '@/types/landing-page';

type HomePageProps = {
    landing: LandingPageContent;
    featuredPosts: (CxPostSummary & { tags?: string[] })[];
    whatsappSchedulingUrl: string;
    cxIntegrations: {
        discovery_call_message: string;
        conversation_message: string;
    };
    flash?: { success?: string };
};

export default function Home() {
    const { landing, featuredPosts, whatsappSchedulingUrl, cxIntegrations, flash } = usePage<HomePageProps>().props;

    const form = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
    });

    const discoveryCallUrl = buildWhatsAppUrl(whatsappSchedulingUrl, cxIntegrations.discovery_call_message);

    const conversationUrl = buildWhatsAppUrl(whatsappSchedulingUrl, cxIntegrations.conversation_message);

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        form.post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset('message', 'website');
            },
        });
    }

    const normalizedPosts: CxPostSummary[] = featuredPosts.map((post) => ({
        ...post,
        tags: post.tags ?? [],
        reading_time: post.reading_time ?? 1,
        featured_image: post.featured_image ?? null,
    }));

    const tickerItems = [...landing.ticker.items, ...landing.ticker.items];

    return (
        <>
            <Head title={landing.seo.title}>
                <meta name="description" content={landing.seo.description} />
                <link rel="canonical" href={`${typeof window !== 'undefined' ? window.location.origin : ''}/`} />
            </Head>

            <section className="cx-hero">
                    <div className="cx-hero-grid-line" />
                    <div className="cx-hero-content">
                        <div className="cx-hero-eyebrow">
                            <span>{landing.hero.eyebrow}</span>
                        </div>
                        <h1>
                            {landing.hero.headline_lines.map((line) => (
                                <span key={line}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                            <em>{landing.hero.headline_emphasis}</em>
                        </h1>
                        <p className="cx-hero-desc">{landing.hero.description}</p>
                        <div className="cx-hero-actions">
                            <a href="#services" className="cx-btn-primary">
                                {landing.hero.cta_primary}
                                <ArrowIcon />
                            </a>
                            <a href="#process" className="cx-btn-outline">
                                {landing.hero.cta_secondary}
                            </a>
                        </div>
                    </div>
                    <div className="cx-hero-visual">
                        <div className="cx-hero-stat-grid">
                            {landing.hero.stats.map((stat) => (
                                <div key={stat.label} className="cx-hero-stat">
                                    <div className="cx-hero-stat-num">{stat.value}</div>
                                    <div className="cx-hero-stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {landing.ticker.enabled && (
                    <div className="cx-ticker">
                        <div className="cx-ticker-track">
                            {tickerItems.map((item, index) => (
                                <span key={`${item}-${index}`} className="cx-ticker-item">
                                    <span className="cx-ticker-dot" />
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {landing.philosophy.enabled && (
                    <section className="cx-philosophy">
                        <div className="cx-reveal">
                            <div className="cx-section-label">
                                <span>{landing.philosophy.eyebrow}</span>
                            </div>
                            <CxHeadline lines={landing.philosophy.headline_lines} emphasis={landing.philosophy.headline_emphasis} />
                            {landing.philosophy.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="cx-reveal">
                            {landing.philosophy.pillars.map((pillar) => (
                                <div key={pillar.number} className="cx-pillar">
                                    <span className="cx-pillar-num">{pillar.number}</span>
                                    <div>
                                        <h4>{pillar.title}</h4>
                                        <p>{pillar.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {landing.services.enabled && (
                    <section className="cx-services" id="services">
                        <div className="cx-services-header cx-reveal">
                            <div>
                                <div className="cx-section-label">
                                    <span>{landing.services.eyebrow}</span>
                                </div>
                                <CxHeadline lines={landing.services.headline_lines} emphasis={landing.services.headline_emphasis} />
                            </div>
                            <p>{landing.services.description}</p>
                        </div>
                        <div className="cx-services-grid">
                            {landing.services.items.map((service) => (
                                <div key={service.title} className="cx-service-card cx-reveal">
                                    <div className="cx-service-num">{service.number}</div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <ul className="cx-service-features">
                                        {service.features.map((feature) => (
                                            <li key={feature}>{feature}</li>
                                        ))}
                                    </ul>
                                    <a href="#contact" className="cx-service-link">
                                        {service.cta_label}
                                        <ArrowIcon className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {landing.process.enabled && (
                    <section className="cx-process" id="process">
                        <div className="cx-process-header cx-reveal">
                            <div className="cx-section-label center">
                                <span>{landing.process.eyebrow}</span>
                            </div>
                            <h2 className="cx-headline" style={{ textAlign: 'center' }}>
                                {landing.process.headline} <em>{landing.process.headline_emphasis}</em>
                            </h2>
                            <p>{landing.process.description}</p>
                        </div>
                        <div className="cx-process-steps">
                            {landing.process.steps.map((step) => (
                                <div key={step.number} className="cx-process-step cx-reveal">
                                    <div className="cx-step-circle">
                                        <span className="cx-step-num">{step.number}</span>
                                    </div>
                                    <h4>{step.title}</h4>
                                    <p>{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {landing.manifesto.enabled && (
                    <section className="cx-manifesto">
                        <blockquote className="cx-reveal">
                            &ldquo;{landing.manifesto.quote} <em>{landing.manifesto.quote_emphasis}</em>&rdquo;
                        </blockquote>
                        <cite>{landing.manifesto.attribution}</cite>
                    </section>
                )}

                {landing.why.enabled && (
                    <section className="cx-why" id="why">
                        <div className="cx-why-inner">
                            <div className="cx-why-left cx-reveal">
                                <div className="cx-section-label">
                                    <span>{landing.why.eyebrow}</span>
                                </div>
                                <CxHeadline lines={landing.why.headline_lines} emphasis={landing.why.headline_emphasis} />
                                <p>{landing.why.description}</p>
                                <a href={conversationUrl} className="cx-btn-primary" target="_blank" rel="noopener noreferrer">
                                    {landing.why.cta_label}
                                    <ArrowIcon />
                                </a>
                            </div>
                            <div className="cx-why-right cx-reveal">
                                {landing.why.cards.map((card) => (
                                    <div key={card.title} className="cx-why-card">
                                        <h4>{card.title}</h4>
                                        <p>{card.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {landing.industries.enabled && (
                    <section className="cx-industries" id="industries">
                        <div className="cx-reveal">
                            <div className="cx-section-label">
                                <span>{landing.industries.eyebrow}</span>
                            </div>
                            <CxHeadline lines={landing.industries.headline_lines} emphasis={landing.industries.headline_emphasis} />
                        </div>
                        <div className="cx-industry-list cx-reveal">
                            {landing.industries.items.map((industry) => (
                                <div key={industry} className="cx-industry-item">
                                    <span className="cx-industry-name">{industry}</span>
                                    <ArrowIcon className="h-4 w-4 stroke-white/20" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {landing.blog.enabled && (
                    <section className="cx-blog" id="blog">
                        <div className="cx-blog-header cx-reveal">
                            <div>
                                <div className="cx-section-label">
                                    <span>{landing.blog.eyebrow}</span>
                                </div>
                                <h2 className="cx-headline">
                                    {landing.blog.headline} <em>{landing.blog.headline_emphasis}</em>
                                </h2>
                            </div>
                            <Link href="/blog" className="cx-btn-outline">
                                {landing.blog.cta}
                            </Link>
                        </div>
                        <div className="cx-blog-grid">
                            {normalizedPosts.length > 0 ? (
                                normalizedPosts.map((post) => <CxPostCard key={post.slug} post={post} />)
                            ) : (
                                <div className="cx-reveal rounded-xl border border-white/10 bg-black/40 p-8 text-white/70 md:col-span-2 lg:col-span-3">
                                    {landing.blog.empty_message}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {landing.community.enabled && (
                    <section className="cx-community" id="community">
                        <div className="cx-community-inner cx-reveal">
                            <div>
                                <div className="cx-section-label">
                                    <span>{landing.community.eyebrow}</span>
                                </div>
                                <h2 className="cx-headline">{landing.community.headline}</h2>
                                <p>{landing.community.description}</p>
                            </div>
                            <Link href="/community/join" className="cx-btn-primary">
                                {landing.community.cta_label}
                                <ArrowIcon />
                            </Link>
                        </div>
                    </section>
                )}

                {landing.contact.enabled && (
                    <section className="cx-contact" id="contact">
                        <div className="cx-contact-grid cx-reveal">
                            <div>
                                <div className="cx-section-label">
                                    <span>{landing.contact.eyebrow}</span>
                                </div>
                                <h2 className="cx-headline">{landing.contact.headline}</h2>
                                <p>{landing.contact.description}</p>
                                {flash?.success && <div className="cx-flash">{flash.success}</div>}
                            </div>
                            <form onSubmit={submit} className="cx-form">
                                <input
                                    type="text"
                                    name="website"
                                    value={form.data.website}
                                    onChange={(event) => form.setData('website', event.target.value)}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    className="hidden"
                                    aria-hidden="true"
                                />
                                <div className="cx-form-row">
                                    <label>
                                        Name
                                        <input
                                            value={form.data.name}
                                            onChange={(event) => form.setData('name', event.target.value)}
                                            type="text"
                                            required
                                            placeholder="Your name"
                                        />
                                        {form.errors.name && <p className="cx-form-error">{form.errors.name}</p>}
                                    </label>
                                    <label>
                                        Email
                                        <input
                                            value={form.data.email}
                                            onChange={(event) => form.setData('email', event.target.value)}
                                            type="email"
                                            required
                                            placeholder="email@example.com"
                                        />
                                        {form.errors.email && <p className="cx-form-error">{form.errors.email}</p>}
                                    </label>
                                </div>
                                <label>
                                    Subject
                                    <input
                                        value={form.data.subject}
                                        onChange={(event) => form.setData('subject', event.target.value)}
                                        type="text"
                                        required
                                        placeholder="What would you like help with?"
                                    />
                                    {form.errors.subject && <p className="cx-form-error">{form.errors.subject}</p>}
                                </label>
                                <label>
                                    Message
                                    <textarea
                                        value={form.data.message}
                                        onChange={(event) => form.setData('message', event.target.value)}
                                        rows={5}
                                        required
                                        placeholder="Tell us about your project"
                                    />
                                    {form.errors.message && <p className="cx-form-error">{form.errors.message}</p>}
                                </label>
                                <button type="submit" disabled={form.processing} className="cx-btn-primary">
                                    {form.processing ? 'Sending…' : landing.contact.submit_label}
                                </button>
                            </form>
                        </div>
                    </section>
                )}

                {landing.cta_strip.enabled && (
                    <section className="cx-cta-strip">
                        <div className="cx-reveal">
                            <h2>{landing.cta_strip.headline}</h2>
                            <p>{landing.cta_strip.description}</p>
                        </div>
                        <a
                            href={discoveryCallUrl}
                            className="cx-btn-dark cx-reveal"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {landing.cta_strip.button_label}
                            <ArrowIcon />
                        </a>
                    </section>
                )}

            </>
    );
}
