"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { erpModules } from "../constants/dashboard"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
const AppSidebar = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <Sidebar side="right">
                <SidebarHeader>الحساب الشخصي</SidebarHeader>
                <SidebarContent className="relative z-1000">
                    <SidebarGroup>
                        <SidebarGroupLabel> لوحه تحكم الادمن </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <AppSidebar.SideBarMenuLinks />
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarGroup>
                        <SidebarGroupLabel> اخر </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem >
                                    الاعدادت
                                </SidebarMenuItem>
                                <SidebarMenuItem >
                                    الدعم
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <Logout />
                </SidebarFooter>
            </Sidebar>
            <div className="w-full">
                {children}
            </div>
        </SidebarProvider>
    )
}

export default AppSidebar;

function SideBarMenuLinks() {
    const pathname = usePathname()
    return <SidebarMenu>
        {erpModules.map((module) => {
            const Icon = module.icon
            const isActive = !!pathname.startsWith(`/dashboard/${module.key}`)
            return <SidebarMenuItem key={module.title.ar}>
                <SidebarMenuButton isActive={isActive} >
                    <Icon className={cn("w-5 h-5",
                        isActive ? "text-foreground!" : "text-purple-600"
                    )} />
                    <Link className="flex w-full" href={module.path}>
                        <span>{module.title.ar}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        }
        )}
    </SidebarMenu>
}
function Logout() {
    return <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={'user.avatar'} alt={'user.name'} />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{'user.name'}</span>
                            <span className="truncate text-xs">{"user.email"}</span>
                        </div>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    side={"bottom"}
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={'user.avatar'} alt={'user.name'} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{'user.name'}</span>
                                <span className="truncate text-xs">{'user.email'}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
}


AppSidebar.SideBarMenuLinks = SideBarMenuLinks