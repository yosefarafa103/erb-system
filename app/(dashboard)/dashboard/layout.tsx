import AppSidebar from "../_components/AppSidebar"
import Header from "../_components/Header"
export default function RolesLayout({
    children
}: LayoutProps<"/dashboard">) {
    return <>
        <AppSidebar>
            <Header />
            <main className="mt-2 bg-sidebar-accent min-h-svh p-3">
                {children}
            </main>
        </AppSidebar>
    </>
}
