"use client"
import { Button } from "@/components/ui/button"
import { Notification01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import BreadcrumbWrapper from "./BreadcrumbWrapper"
import ThemeToggle from "@/components/ToggleTheme"
import HeaderSearch from "./HeaderSearch"
import { NotificationDropdown } from "./HeaderNotifications"
import { SidebarTrigger } from "@/components/ui/sidebar"
const Header = () => {
    return (
        <header className='flex items-center justify-between px-4 py-3 sticky top-0 bg-background z-1 border-b border-b-solid w-full right-0'>
            <div className="flex gap-2">
                <Button variant="outline" className="sm:hidden" size="icon-sm">

                    <SidebarTrigger />
                </Button>
                <section className='flex flex-col'>
                    <h3 className="text-xl mb-2"> لوحة التحكم الادمن  </h3>
                    <BreadcrumbWrapper />
                </section>
            </div>
            <div className="flex gap-2 items-center">
                <HeaderSearch />
                <NotificationDropdown />
                <ThemeToggle />
            </div>
        </header>
    )
}
export default Header
Header.SearchInput = HeaderSearch;