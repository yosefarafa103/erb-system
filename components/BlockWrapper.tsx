import { cn } from "@/lib/utils"
import { ChildrenType } from "@/types"
type Props = ChildrenType & {
    className?: string
}
export default function BlockWrapper({ className, children }: Props) {
    return (
        <div className={cn("p-3 bg-background rounded-lg mt-3", className)}>
            {children}
        </div>
    )
}

