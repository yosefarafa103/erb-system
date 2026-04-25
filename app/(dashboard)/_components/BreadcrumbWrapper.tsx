"use client"
import { GeneralUtils } from "../_helpers/jsx"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useTranslation } from "react-i18next"

const utils = new GeneralUtils()

const BreadcrumbWrapper = () => {
    const pn = usePathname();
    let result = utils.getPathNameForBreadCrumb(pn);
    const { t } = useTranslation();
    return (
        <Breadcrumb className="mt-3">
            <BreadcrumbList>
                {result.map((item, i) => (
                    <>
                        <BreadcrumbItem className={cn(
                            result[result.length - 1] === item ? "text-purple-600 font-bold" : "font-bold"
                        )}>
                            {t("breadcrumb.dashboard." + item.toLowerCase())}
                        </BreadcrumbItem>
                        {i >= 0 && i < result.length - 1 &&
                            <BreadcrumbSeparator className="rotate-180" />
                        }
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadcrumbWrapper
