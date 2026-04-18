"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTableFilters } from "../stores/useTableStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function TableFilters() {
    const {
        search,
        role,
        status,
        setSearch,
        setStatus,
        reset, setRole
    } = useTableFilters();
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end mb-4 w-full">
            <div className="flex items-center gap-2">
                <Select
                    dir="rtl"
                    value={role} onValueChange={setRole}
                >
                    <SelectTrigger className="h-10 w-[160px] bg-background text-sm">
                        <SelectValue placeholder="كل الأدوار" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">كل الأدوار</SelectItem>
                        <SelectItem value="admin">مدير عام</SelectItem>
                        <SelectItem value="manager">مدير</SelectItem>
                        <SelectItem value="accounting">محاسب</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    dir="rtl"

                    value={status} onValueChange={setStatus}>
                    <SelectTrigger className="h-10 w-[160px] bg-background text-sm">
                        <SelectValue placeholder="كل الحالات" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">كل الحالات</SelectItem>
                        <SelectItem value="enabled">مفعل</SelectItem>
                        <SelectItem value="disabled">غير مفعل</SelectItem>
                    </SelectContent>
                </Select>

            </div>
            <div className="w-full md:w-1/3 flex gap-2">
                <Input
                    placeholder="ابحث..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="purple">
                    بحث
                </Button>
            </div>
            <Button variant="outline" onClick={reset}>
                إعادة تعيين
            </Button>
        </div>
    );
}