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
                <link rel="canonical" href={`${typeof window !== 'undefined' ? window.location.origin : ''}/community/join`} />
            </Head>

            <div className="cx-page">
                <Link href="/" className="cx-back-link cx-reveal">
                    ← Back to home
                </Link>

                <section className="cx-community-inner cx-reveal" style={{ maxWidth: '720px' }}>
                    <div>
                        <div className="cx-section-label">
                            <span>Join the Community</span>
                        </div>
                        <h2 className="cx-headline">Connect with CX leaders</h2>
                        <p>
                            Connect with other customer experience professionals, share ideas, and get early access to new
                            content and events.
                        </p>
                    </div>

                    {joined && flash?.success && (
                        <div className="cx-flash">
                            <p>{flash.success}</p>
                            {whatsappCommunityUrl ? (
                                <a
                                    href={whatsappCommunityUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cx-btn-primary"
                                    style={{ marginTop: '1.25rem' }}
                                >
                                    Open WhatsApp community
                                </a>
                            ) : (
                                <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                                    The WhatsApp invite link will be shared with you shortly.
                                </p>
                            )}
                        </div>
                    )}

                    {!joined && (
                        <form onSubmit={submit} className="cx-form" style={{ marginTop: '2rem' }}>
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

                            <label>
                                Phone <span style={{ color: 'rgba(255,255,255,0.4)' }}>(optional)</span>
                                <input
                                    value={form.data.phone}
                                    onChange={(event) => form.setData('phone', event.target.value)}
                                    type="tel"
                                    placeholder="+1 555 000 0000"
                                />
                                {form.errors.phone && <p className="cx-form-error">{form.errors.phone}</p>}
                            </label>

                            <button type="submit" disabled={form.processing} className="cx-btn-primary">
                                {form.processing ? 'Submitting…' : 'Join community'}
                            </button>
                        </form>
                    )}
                </section>
            </div>
        </>
    );
}
