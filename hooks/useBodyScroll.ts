import { useEffect } from "react";

export const useLockBodyScroll = (isLocked: boolean) => {
    useEffect(() => {
        document.body.style.overflow = isLocked ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isLocked]);
};