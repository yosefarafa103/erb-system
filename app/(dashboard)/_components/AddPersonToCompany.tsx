"use client";

import { useEffect, useState, useMemo, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { GetMeReponseType as User } from "../_types/users";
import { Plus, X } from "lucide-react";
import { addUserToTenantAction } from "@/app/(auth)/_actions/addUserToCompany";
import { showToast } from "@/helpers/toast";
import { User as UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const formSchema = z.object({
    email: z.string().email("يرجى إدخال بريد إلكتروني صحيح").optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddMemberToCompany() {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="my-2" variant="purple">
                    <HugeiconsIcon icon={UserIcon} />
                    إضافة عضو
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0">
                <AddMemberForm onClose={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

function AddMemberForm({ onClose }: { onClose: () => void }) {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "" },
    });

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://erb-api-fkhg.vercel.app/users");
                const json = await res.json();
                setAllUsers(json.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const results = useMemo(() => search.length < 2 ? [] : allUsers.filter((user) =>
        user.email.toLowerCase().includes(search.toLowerCase())
    ), [search, allUsers]);
    const [isPending, startTransition] = useTransition()
    const onSubmit = () => {
        startTransition(async () => {
            if (!selectedUser) {
                showToast("error", "يرجى اختيار مستخدم أولاً");
                return;
            }
            try {
                await addUserToTenantAction(selectedUser._id, localStorage.getItem("currentTenent")!, "admin")
                showToast("success", "تمت إضافة العضو بنجاح 🎉", '', 'rtl');
                onClose();
                setSelectedUser(null);
                setSearch("");
                form.reset();
            } catch (err: any) {
                showToast("error", "حدث خطأ أثناء الإضافة ", '', 'rtl');
            }
        })
    };

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>إضافة عضو إلى الشركة</CardTitle>
                <CardDescription>
                    ابحث عن المستخدم بالبريد الإلكتروني ثم اختره.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id="add-member-form" >
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <Field>
                                    <FieldLabel>البريد الإلكتروني</FieldLabel>

                                    <Input
                                        {...field}
                                        placeholder="example@email.com"
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setSelectedUser(null);
                                        }}
                                    />

                                    <FieldDescription>
                                        اكتب جزء من البريد الإلكتروني للبحث.
                                    </FieldDescription>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>

                <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
                    {loading && <p className="text-sm">جاري تحميل المستخدمين...</p>}
                    {results.map((user) => (
                        <section className="flex items-center justify-between gap-2 px-2">
                            <div
                                key={user._id}
                                className={`p-2 flex-1 border rounded cursor-pointer transition ${selectedUser?._id === user._id
                                    ? "bg-purple-900/50 border-purple-400"
                                    : "hover:bg-muted"
                                    }`}
                            >
                                {user.email}
                            </div>
                            <Button
                                onClick={() => setSelectedUser(selectedUser?._id === user._id ? null : user)}
                                variant={selectedUser?._id === user._id ? "lightPurple" : "outline"}>
                                {selectedUser?._id === user._id ? <>
                                    <X />
                                    ازالة
                                </> :
                                    <>
                                        اضافة <Plus />
                                    </>
                                }
                            </Button>
                        </section>
                    ))}

                    {!loading && search.length >= 2 && results.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            لا يوجد مستخدمين مطابقين
                        </p>
                    )}
                </div>
                {selectedUser && (
                    <p className="mt-3 text-sm text-muted-foreground">
                        تم اختيار:
                        <span className="font-medium">{selectedUser.email}</span>
                    </p>
                )}
            </CardContent>

            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            form.reset();
                            setSearch("");
                            setSelectedUser(null);
                        }}
                    >
                        إعادة تعيين
                    </Button>

                    <Button
                        onClick={onSubmit}
                        type="submit"
                        form="add-member-form"
                        variant="purple"
                        disabled={isPending}
                    >
                        {isPending ? "جاري الاضافة" : "إضافة العضو"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}