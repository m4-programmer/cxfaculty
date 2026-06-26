import { Link, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

type AdminNotifications = {
    unreadInquiries: number;
};

export function AdminNotificationsBell() {
    const { adminNotifications } = usePage<{ adminNotifications?: AdminNotifications | null }>().props;
    const unread = adminNotifications?.unreadInquiries ?? 0;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9" asChild>
                    <Link href="/admin/inquiries" prefetch aria-label={`Inquiries${unread > 0 ? `, ${unread} unread` : ''}`}>
                        <Bell className="h-5 w-5" />
                        {unread > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
                                {unread > 99 ? '99+' : unread}
                            </span>
                        )}
                    </Link>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{unread > 0 ? `${unread} unread ${unread === 1 ? 'inquiry' : 'inquiries'}` : 'No new inquiries'}</p>
            </TooltipContent>
        </Tooltip>
    );
}
