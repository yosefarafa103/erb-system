"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification01Icon } from "@hugeicons/core-free-icons";

export function NotificationDropdown() {
    return (
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
                <Button size="icon-sm" variant="outline" className="relative">
                    <span className="bg-purple-400 absolute size-2 rounded-full -top-1 -right-1" />
                    <HugeiconsIcon icon={Notification01Icon} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="text-lg p-2 font-semibold">
                    الإشعارات
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <span className="text-sm font-medium">تم إضافة مستخدم جديد</span>
                    <span className="text-xs text-muted-foreground">
                        منذ 5 دقائق
                    </span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <Button className="w-full text-purple-400 font-medium" variant="lightPurple">
                    عرض كل الإشعارات
                </Button>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}