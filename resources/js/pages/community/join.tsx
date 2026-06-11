import type { FormEvent } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

type JoinCommunityPageProps = {
    whatsappCommunityUrl: string;
    flash?: {
        success?: string;
        communityJoined?: boolean;
    };
};

export default function JoinCommunity() {
    const { whatsappCommunityUrl, flash } = usePage<JoinCommunityPageProps>().props;
    const joined = flash?.communityJoined ?? false;

    const form = useForm({
        name: '',
        email: '',
        phone: '',
        website: '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        form.post('/community/join', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
            },
        });
    }

    return (
        <>
            <Head title="Join the Community | CX Faculty">
                <meta
                    name="description"
                    content="Join the CX Faculty WhatsApp community for customer experience insights, discussions, and updates."
                />
                <link rel="canonical" href={`${window.location.origin}/community/join`} />
            </Head>

            <main className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
                <nav className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-amber-300">
                        ← Back to home
                    </Link>
                </nav>

                <section className="rounded-4xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_40px_80px_-50px_rgba(255,193,7,0.35)] sm:p-8 lg:p-12">
                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.32em] text-amber-300">Community</p>
                        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                            Join the CX Faculty community
                        </h1>
                        <p className="max-w-xl text-base leading-7 text-white/70">
                            Connect with other customer experience professionals, share ideas, and get early access to new
                            content and events.
                        </p>
                    </div>

                    {joined && flash?.success && (
                        <div className="mt-8 space-y-5 rounded-3xl border border-amber-300/25 bg-amber-300/10 p-6">
                            <p className="text-sm leading-7 text-amber-100">{flash.success}</p>
                            {whatsappCommunityUrl ? (
                                <a
                                    href={whatsappCommunityUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full bg-amber-300 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-400"
                                >
                                    Open WhatsApp community
                                </a>
                            ) : (
                                <p className="text-sm text-amber-100/80">
                                    The WhatsApp invite link will be shared with you shortly. Check your email for next steps.
                                </p>
                            )}
                        </div>
                    )}

                    {!joined && (
                        <form onSubmit={submit} className="mt-10 space-y-5">
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

                            <label className="block text-sm font-medium text-white/75">
                                Phone <span className="text-white/40">(optional)</span>
                                <input
                                    value={form.data.phone}
                                    onChange={(event) => form.setData('phone', event.target.value)}
                                    type="tel"
                                    className="mt-2 w-full rounded-3xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
                                    placeholder="+1 555 000 0000"
                                />
                                {form.errors.phone && <p className="mt-2 text-xs text-rose-400">{form.errors.phone}</p>}
                            </label>

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {form.processing ? 'Submitting…' : 'Join community'}
                            </button>
                        </form>
                    )}
                </section>
            </main>
        </>
    );
}
