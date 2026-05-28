import type { FormEvent } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { confirmDeleteInquiry } from '@/lib/confirm-dialog';
import { dashboard } from '@/routes';

type Inquiry = {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    read_at: string | null;
    created_at: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Paginated<T> = {
    data: T[];
    links: PaginationLink[];
};

type AdminInquiriesIndexProps = {
    inquiries: Paginated<Inquiry>;
    filters: { search?: string; status?: string };
    unreadCount: number;
};

export default function AdminInquiriesIndex() {
    const { inquiries, filters, unreadCount } = usePage<AdminInquiriesIndexProps>().props;
    const form = useForm({
        search: filters.search ?? '',
        status: filters.status ?? '',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        router.get('/admin/inquiries', form.data, { preserveState: true, replace: true });
    }

    async function destroy(inquiry: Inquiry) {
        const confirmed = await confirmDeleteInquiry(inquiry.subject);
        if (!confirmed) return;
        router.delete(`/admin/inquiries/${inquiry.id}`, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Inquiries | Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Admin CMS</p>
                        <h1 className="text-3xl font-bold tracking-tight">Contact inquiries</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={dashboard()}>Back to dashboard</Link>
                    </Button>
                </div>

                <form onSubmit={submit} className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
                    <input
                        type="search"
                        value={form.data.search}
                        onChange={(e) => form.setData('search', e.target.value)}
                        placeholder="Search by name, email, or subject…"
                        className="rounded-xl border border-input bg-background px-4 py-2 text-sm"
                    />
                    <select
                        value={form.data.status}
                        onChange={(e) => form.setData('status', e.target.value)}
                        className="rounded-xl border border-input bg-background px-4 py-2 text-sm"
                    >
                        <option value="">All</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                    </select>
                    <Button type="submit">Filter</Button>
                </form>

                <div className="space-y-3">
                    {inquiries.data.length > 0 ? (
                        inquiries.data.map((inquiry) => (
                            <article key={inquiry.id} className="rounded-2xl border border-border bg-card p-5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {!inquiry.read_at && <Badge>New</Badge>}
                                            <h2 className="text-lg font-semibold">{inquiry.subject}</h2>
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {inquiry.name} · {inquiry.email}
                                        </p>
                                        <p className="mt-3 line-clamp-2 text-sm">{inquiry.message}</p>
                                        <p className="mt-3 text-xs text-muted-foreground">
                                            {new Date(inquiry.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex shrink-0 gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/inquiries/${inquiry.id}`}>View</Link>
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => destroy(inquiry)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
                            No inquiries found.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

AdminInquiriesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Inquiries', href: '/admin/inquiries' },
    ],
};
