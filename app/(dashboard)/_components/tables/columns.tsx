import { ColumnDef } from "@tanstack/react-table";
import { Role } from "../../_types";
import { Status } from "../../_types/users";
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
export const columns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "account",
    header: "الحساب",
    maxSize: 100
  },
  {
    accessorKey: "email",
    header: "الايميل",
    cell: ({ row }) => {
      const { t } =
        useTranslation()
      return <div className="flex items-center gap-4 text-sm">
        <Separator orientation="vertical" />
        <span >
          {row.getValue("email")}
        </span>
      </div>
    }
  },
  {
    accessorKey: "role",
    header: "الصلاحيات",
    cell: ({ row }) => {
      const role = row.getValue("role") as Role;
      const { t } =
        useTranslation()
      const styles = {
        admin: "text-purple-400",
        manager: "text-blue-400",
        accounting: "text-yellow-400"
      };

      return (
        <div className="flex items-center gap-4 text-sm">

          <Separator orientation="vertical" />

          <span className={styles[role]}>
            {t("roles." + role.toLowerCase().trim())}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "access",
    header: "التحكم",
    cell: ({ row }) => {
      const { t } =
        useTranslation()
      const value = row.getValue("access") as string;
      return (
        <>
          <div className="flex items-center gap-4 text-sm">
            <Separator orientation="vertical" />
            <span className="text-slate-600 capitalize">
              {t("access." + value.toLowerCase().trim())}
            </span>
          </div>
        </>
      );
    }
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => {
      const { t } =
        useTranslation()
      const status = row.getValue("status") as Status;
      return (
        <>
          <div className="flex items-center gap-4 text-sm">
            <Separator orientation="vertical" />
            <span
              className={`px-2 py-1 text-xs rounded ${status === "enabled"
                ? "bg-green-500/20 text-green-900"
                : "bg-red-500/20 text-red-900"
                }`}
            >
              {t("status." + status.toLowerCase().trim())}
            </span>
          </div>
        </>
      );
    }
  },
  {
    accessorKey: " ",
    maxSize: 20,
    cell: ({ row }) => {
      return <UserActionsTable />
    }
  }
];