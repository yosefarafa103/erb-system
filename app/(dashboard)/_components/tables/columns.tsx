import { ColumnDef } from "@tanstack/react-table";
import { Role } from "../../_types";
import { GetMeReponseType, Status, Tenent, User } from "../../_types/users";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import UserActionsTable from "../UserActionsTable";
type UserRow = {
  id: string;
  account: string;
  email: string;
  role: Role;
  access: "full" | "limited" | "read";
  status: Status;
};
const getCurrentTenantRole = (tenants: Tenent[], tenantId: string) => {
  return tenants?.find((t) => {
    const id =
      typeof t.tenantId === "object"
        ? t.tenantId._id
        : t.tenantId;

    return id === tenantId;
  })?.role;
};
export const columns: ColumnDef<GetMeReponseType>[] = [
  {
    accessorKey: "name",
    header: "الحساب",
  },

  {
    accessorKey: "email",
    header: "الايميل",
    cell: ({ row }) => (
      <div className="flex items-center gap-4 text-sm">
        <Separator orientation="vertical" />
        <span>{row.getValue("email")}</span>
      </div>
    ),
  },

  {
    id: "role",
    header: "الصلاحيات",
    cell: ({ row }) => {
      const tenantId =
        typeof window !== "undefined"
          ? localStorage.getItem("currentTenent")!
          : "";
      const role = getCurrentTenantRole(row.original.tenants, tenantId);
      return (
        <div className="flex items-center gap-4 text-sm">
          <Separator orientation="vertical" />
          <span className="text-purple-400">
            {role || "N/A"}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "lastActiveTenant",
    header: "التحكم",
    cell: ({ row }) => {
      const value = row.getValue("lastActiveTenant") as string;

      return (
        <div className="flex items-center gap-4 text-sm">
          <Separator orientation="vertical" />
          <span className="text-slate-600 capitalize">
            {value}
          </span>
        </div>
      );
    },
  },

  {
    id: "status",
    header: "الحالة",
    cell: ({ row }) => {
      const status = row.original.isActive;

      return (
        <div className="flex items-center gap-4 text-sm">
          <Separator orientation="vertical" />
          <span
            className={`px-2 py-1 text-xs rounded ${status
              ? "bg-green-500/20 text-green-900"
              : "bg-red-500/20 text-red-900"
              }`}
          >
            {status ? "enabled" : "disabled"}
          </span>
        </div>
      );
    },
  },

  {
    id: "actions",
    maxSize: 20,
    cell: () => <UserActionsTable />,
  },
];