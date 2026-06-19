export function buildWhatsAppUrl(baseUrl: string, message?: string): string {
    if (!baseUrl) {
        return '#contact';
    }

    if (!message) {
        return baseUrl;
    }

    try {
        const url = new URL(baseUrl);
        url.searchParams.set('text', message);

        return url.toString();
    } catch {
        return baseUrl;
    }
}
