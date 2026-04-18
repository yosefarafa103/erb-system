"use client"

import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { GeneralUtils } from "../helpers/jsx";
import { useMemo, } from "react";

export function useCurretnTranslatedPath() {
    const { t } = useTranslation();
    const pn = usePathname()
    const { getPathNameForBreadCrumb } = new GeneralUtils();
    const currentQueryKey = getPathNameForBreadCrumb(pn);
    const currentQuerytitle = useMemo(() => t("dashboard.search." + currentQueryKey[currentQueryKey.length - 1]), [pn])
    return { translatedPath: currentQuerytitle }
}