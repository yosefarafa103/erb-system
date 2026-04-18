import BlockWrapper from "@/components/BlockWrapper";
import { RoleBlock } from "../../_components/RoleBlock";
import { users } from "../../constants/dashboard";
import { AddUserDialog } from "../../_components/AddMemberDialog";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { User03Icon } from "@hugeicons/core-free-icons";
import TableHeader from "../../_components/TableHeader";
import TableFilterHeader from "../../_components/TableFilterHeader";
const UsersTable = dynamic(() => import("../../_components/tables/AdminsTable",))
export default function page() {
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
                        <RoleBlock
                            role="admin"
                            title="سوبر ادمن"
                            users={users.filter(u => u.description === "مدير عام")}
                        />
                        <RoleBlock
                            role="manager"
                            title="المديرين"
                            users={users.filter(u => u.description === "مدير")}
                        />
                        <RoleBlock
                            role="accounting"
                            title="المحاسبين"
                            users={users.filter(u => u.description === "محاسب")}
                        />
                    </div>
                </div>
            </BlockWrapper>
            <BlockWrapper className="mt-4">
                <Suspense fallback={<>Loading...</>}>
                    <TableHeader />
                    <TableFilterHeader />
                    <UsersTable />
                </Suspense>
            </BlockWrapper>
        </>
    )
}