export type LandingPageStat = {
    value: string;
    label: string;
};

export type LandingPagePillar = {
    number: string;
    title: string;
    description: string;
};

export type LandingPageServiceItem = {
    number: string;
    title: string;
    description: string;
    features: string[];
    cta_label: string;
};

export type LandingPageProcessStep = {
    number: string;
    title: string;
    description: string;
};

export type LandingPageWhyCard = {
    title: string;
    description: string;
};

export type LandingPageFooterLink = {
    label: string;
    href: string;
};

export type LandingPageContent = {
    seo: {
        title: string;
        description: string;
    };
    nav: {
        cta_label: string;
    };
    hero: {
        eyebrow: string;
        headline_lines: string[];
        headline_emphasis: string;
        description: string;
        stats: LandingPageStat[];
        cta_primary: string;
        cta_secondary: string;
    };
    ticker: {
        enabled: boolean;
        items: string[];
    };
    philosophy: {
        enabled: boolean;
        eyebrow: string;
        headline_lines: string[];
        headline_emphasis: string;
        paragraphs: string[];
        pillars: LandingPagePillar[];
    };
    services: {
        enabled: boolean;
        eyebrow: string;
        headline_lines: string[];
        headline_emphasis: string;
        description: string;
        items: LandingPageServiceItem[];
    };
    process: {
        enabled: boolean;
        eyebrow: string;
        headline: string;
        headline_emphasis: string;
        description: string;
        steps: LandingPageProcessStep[];
    };
    manifesto: {
        enabled: boolean;
        quote: string;
        quote_emphasis: string;
        attribution: string;
    };
    why: {
        enabled: boolean;
        eyebrow: string;
        headline_lines: string[];
        headline_emphasis: string;
        description: string;
        cta_label: string;
        cards: LandingPageWhyCard[];
    };
    industries: {
        enabled: boolean;
        eyebrow: string;
        headline_lines: string[];
        headline_emphasis: string;
        items: string[];
    };
    cta_strip: {
        enabled: boolean;
        headline: string;
        description: string;
        button_label: string;
    };
    blog: {
        enabled: boolean;
        eyebrow: string;
        headline: string;
        headline_emphasis: string;
        cta: string;
        empty_message: string;
    };
    community: {
        enabled: boolean;
        eyebrow: string;
        headline: string;
        description: string;
        cta_label: string;
    };
    contact: {
        enabled: boolean;
        eyebrow: string;
        headline: string;
        description: string;
        submit_label: string;
    };
    footer: {
        brand_description: string;
        copyright: string;
        tagline: string;
        service_links: LandingPageFooterLink[];
        company_links: LandingPageFooterLink[];
        connect_links: LandingPageFooterLink[];
    };
};

export type LandingPageV2Card = {
    label: string;
    description: string;
};

export type LandingPageV2ServiceItem = {
    title: string;
    description: string;
};

export type LandingPageV2Content = {
    seo: {
        title: string;
        description: string;
    };
    hero: {
        badge: string;
        headline: string;
        description: string;
        cards: LandingPageV2Card[];
        cta_consultation: string;
        cta_community: string;
        cta_blog: string;
    };
    sidebar: {
        enabled: boolean;
        eyebrow: string;
        headline: string;
        description: string;
    };
    services: {
        enabled: boolean;
        eyebrow: string;
        headline: string;
        items: LandingPageV2ServiceItem[];
    };
    blog: {
        enabled: boolean;
        eyebrow: string;
        headline: string;
        cta: string;
        empty_message: string;
    };
    contact: {
        enabled: boolean;
        eyebrow: string;
        headline: string;
        description: string;
        submit_label: string;
    };
};
