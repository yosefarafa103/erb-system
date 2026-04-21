import AppSidebar from "../_components/AppSidebar"
import Header from "../_components/Header"
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
export default function RolesLayout({
    children
}: LayoutProps<"/dashboard">) {
    // const queryClient = new QueryClient()
    return <>
        <AppSidebar>
            <Header />
            <main className="mt-2 bg-sidebar-accent min-h-svh p-3">
                {children}
            </main>
        </AppSidebar>
    </>
}
