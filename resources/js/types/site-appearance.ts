export type SiteLogoSettings = {
    url: string;
    height: number;
};

export type SiteBlogPalette = {
    accent: string;
    accent_dark: string;
    background: string;
    surface: string;
    text: string;
    text_muted: string;
};

export type SiteAppearance = {
    logo: SiteLogoSettings;
    blog: SiteBlogPalette;
};
