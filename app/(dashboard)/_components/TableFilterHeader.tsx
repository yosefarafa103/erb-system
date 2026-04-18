"use client"
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Role } from '../_types';
import { adminDataTable } from './tables/data';
import { useTableFilters } from '../stores/useTableStore';

const TableFilterHeader = () => {
    const fakeUsers = useMemo(() => Object.groupBy(adminDataTable, (user) => user.role), [adminDataTable])
    let tabs: Role[] = Object.keys(fakeUsers) as Role[]
    const { t } = useTranslation();
    const { setRole, role } = useTableFilters()
    return (
        <section className='flex gap-2 items-center mb-3 flex-wrap'>
            <Button onClick={() => setRole("all")} variant="outline"> الكل ({adminDataTable.length}) </Button>
            {[...tabs].map((el: Role, i) => (
                <Button onClick={() => setRole(el)} variant={role === el ? 'purple' : "outline"}>{t("roles." + el)} ({fakeUsers[el]?.length})  </Button>
            ))}
        </section>
    )
}

export default TableFilterHeader
