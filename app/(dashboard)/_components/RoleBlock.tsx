"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "../_types/users";
import { Role } from "../_types";
import { HugeiconsIcon } from "@hugeicons/react";
import { Settings01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { toast } from "sonner";
import { showToast } from "@/helpers/toast";

type RoleBlockProps = {
    title: string;
    users: User[];
    role: Role
};
export function RoleBlock({ title, users, role }: RoleBlockProps) {
    const a = !true
    return (
        <Card className="border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between border-b-solid border-b-accent  border-b-2 pb-4">
                <h3 className="text-xl text-foreground font-bold">{title}</h3>
                <Button variant="lightPurple" className="text-sm">
                    عرض الكل
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {users.slice(0, 4).map((user) => (
                    <UserItem user={user} />
                ))}
            </CardContent>
            <CardFooter>
                <Button variant="lightYellow" className="w-full text-lg" asChild>
                    {a ?
                        <Link href={`/dashboard/users/${role}`}>
                            <HugeiconsIcon icon={Settings01Icon} />
                            ادارة
                        </Link>
                        : <Button onClick={() => showToast("info", "Unauthorize Expection", "",)} variant="secondary" className="w-full text-lg" >
                            <HugeiconsIcon icon={Settings01Icon} />
                            ادارة
                        </Button>
                    }
                </Button>
            </CardFooter>
        </Card>
    );
}

type UserItemProps = {
    user: User
};

export default function UserItem({ user }: UserItemProps) {
    const roleStyles: Record<Role, string> = {
        admin: "bg-purple-500/20 text-purple-400",
        manager: "bg-blue-500/20 text-blue-400",
        accounting: "bg-yellow-500/20 text-yellow-400"
    };
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={"user.image"} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-foreground text-sm font-medium">
                        {user.name}
                    </p>
                    <span
                        className={`text-xs px-2 py-1 rounded ${roleStyles[user.role]}`}
                    >
                        {user.description}
                    </span>
                </div>
            </div>

            <span
                className={`text-xs px-2 py-1 rounded ${user.status.en === "enabled"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                    }`}
            >
                {user.status.ar}
            </span>
        </div>
    );
}