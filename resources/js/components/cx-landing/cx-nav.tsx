import { Link } from '@inertiajs/react';

type CxNavProps = {
    ctaLabel: string;
};

const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/#process', label: 'Our Approach' },
    { href: '/#why', label: 'Why Us' },
    { href: '/#industries', label: 'Industries' },
    { href: '/blog', label: 'Blog' },
];

export default function CxNav({ ctaLabel }: CxNavProps) {
    return (
        <nav className="cx-nav" id="cx-nav">
            <Link href="/" className="cx-nav-logo">
                <img src="/logo.png" alt="The CX Faculty" />
            </Link>
            <ul className="cx-nav-links">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        {link.href.startsWith('/#') ? (
                            <a href={link.href}>{link.label}</a>
                        ) : (
                            <Link href={link.href}>{link.label}</Link>
                        )}
                    </li>
                ))}
            </ul>
            <a href="/#contact" className="cx-nav-cta">
                {ctaLabel}
            </a>
        </nav>
    );
}
