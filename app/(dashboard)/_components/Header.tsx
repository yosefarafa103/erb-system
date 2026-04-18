"use client"
import { Button } from "@/components/ui/button"
import { Notification01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import BreadcrumbWrapper from "./BreadcrumbWrapper"
const Header = () => {
    return (
        <header className='flex items-center justify-between w-full px-4 py-3 sticky top-0 bg-white z-10000 border-b border-b-solid'>
            <section className='flex flex-col'>
                <h3 className="text-xl mb-2"> لوحة التحكم الادمن  </h3>
                <BreadcrumbWrapper />
            </section>
            <div className="flex gap-2 items-center">
                <Button variant="outline">
                    <HugeiconsIcon icon={Search01Icon} />
                </Button>
                <Button variant="outline">
                    <HugeiconsIcon icon={Notification01Icon} />
                </Button>
            </div>
        </header>
    )
}

export default Header
