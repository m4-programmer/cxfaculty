import { router } from '@inertiajs/react';
import { toast } from 'sonner';

function isPreviewMode(): boolean {
    return typeof document !== 'undefined' && document.getElementById('preview-banner') !== null;
}

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        if (!isPreviewMode()) {
            return;
        }

        router.on('before', (event) => {
            const visit = event.detail.visit;

            if (visit.method === 'get') {
                event.preventDefault();
                window.location.assign(visit.url.pathname + visit.url.search + visit.url.hash);

                return;
            }

            event.preventDefault();
            toast.info('Demo preview only — this action is disabled on the static build.');
        });

        window.addEventListener(
            'submit',
            (event) => {
                const form = event.target;

                if (!(form instanceof HTMLFormElement)) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                toast.info('Demo preview only — forms are disabled on the static build.');
            },
            true,
        );
    });
}

export {};
