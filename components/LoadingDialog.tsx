"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
type Props = {
    open: boolean;
    trigger: React.ReactNode
    content: React.ReactNode
    className?: string
};

export default function LoadingDialog({
    open,
    className, content, trigger
}: Props) {
    return (
        <Dialog open={open}>
            <DialogTrigger>
                {trigger}
            </DialogTrigger>
            <DialogContent className={cn("sm:max-w-sm", className)}>
                {content}
            </DialogContent>
        </Dialog>
    );
}