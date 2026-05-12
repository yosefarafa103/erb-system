"use client"
import { ChildrenType } from "@/types"
import { useTenantSync } from "../../_hooks/useTenentSync"
const layout = ({ children }: ChildrenType) => {
    useTenantSync()
    return (
        <>
            {children}
        </>
    )
}

export default layout
