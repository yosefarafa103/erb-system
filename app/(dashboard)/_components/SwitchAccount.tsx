"use client"
import { showToast } from "@/helpers/toast"
import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Loader from "@/components/Loader"
import { useRouter, useSearchParams } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowDown } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { GetMeReponseType, User } from "../_types/users"
import { switchTenant } from "@/app/(auth)/_services/users.service"
import type { Tenent } from "../_types/users"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { useLockBodyScroll } from "@/hooks/useBodyScroll"
import { useTenantSync } from "../_hooks/useTenentSync"
type Props = Pick<GetMeReponseType, "tenants"> & { userName: string }
export function SwitchAccounts({ tenants, userName }: Props) {
    const [currentTenantId, setCurrentTenantId] = useState<string | null>(
        typeof window !== "undefined" ? localStorage.getItem("currentTenent") : null
    );
    const rolesMap = {
        owner: "المالك",
        admin: "مدير النظام",
        manager: "مدير",
        user: "مستخدم",
        viewer: "مشاهد",
    }
    const [isSwitching, setIsSwitching] = useState(false);
    const router = useRouter();
    const handleSwitchAccount = useCallback(async (tenant: string,) => {
        const prevTenant = currentTenantId;
        setCurrentTenantId(tenant);
        localStorage.setItem("currentTenent", tenant);
        setIsSwitching(true);
        showToast("success", "جاري تبديل حساب الشركة...", "", "rtl");
        try {
            await switchTenant(tenant);
            setTimeout(() => {
                setIsSwitching(false);
                router.push(`/dashboard/users?tenant=${tenant}`);
            }, 1000);
        } catch (error: any) {
            setCurrentTenantId(prevTenant);
            localStorage.setItem("currentTenent", prevTenant || "");
            setIsSwitching(false);
            showToast("error", error.message, "", "rtl");
        }
    }, [router, currentTenantId]);
    useLockBodyScroll(isSwitching)
    const currentTenent: Tenent = useMemo(
        () => tenants.find(el => el.tenantId._id === currentTenantId)!,
        [tenants, currentTenantId]
    );
    const { } = useTenantSync(currentTenantId!)
    return (
        <>
            <AnimatePresence>
                {isSwitching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-9999 flex items-center justify-center bg-background/80 text-foreground text-xl"
                    >
                        جاري تبديل الحساب <Loader />
                    </motion.div>
                )}
            </AnimatePresence>
            <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                    <div className="group flex items-center gap-2 px-2 py-1.5 cursor-pointer text-foreground">
                        <>
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src="/avatar.png" />
                                <AvatarFallback className="bg-purple-100 dark:bg-purple-900">
                                    AA
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex justify-between items-center w-full">
                                <div className="text-right">
                                    <p className="text-sm font-semibold"> {userName} </p>
                                    <span className="text-xs group-hover:text-white!">
                                        {rolesMap[currentTenent?.role as keyof typeof rolesMap]} - {currentTenent?.tenantId.name}
                                    </span>
                                </div>
                                <HugeiconsIcon className="text-foreground" icon={ArrowDown} />
                            </div>
                        </>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-56 rounded-lg">
                    <DropdownMenuLabel>تبديل حساب الشركة</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {tenants?.map((company) => {
                        const isCurrentTenent = company.tenantId._id === currentTenent.tenantId._id
                        return <DropdownMenuItem
                            disabled={isCurrentTenent}
                            className={cn(isCurrentTenent ? "bg-purple-400/50" : "", "mb-1")}
                            key={company.tenantId._id}
                            onClick={() => handleSwitchAccount(company.tenantId._id)}
                        >
                            {isCurrentTenent ? <Check /> : null}
                            {company.tenantId.name}
                        </DropdownMenuItem>
                    }
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}



SwitchAccounts.SkellitonItem = () => (
    <div className="py-4 mb-1 rounded-md animate-pulse bg-sidebar-accent" />
)