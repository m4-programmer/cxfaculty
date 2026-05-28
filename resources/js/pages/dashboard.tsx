import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

type Stats = {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalViews: number;
    unreadInquiries: number;
    totalInquiries: number;
};

type RecentPost = {
    title: string;
    slug: string;
    is_published: boolean;
    published_at: string | null;
    updated_at: string;
};

type RecentInquiry = {
    id: number;
    name: string;
    email: string;
    subject: string;
    read_at: string | null;
    created_at: string;
};

type DashboardProps = {
    stats: Stats;
    recentPosts: RecentPost[];
    recentInquiries: RecentInquiry[];
    flash?: { success?: string };
};

export default function Dashboard() {
    const { stats, recentPosts, recentInquiries, flash } = usePage<DashboardProps>().props;
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {flash?.success && (
                    <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <div>
                    <p className="text-sm text-muted-foreground">Admin panel</p>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Manage blog content, review inquiries, and publish updates from one place.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                        { label: 'Published posts', value: stats.publishedPosts },
                        { label: 'Drafts', value: stats.draftPosts },
                        { label: 'Total views', value: stats.totalViews },
                        { label: 'Unread inquiries', value: stats.unreadInquiries },
                    ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-border bg-card p-5">
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                            <p className="mt-2 text-3xl font-bold">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <section className="rounded-2xl border border-border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Quick actions</h2>
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <Link href="/admin/posts/create" className="rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                                Create new post
                            </Link>
                            <Link href="/admin/posts" className="rounded-xl border border-border px-4 py-3 text-center text-sm font-semibold transition hover:bg-muted">
                                Manage posts
                            </Link>
                            <Link href="/admin/inquiries" className="rounded-xl border border-border px-4 py-3 text-center text-sm font-semibold transition hover:bg-muted">
                                View inquiries ({stats.unreadInquiries})
                            </Link>
                            <Link href="/blog" className="rounded-xl border border-border px-4 py-3 text-center text-sm font-semibold transition hover:bg-muted">
                                View public blog
                            </Link>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-border bg-card p-6">
                        <h2 className="text-lg font-semibold">Recent posts</h2>
                        <div className="mt-4 space-y-3">
                            {recentPosts.length > 0 ? (
                                recentPosts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/admin/posts/${post.slug}/edit`}
                                        className="block rounded-xl border border-border p-4 transition hover:bg-muted/50"
                                    >
                                        <p className="font-medium">{post.title}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {post.is_published ? 'Published' : 'Draft'} · Updated {new Date(post.updated_at).toLocaleDateString()}
                                        </p>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No posts yet.</p>
                            )}
                        </div>
                    </section>
                </div>

                <section className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Recent inquiries</h2>
                        <Link href="/admin/inquiries" className="text-sm text-primary hover:underline">View all</Link>
                    </div>
                    <div className="mt-4 space-y-3">
                        {recentInquiries.length > 0 ? (
                            recentInquiries.map((inquiry) => (
                                <Link
                                    key={inquiry.id}
                                    href={`/admin/inquiries/${inquiry.id}`}
                                    className="flex items-start justify-between gap-4 rounded-xl border border-border p-4 transition hover:bg-muted/50"
                                >
                                    <div>
                                        <p className="font-medium">{inquiry.subject}</p>
                                        <p className="mt-1 text-sm text-muted-foreground">{inquiry.name} · {inquiry.email}</p>
                                    </div>
                                    {!inquiry.read_at && (
                                        <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">New</span>
                                    )}
                                </Link>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No inquiries yet.</p>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
};
