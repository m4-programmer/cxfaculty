import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

type SiteLayoutProps = {
    children: React.ReactNode;
};

type SharedProps = {
    auth: { user: { name: string; is_admin?: boolean } | null };
};

export default function SiteLayout({ children }: SiteLayoutProps) {
    const { auth } = usePage<SharedProps>().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/#services', label: 'Services' },
        { href: '/blog', label: 'Blog' },
        { href: '/community/join', label: 'Community' },
        { href: '/#contact', label: 'Contact' },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="text-sm font-semibold uppercase tracking-[0.33em] text-amber-300">
                        <img src="/logo.png" alt="CX Faculty Logo" className="inline-block h-6 w-auto mr-2"
                            style={{ height: '10.5rem', width: 'auto' }} />
                    </Link>

                    <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.22em] text-white/75 md:flex">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="transition hover:text-amber-300">
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-3 md:flex">
                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-amber-400"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <></>
                            // <Link
                            //     href="/login"
                            //     className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-amber-300 hover:text-amber-300"
                            // >
                            //     Log in
                            // </Link>
                        )}
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 p-2 text-white md:hidden"
                        onClick={() => setMobileOpen((open) => !open)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {mobileOpen && (
                    <div className="border-t border-white/10 px-4 py-4 md:hidden">
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="rounded-xl px-3 py-2 text-sm uppercase tracking-[0.22em] text-white/80 transition hover:bg-white/5 hover:text-amber-300"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {auth.user ? (
                                <Link
                                    href="/dashboard"
                                    className="rounded-xl bg-amber-300 px-3 py-2 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <> </>
                                // <Link
                                //     href="/login"
                                //     className="rounded-xl border border-white/15 px-3 py-2 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white"
                                //     onClick={() => setMobileOpen(false)}
                                // >
                                //     Log in
                                // </Link>
                            )}
                        </nav>
                    </div>
                )}
            </header>

            <div className="landing-glow">{children}</div>

            <footer className="border-t border-white/10 bg-black">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.33em] text-amber-300">CX Faculty</p>
                        <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
                            Customer experience consulting, content strategy, and a modern CMS for your team.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-white/60">
                        <Link href="/blog" className="transition hover:text-amber-300">Blog</Link>
                        <Link href="/community/join" className="transition hover:text-amber-300">Community</Link>
                        <Link href="/#contact" className="transition hover:text-amber-300">Contact</Link>
                        <Link href="/sitemap.xml" className="transition hover:text-amber-300">Sitemap</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
