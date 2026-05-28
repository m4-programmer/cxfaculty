import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { confirmDeleteInquiry } from '@/lib/confirm-dialog';
import { dashboard } from '@/routes';

type Inquiry = {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    ip_address: string | null;
    read_at: string | null;
    created_at: string;
};

type AdminInquiryShowProps = {
    inquiry: Inquiry;
};

export default function AdminInquiryShow() {
    const { inquiry } = usePage<AdminInquiryShowProps>().props;

    async function destroy() {
        const confirmed = await confirmDeleteInquiry(inquiry.subject);
        if (!confirmed) return;
        router.delete(`/admin/inquiries/${inquiry.id}`);
    }

    return (
        <>
            <Head title={`${inquiry.subject} | Inquiry`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Inquiry details</p>
                        <h1 className="text-3xl font-bold tracking-tight">{inquiry.subject}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/admin/inquiries">Back to list</Link>
                        </Button>
                        <Button variant="destructive" onClick={destroy}>Delete</Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <p className="whitespace-pre-wrap text-sm leading-7">{inquiry.message}</p>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-border bg-muted/30 p-6 text-sm">
                        <div>
                            <p className="text-muted-foreground">From</p>
                            <p className="mt-1 font-medium">{inquiry.name}</p>
                            <a href={`mailto:${inquiry.email}`} className="mt-1 block text-primary hover:underline">
                                {inquiry.email}
                            </a>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Received</p>
                            <p className="mt-1">{new Date(inquiry.created_at).toLocaleString()}</p>
                        </div>
                        {inquiry.ip_address && (
                            <div>
                                <p className="text-muted-foreground">IP address</p>
                                <p className="mt-1 font-mono text-xs">{inquiry.ip_address}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-muted-foreground">Status</p>
                            <p className="mt-1">{inquiry.read_at ? 'Read' : 'Unread'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminInquiryShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Inquiries', href: '/admin/inquiries' },
        { title: 'View', href: '#' },
    ],
};
