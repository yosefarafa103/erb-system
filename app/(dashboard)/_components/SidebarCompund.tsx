"use client"
import { usePathname, useRouter } from "next/navigation"
import { erpModules } from "../_constants/dashboard"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { logout } from "../_actions/logout"

export function SideBarMenuLinks() {
    const pathname = usePathname()
    return <SidebarMenu>
        {erpModules.map((module) => {
            const Icon = module.icon
            const isActive = !!pathname.startsWith(`/dashboard/${module.key}`)
            return <SidebarMenuItem key={module.title.ar}>
                <SidebarMenuButton isActive={isActive} >
                    <Icon className={cn("w-5 h-5")} />
                    <Link className="flex w-full" href={module.path}>
                        <span>{module.title.ar}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        }
        )}
    </SidebarMenu>
}
type LogoutProps = {
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
};

export function Logout({ user, }: LogoutProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleLogout = () => {
        startTransition(async () => {
            await logout();
            localStorage.clear()
            router.push("/signin");
        });
    };
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu dir="rtl">
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            asChild
                        >
                            <Button disabled={isPending} variant="destructive" className="justify-start">
                                <LogOut />
                                <h4>
                                    تسجيل الخروج
                                </h4>
                            </Button>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side="bottom"
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">
                                        {user.name?.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col ml-auto text-sm leading-tight">
                                    <span className="truncate text-right font-medium">
                                        {user.name}
                                    </span>
                                    <span className="truncate text-left text-xs">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onSelect={(e) => {
                                e.preventDefault();
                            }}
                            disabled={isPending}
                            variant="destructive"
                            onClick={handleLogout}
                        >
                            {isPending ? "جاري تسجيل الخروج..." : "تسجيل خروج"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}