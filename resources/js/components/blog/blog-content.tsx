import { sanitizeHtml } from '@/lib/sanitize';

type Props = {
    html: string;
    className?: string;
};

export default function BlogContent({ html, className = '' }: Props) {
    return (
        <div
            className={`blog-content ${className}`}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
        />
    );
}
