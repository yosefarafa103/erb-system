"use client";

import * as React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

type Props = {
    open?: boolean;

    onOpenChange?: (
        open: boolean
    ) => void;

    trigger: React.ReactNode;

    content: React.ReactNode;

    className?: string;
};

export default function LoadingDropdown({
    open,
    onOpenChange,
    trigger,
    content,
    className,
}: Props) {
    return (
        <DropdownMenu
            open={open}
            onOpenChange={
                onOpenChange
            }
        >
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className={cn(
                    "w-56 p-2",
                    className
                )}
            >
                {content}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}