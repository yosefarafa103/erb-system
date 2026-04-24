"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";

import { motion } from "framer-motion";

function SkeletonBox({ className = "" }: { className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className={`bg-gray-200 dark:bg-gray-800 rounded-md ${className}`}
        />
    );
}

export default function SidebarSkeleton() {
    return (
        <SidebarProvider>
            <Sidebar side="right">
                <SidebarHeader className="m-1 rounded-lg border bg-muted/40 p-3">
                    <div className="flex items-center gap-2">
                        <SkeletonBox className="h-8 w-8 rounded-lg" />
                        <div className="flex flex-col gap-2 w-full">
                            <SkeletonBox className="h-3 w-24" />
                            <SkeletonBox className="h-2 w-32" />
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            <SkeletonBox className="h-3 w-28" />
                        </SidebarGroupLabel>

                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <SidebarMenuItem key={i}>
                                        <SidebarMenuButton>
                                            <SkeletonBox className="h-4 w-full" />
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            <SkeletonBox className="h-3 w-20" />
                        </SidebarGroupLabel>

                        <SidebarGroupContent className="space-y-2">
                            <SkeletonBox className="h-8 w-full" />
                            <SkeletonBox className="h-8 w-full" />
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <div className="mt-3">
                        <SkeletonBox className="h-10 w-full" />
                    </div>
                </SidebarFooter>
            </Sidebar>

            <div className="w-full p-4">
                <SkeletonBox className="h-10 w-1/3 mb-4" />
                <SkeletonBox className="h-[calc(100svh-90px)] w-full rounded-xl" />
            </div>
        </SidebarProvider>
    );
}