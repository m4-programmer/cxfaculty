import type { FormEvent } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

type FeaturedPost = {
    title: string;
    excerpt: string;
    slug: string;
    published_at: string | null;
};

type PageProps = {
    auth: { user: { name: string } | null };
    featuredPosts: FeaturedPost[];
    flash?: { success?: string };
};

export default function Welcome() {
    const { auth, featuredPosts, flash } = usePage<PageProps>().props;

    const form = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        form.post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset('message');
            },
        });
    }

    return (
        <>
            <Head title="CX Faculty | Customer Experience Consulting" />

            <div className="min-h-screen bg-black text-white">
                <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
                        <div className="text-sm font-semibold uppercase tracking-[0.33em] text-amber-300">
                            CX Faculty
                        </div>

                        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.22em] text-white/75 md:flex">
                            <a href="#services" className="transition hover:text-amber-300">
                                Services
                            </a>
                            <a href="#blog" className="transition hover:text-amber-300">
                                Blog
                            </a>
                            <a href="#contact" className="transition hover:text-amber-300">
                                Contact
                            </a>
                            <Link href="/blog" className="transition hover:text-amber-300">
                                Articles
                            </Link>
                        </nav>

                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href="/dashboard"
                                    className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-400"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-400"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-8">
                    <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-amber-200">
                                    Customer Experience Strategy
                                </span>
                                <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl">
                                    Transform your customer experience with a clean design, smarter content, and a real CMS.
                                </h1>
                                <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                                    CX Faculty blends thoughtful brand storytelling, mobile-first responsiveness, and a built-in blog + admin workflow so your next launch feels modern, fast, and easy to manage.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-4xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-45px_rgba(255,193,7,0.5)] backdrop-blur-sm">
                                    <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Refinement</p>
                                    <p className="mt-4 text-base leading-7 text-white/70">
                                        Clean interface and focused messaging make every interaction feel premium and easy to digest.
                                    </p>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-45px_rgba(255,193,7,0.5)] backdrop-blur-sm">
                                    <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Performance</p>
                                    <p className="mt-4 text-base leading-7 text-white/70">
                                        Static-first rendering with modern React/Tailwind tooling keeps the site fast and resilient under load.
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
                                <div className="grid gap-4 rounded-3xl bg-black/60 p-6">
                                    <div className="space-y-1">
                                        <p className="text-sm uppercase tracking-[0.28em] text-amber-200">SEO & content</p>
                                        <p className="text-sm text-white/70">
                                            SEO-friendly metadata and fast page structure help the site perform on search and social platforms.
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm uppercase tracking-[0.28em] text-amber-200">Mobile first</p>
                                        <p className="text-sm text-white/70">
                                            Responsive layouts, accessible controls, and clean navigation make it easy on every device.
                                        </p>
                                    </div>
                                </div>
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

                        <div className="grid gap-6 lg:grid-cols-3">
                            {[
                                {
                                    title: 'Brand clarity',
                                    description: 'Position your offerings with messaging that turns visitors into clients.',
                                },
                                {
                                    title: 'Performance',
                                    description: 'Optimized front-end flows keep the site responsive and lightweight.',
                                },
                                {
                                    title: 'CMS-ready workflow',
                                    description: 'Create and manage blog posts with secure admin access and a simple publishing pipeline.',
                                },
                            ].map((item) => (
                                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 shadow-[0_20px_50px_-35px_rgba(255,255,255,0.12)]">
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

                        <div className="grid gap-6 lg:grid-cols-3">
                            {featuredPosts.length > 0 ? (
                                featuredPosts.map((post) => (
                                    <article key={post.slug} className="group rounded-4xl border border-white/10 bg-white/5 p-8 transition hover:border-amber-300/40 hover:bg-white/10">
                                        <div className="mb-4 text-xs uppercase tracking-[0.32em] text-amber-300">Article</div>
                                        <h3 className="text-2xl font-semibold text-white transition group-hover:text-amber-300">
                                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h3>
                                        <p className="mt-4 text-sm leading-7 text-white/70">{post.excerpt}</p>
                                        <div className="mt-6 flex items-center justify-between text-sm text-white/50">
                                            <span>{post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}</span>
                                            <Link href={`/blog/${post.slug}`} className="font-semibold text-amber-300">
                                                Read article
                                            </Link>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="rounded-4xl border border-white/10 bg-white/5 p-8 text-white/70">
                                    No published articles found yet. Create your first post in the admin panel.
                                </div>
                            )}
                        </div>
                    </section>

                    <section id="contact" className="mt-24 rounded-4xl border border-white/10 bg-white/5 p-8 text-white shadow-[0_40px_80px_-50px_rgba(255,193,7,0.35)] lg:p-12">
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
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block text-sm font-medium text-white/75">
                                        Name
                                        <input
                                            value={form.data.name}
                                            onChange={(event) => form.setData('name', event.target.value)}
                                            type="text"
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
                                    Send inquiry
                                </button>
                            </form>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
