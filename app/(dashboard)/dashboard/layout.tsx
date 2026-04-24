import Header from "../_components/Header"
import AppSidebar from "../_components/AppSidebar"
import { Suspense } from "react"
import SidebarSkeleton from "@/components/SidebarSkilleton"

export default function RolesLayout({
    children
}: LayoutProps<"/dashboard">) {
    return <>
        <Suspense fallback={<SidebarSkeleton />}>
            <AppSidebar>
                <Header />
                <main className="mt-2 bg-sidebar-accent min-h-svh p-3">
                    {children}
                </main>
            </AppSidebar>
        </Suspense>
    </>
}
