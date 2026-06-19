import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import CxFooter from '@/components/cx-landing/cx-footer';
import CxNav from '@/components/cx-landing/cx-nav';
import { useCxLandingEffects } from '@/hooks/use-cx-landing-effects';
import type { LandingPageContent } from '@/types/landing-page';
import '../../css/cx-landing.css';

type CxShellProps = {
    nav: LandingPageContent['nav'];
    footer: LandingPageContent['footer'];
};

type CxSiteLayoutProps = {
    children: ReactNode;
};

export default function CxSiteLayout({ children }: CxSiteLayoutProps) {
    const { cxShell } = usePage<{ cxShell: CxShellProps }>().props;

    useCxLandingEffects();

    useEffect(() => {
        document.body.classList.add('cx-body');
        document.documentElement.classList.add('cx-html');

        return () => {
            document.body.classList.remove('cx-body');
            document.documentElement.classList.remove('cx-html');
        };
    }, []);

    return (
        <div className="cx-landing">
            <div className="cx-cursor" id="cx-cursor" />
            <div className="cx-cursor-ring" id="cx-cursor-ring" />
            <CxNav ctaLabel={cxShell.nav.cta_label} />
            <main className="cx-main">{children}</main>
            <CxFooter
                brandDescription={cxShell.footer.brand_description}
                copyright={cxShell.footer.copyright}
                tagline={cxShell.footer.tagline}
                serviceLinks={cxShell.footer.service_links}
                companyLinks={cxShell.footer.company_links}
                connectLinks={cxShell.footer.connect_links}
            />
        </div>
    );
}
