"use client"
import { Button } from "@/components/ui/button"
import { Notification01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import BreadcrumbWrapper from "./BreadcrumbWrapper"
import ThemeToggle from "@/components/ToggleTheme"
import HeaderSearch from "./HeaderSearch"
import { NotificationDropdown } from "./HeaderNotifications"
const Header = () => {
    return (
        <header className='flex items-center justify-between px-4 py-3 sticky top-0 bg-background z-10 border-b border-b-solid w-full right-0'>
            <section className='flex flex-col'>
                <h3 className="text-xl mb-2"> لوحة التحكم الادمن  </h3>
                <BreadcrumbWrapper />
            </section>
            <div className="flex gap-2 items-center">
                <HeaderSearch />
                <NotificationDropdown />
                <ThemeToggle />
            </div>
        </header>
    )
}

export default Header


Header.SearchInput = HeaderSearch
