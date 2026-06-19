import { Link } from '@inertiajs/react';
import type { LandingPageFooterLink } from '@/types/landing-page';

type CxFooterProps = {
    brandDescription: string;
    copyright: string;
    tagline: string;
    serviceLinks: LandingPageFooterLink[];
    companyLinks: LandingPageFooterLink[];
    connectLinks: LandingPageFooterLink[];
};

export default function CxFooter({
    brandDescription,
    copyright,
    tagline,
    serviceLinks,
    companyLinks,
    connectLinks,
}: CxFooterProps) {
    return (
        <footer className="cx-footer">
            <div className="cx-footer-grid">
                <div className="cx-footer-brand">
                    <img src="/logo.png" alt="The CX Faculty" />
                    <p>{brandDescription}</p>
                </div>
                <div className="cx-footer-col">
                    <h5>Services</h5>
                    <ul>
                        {serviceLinks.map((link) => (
                            <li key={link.label}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="cx-footer-col">
                    <h5>Company</h5>
                    <ul>
                        {companyLinks.map((link) => (
                            <li key={link.label}>
                                {link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                                    <Link href={link.href}>{link.label}</Link>
                                ) : (
                                    <a href={link.href}>{link.label}</a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="cx-footer-col">
                    <h5>Connect</h5>
                    <ul>
                        {connectLinks.map((link) => (
                            <li key={link.label}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="cx-footer-bottom">
                <p>{copyright}</p>
                <p>
                    {tagline.split('♦')[0]}
                    <span>♦</span>
                    {tagline.split('♦')[1] ?? ''}
                </p>
            </div>
        </footer>
    );
}
