import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Home, Inbox, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

type AdminNotifications = {
    unreadInquiries: number;
};

export function AppSidebar() {
    const { adminNotifications } = usePage<{ adminNotifications?: AdminNotifications | null }>().props;
    const unreadInquiries = adminNotifications?.unreadInquiries ?? 0;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Blog posts',
            href: '/admin/posts',
            icon: BookOpen,
        },
        {
            title: 'Landing page',
            href: '/admin/landing',
            icon: Home,
        },
        {
            title: 'Inquiries',
            href: '/admin/inquiries',
            icon: Inbox,
            badge: unreadInquiries,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'View site',
            href: '/',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
