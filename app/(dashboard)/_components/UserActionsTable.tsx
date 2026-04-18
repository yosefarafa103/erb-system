import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontalIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

const UserActionsTable = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <HugeiconsIcon icon={MoreHorizontalIcon} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col gap-1 p-3'>
                <Button size="sm" variant="lightPurple">تعديل</Button>
                <Button size="sm" variant="destructive">حذف</Button>
                <Button size="sm">الغاء التفعيل</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserActionsTable
