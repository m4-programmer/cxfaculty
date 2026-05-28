import type { FormEvent } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PostCard, { type PostSummary } from '@/components/blog/post-card';

type WelcomePageProps = {
    featuredPosts: (PostSummary & { tags?: string[] })[];
    flash?: { success?: string };
};

export default function Welcome() {
    const { featuredPosts, flash } = usePage<WelcomePageProps>().props;

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
            <Head title="CX Faculty | Customer Experience Consulting">
                <meta name="description" content="CX Faculty helps teams transform customer experience with strategy, content, and a modern blog CMS." />
                <link rel="canonical" href={`${window.location.origin}/`} />
            </Head>

            <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
                <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-amber-200">
                                Customer Experience Strategy
                            </span>
                            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Transform your customer experience with clean design, smarter content, and a real CMS.
                            </h1>
                            <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                                CX Faculty blends thoughtful brand storytelling, mobile-first responsiveness, and a built-in blog + admin workflow so your next launch feels modern, fast, and easy to manage.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="landing-card">
                                <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Refinement</p>
                                <p className="mt-4 text-base leading-7 text-white/70">
                                    Clean interface and focused messaging make every interaction feel premium and easy to digest.
                                </p>
                            </div>
                            <div className="landing-card">
                                <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Performance</p>
                                <p className="mt-4 text-base leading-7 text-white/70">
                                    Optimized React and Tailwind tooling keeps the site fast and resilient under load.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-400"
                            >
                                Request a consultation
                            </a>
                            <Link
                                href="/blog"
                                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
                            >
                                Explore the blog
                            </Link>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 shadow-[0_40px_80px_-50px_rgba(255,193,7,0.5)] backdrop-blur-sm">
                        <div
                            className="pointer-events-none absolute inset-x-0 top-0 h-72"
                            style={{ background: 'radial-gradient(circle at top right, rgba(255,193,7,0.18), transparent 42%)' }}
                        />
                        <div className="relative space-y-8 pt-6">
                            <div className="space-y-2">
                                <p className="text-sm uppercase tracking-[0.32em] text-amber-300">What we do</p>
                                <h2 className="text-3xl font-bold text-white">A boutique, results-driven customer experience studio.</h2>
                            </div>
                            <p className="text-base leading-7 text-white/75">
                                Build trust with polished digital content, launch a blog to attract the right audience, and manage updates through a lightweight admin workflow.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="services" className="mt-20 space-y-8">
                    <div className="space-y-3">
                        <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Refinement + strategy</p>
                        <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                            From insight to launch, every detail is polished for modern CX.
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            { title: 'Brand clarity', description: 'Position your offerings with messaging that turns visitors into clients.' },
                            { title: 'Performance', description: 'Optimized front-end flows keep the site responsive and lightweight.' },
                            { title: 'CMS-ready workflow', description: 'Create and manage blog posts with secure admin access and a simple publishing pipeline.' },
                        ].map((item) => (
                            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="blog" className="mt-24 space-y-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Latest insights</p>
                            <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                                Blog posts that make your CX story easier to share.
                            </h2>
                        </div>
                        <Link
                            href="/blog"
                            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
                        >
                            View all posts
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {normalizedPosts.length > 0 ? (
                            normalizedPosts.map((post) => <PostCard key={post.slug} post={post} />)
                        ) : (
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70 md:col-span-2 lg:col-span-3">
                                No published articles yet. Create your first post in the admin panel.
                            </div>
                        )}
                    </div>
                </section>

                <section id="contact" className="mt-24 rounded-4xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_40px_80px_-50px_rgba(255,193,7,0.35)] sm:p-8 lg:p-12">
                    <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
                        <div className="space-y-5">
                            <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Contact & inquiries</p>
                            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                                Let&apos;s talk about your next customer experience launch.
                            </h2>
                            <p className="max-w-xl text-base leading-7 text-white/70">
                                Send a message and we&apos;ll follow up with a proposal for content, blog strategy, or admin setup.
                            </p>
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
                                {form.processing ? 'Sending…' : 'Send inquiry'}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}
