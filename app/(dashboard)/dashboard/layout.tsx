import Header from "../_components/Header"
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import AppSidebar from "../_components/AppSidebar"
import { Suspense } from "react"

export default function RolesLayout({
    children
}: LayoutProps<"/dashboard">) {
    // const queryClient = new QueryClient()
    return <>
        <Suspense fallback={<>loading..</>}>
            <AppSidebar>
                <Header />
                <main className="mt-2 bg-sidebar-accent min-h-svh p-3">
                    {children}
                </main>
            </AppSidebar>
        </Suspense>
    </>
}
