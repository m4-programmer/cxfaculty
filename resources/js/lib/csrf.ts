export function getCsrfToken(): string {
    const meta = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (meta) {
        return meta;
    }

    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    if (match) {
        return decodeURIComponent(match[1]);
    }

    return '';
}

export async function uploadBlogImage(file: File): Promise<string> {
    const payload = new FormData();
    payload.append('image', file);

    const response = await fetch('/admin/posts/upload-image', {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': getCsrfToken(),
            Accept: 'application/json',
        },
        body: payload,
        credentials: 'same-origin',
    });

    if (!response.ok) {
        throw new Error('Upload failed');
    }

    const result = await response.json();
    return result.url as string;
}
