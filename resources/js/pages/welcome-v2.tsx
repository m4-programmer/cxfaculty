import type { FormEvent } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PostCard, { type PostSummary } from '@/components/blog/post-card';
import type { LandingPageV2Content } from '@/types/landing-page';

type WelcomeV2PageProps = {
    landing: LandingPageV2Content;
    featuredPosts: (PostSummary & { tags?: string[] })[];
    flash?: { success?: string };
};

export default function WelcomeV2() {
    const { landing, featuredPosts, flash } = usePage<WelcomeV2PageProps>().props;

    const form = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        form.post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset('message', 'website');
            },
        });
    }

    const normalizedPosts: PostSummary[] = featuredPosts.map((post) => ({
        ...post,
        tags: post.tags ?? [],
        reading_time: post.reading_time ?? 1,
        featured_image: post.featured_image ?? null,
    }));

    return (
        <>
            <Head title={landing.seo.title}>
                <meta name="description" content={landing.seo.description} />
                <link rel="canonical" href={`${window.location.origin}/`} />
            </Head>

            <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
                <section className={`grid gap-10 ${landing.sidebar.enabled ? 'lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center' : ''}`}>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-amber-200">
                                {landing.hero.badge}
                            </span>
                            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                {landing.hero.headline}
                            </h1>
                            <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                                {landing.hero.description}
                            </p>
                        </div>

                        {landing.hero.cards.length > 0 && (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {landing.hero.cards.map((card) => (
                                    <div key={card.label} className="landing-card">
                                        <p className="text-sm uppercase tracking-[0.32em] text-amber-300">{card.label}</p>
                                        <p className="mt-4 text-base leading-7 text-white/70">{card.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-wrap gap-4">
                            {landing.contact.enabled && (
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center rounded-full bg-amber-300 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-400"
                                >
                                    {landing.hero.cta_consultation}
                                </a>
                            )}
                            <Link
                                href="/community/join"
                                className="inline-flex items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-200 transition hover:border-amber-300 hover:bg-amber-300/20"
                            >
                                {landing.hero.cta_community}
                            </Link>
                            {landing.blog.enabled && (
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
                                >
                                    {landing.hero.cta_blog}
                                </Link>
                            )}
                        </div>
                    </div>

                    {landing.sidebar.enabled && (
                        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 shadow-[0_40px_80px_-50px_rgba(255,193,7,0.5)] backdrop-blur-sm">
                            <div
                                className="pointer-events-none absolute inset-x-0 top-0 h-72"
                                style={{ background: 'radial-gradient(circle at top right, rgba(255,193,7,0.18), transparent 42%)' }}
                            />
                            <div className="relative space-y-8 pt-6">
                                <div className="space-y-2">
                                    <p className="text-sm uppercase tracking-[0.32em] text-amber-300">{landing.sidebar.eyebrow}</p>
                                    <h2 className="text-3xl font-bold text-white">{landing.sidebar.headline}</h2>
                                </div>
                                <p className="text-base leading-7 text-white/75">{landing.sidebar.description}</p>
                            </div>
                        </div>
                    )}
                </section>

                {landing.services.enabled && (
                    <section id="services" className="mt-20 space-y-8">
                        <div className="space-y-3">
                            <p className="text-sm uppercase tracking-[0.32em] text-amber-300">{landing.services.eyebrow}</p>
                            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                                {landing.services.headline}
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {landing.services.items.map((item) => (
                                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {landing.blog.enabled && (
                    <section id="blog" className="mt-24 space-y-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.32em] text-amber-300">{landing.blog.eyebrow}</p>
                                <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                                    {landing.blog.headline}
                                </h2>
                            </div>
                            <Link
                                href="/blog"
                                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
                            >
                                {landing.blog.cta}
                            </Link>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {normalizedPosts.length > 0 ? (
                                normalizedPosts.map((post) => <PostCard key={post.slug} post={post} />)
                            ) : (
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70 md:col-span-2 lg:col-span-3">
                                    {landing.blog.empty_message}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {landing.contact.enabled && (
                    <section id="contact" className="mt-24 rounded-4xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_40px_80px_-50px_rgba(255,193,7,0.35)] sm:p-8 lg:p-12">
                        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
                            <div className="space-y-5">
                                <p className="text-sm uppercase tracking-[0.32em] text-amber-300">{landing.contact.eyebrow}</p>
                                <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                                    {landing.contact.headline}
                                </h2>
                                <p className="max-w-xl text-base leading-7 text-white/70">{landing.contact.description}</p>
                                {flash?.success && (
                                    <div className="rounded-3xl border border-amber-300/25 bg-amber-300/10 p-5 text-sm text-amber-100">
                                        {flash.success}
                                    </div>
                                )}
                            </div>

                            <form onSubmit={submit} className="space-y-5">
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
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block text-sm font-medium text-white/75">
                                        Name
                                        <input
                                            value={form.data.name}
                                            onChange={(event) => form.setData('name', event.target.value)}
                                            type="text"
                                            required
                                            className="mt-2 w-full rounded-3xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                                            placeholder="Your name"
                                        />
                                        {form.errors.name && <p className="mt-2 text-xs text-rose-400">{form.errors.name}</p>}
                                    </label>
                                    <label className="block text-sm font-medium text-white/75">
                                        Email
                                        <input
                                            value={form.data.email}
                                            onChange={(event) => form.setData('email', event.target.value)}
                                            type="email"
                                            required
                                            className="mt-2 w-full rounded-3xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                                            placeholder="email@example.com"
                                        />
                                        {form.errors.email && <p className="mt-2 text-xs text-rose-400">{form.errors.email}</p>}
                                    </label>
                                </div>
                                <label className="block text-sm font-medium text-white/75">
                                    Subject
                                    <input
                                        value={form.data.subject}
                                        onChange={(event) => form.setData('subject', event.target.value)}
                                        type="text"
                                        required
                                        className="mt-2 w-full rounded-3xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                                        placeholder="What would you like help with?"
                                    />
                                    {form.errors.subject && <p className="mt-2 text-xs text-rose-400">{form.errors.subject}</p>}
                                </label>
                                <label className="block text-sm font-medium text-white/75">
                                    Message
                                    <textarea
                                        value={form.data.message}
                                        onChange={(event) => form.setData('message', event.target.value)}
                                        rows={5}
                                        required
                                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                                        placeholder="Tell us about your project"
                                    />
                                    {form.errors.message && <p className="mt-2 text-xs text-rose-400">{form.errors.message}</p>}
                                </label>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {form.processing ? 'Sending…' : landing.contact.submit_label}
                                </button>
                            </form>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
