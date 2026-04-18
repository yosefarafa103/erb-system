import { useDirection } from "@/components/ui/direction";
import { CheckmarkCircle02FreeIcons, Info, X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

type ToastType = "success" | "error" | "info";

export function showToast(
  type: ToastType,
  title: string,
  description?: string,
  dir?: "rtl" | "ltr"
) {
  const icons = {
    success: <HugeiconsIcon icon={CheckmarkCircle02FreeIcons} className="text-green-500" />,
    error: <HugeiconsIcon icon={X} className="text-red-500" />,
    info: <HugeiconsIcon icon={Info} className="text-blue-500" />
  };
  toast.custom((t) => (
    <div
      dir={dir}
      className="flex items-start gap-3 rounded-xl border bg-background p-4 shadow-lg min-w-100"
    >
      <div className="mt-1">{icons[type]}</div>
      <div className="flex flex-col">
        <p className="font-medium text-sm">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  ));
}