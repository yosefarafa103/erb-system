import BlockWrapper from "@/components/BlockWrapper";
import { AddUserDialog } from "../../_components/AddMemberDialog";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { User03Icon } from "@hugeicons/core-free-icons";
import TableHeader from "../../_components/TableHeader";
import TableFilterHeader from "../../_components/TableFilterHeader";
import AuthorizationBlocks from "../../_components/AuthorizationBlocks";
import { getUsersByTenant } from "@/app/(auth)/_services/users.service";
import { getCurrentUser } from "@/app/(auth)/_services/auth.service";
import { redirect } from "next/navigation";
const UsersTable = dynamic(() => import("../../_components/tables/AdminsTable",))
export default async function page({ searchParams }: PageProps<"/dashboard/users">) {
    const { tenant }: { tenant: string } = await searchParams as { tenant: string }
    const user = await getCurrentUser()
    if (!tenant)
        redirect(`/dashboard/users?tenant=${user.lastActiveTenant}`)
    const users = await getUsersByTenant(tenant)
    return (
        <>
            <BlockWrapper>
                <div className="p-2 space-y-6">
                    <div className="flex items-center justify-between gap-2">
                        <div>
                            <h1 className="md:text-2xl text-lg font-bold text-foreground flex gap-2">
                                <HugeiconsIcon icon={User03Icon} />
                                لوحة التحكم الادمن
                            </h1>
                            <p className="text-slate-400 max-md:text-xs">
                                يتم تحديد صلاحيات الوصول بناءً على الدور الوظيفي: مدير عام، مدير، محاسب
                            </p>
                        </div>
                        <AddUserDialog />
                    </div>
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                        <AuthorizationBlocks />
                    </div>
                </div>
            </BlockWrapper>
            <BlockWrapper className="mt-4">
                <Suspense fallback={<>Loading...</>}>
                    <TableHeader />
                    <TableFilterHeader />
                    <UsersTable users={users} />
                </Suspense>
            </BlockWrapper>
        </>
    )
}