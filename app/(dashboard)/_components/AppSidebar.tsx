import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { CustomerSupportIcon, Settings, TeamviewerFreeIcons } from "@hugeicons/core-free-icons"
import { SwitchAccounts } from "./SwitchAccount"
import { Logout, SideBarMenuLinks } from "./SidebarCompund"
import { getCurrentUser } from "@/app/(auth)/_services/auth.service"

const AppSidebar = async ({ children }: { children: React.ReactNode }) => {
    const user = await getCurrentUser();
    return (
        <SidebarProvider>
            <Sidebar side="right" >
                <SidebarHeader className="hover:text-white transition hover:bg-purple-500 text-purple-500 dark:text-forground dark:bg-purple-900/20 bg-purple-50 m-1 rounded-lg dark:border-sidebar-accent border">
                    <AppSidebar.SwitchAccount userName={user.name} tenants={user.tenants} />
                </SidebarHeader>
                <SidebarContent className="relative z-1000">
                    <SidebarGroup>
                        <SidebarGroupLabel> لوحه تحكم الادمن </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SideBarMenuLinks />
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarGroup>
                        <SidebarGroupLabel> اخر </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuButton asChild>
                                    <Link href='/dashboard/settings'>
                                        <HugeiconsIcon icon={Settings} size={18} />الاعدادت
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild>
                                    <Link href='/dashboard/support'>
                                        <HugeiconsIcon icon={CustomerSupportIcon} size={18} />فريق الدعم
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <AppSidebar.Logout user={user} />
                </SidebarFooter>
            </Sidebar>
            <div className="w-full">
                {children}
            </div>
        </SidebarProvider>
    )
}

export default AppSidebar;

AppSidebar.SwitchAccount = SwitchAccounts;
AppSidebar.Logout = Logout;


