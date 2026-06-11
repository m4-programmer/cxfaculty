export type LandingPageCard = {
    label: string;
    description: string;
};

export type LandingPageServiceItem = {
    title: string;
    description: string;
};

export type LandingPageContent = {
    seo: {
        title: string;
        description: string;
    };
    hero: {
        badge: string;
        headline: string;
        description: string;
        cards: LandingPageCard[];
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
        items: LandingPageServiceItem[];
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
