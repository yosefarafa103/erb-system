"use client"
import { Input } from '@/components/ui/input'
import { useCurretnTranslatedPath } from '../_hooks/useCurrentTranslatedPath';
import { useEffect, useState } from 'react';
import { useGlobalFilter } from '../_hooks/useSearchFilter';
import { useGlobalSearch } from '../stores/useGlobalSearch';
import { adminDataTable } from './tables/data';

const HeaderSearch = () => {
    const [value, setValue] = useState<string>('')
    const { translatedPath } = useCurretnTranslatedPath();
    const data = useGlobalFilter({ data: adminDataTable, keys: ["account"], search: value });
    const { setSearch } = useGlobalSearch();
    useEffect(() => {
        setSearch("users", value)
    }, [value]);
    return (
        <Input
            className='max-sm:hidden'
            onChange={(e) => setValue(e.target.value)}
            placeholder={`البحث عن اعضاء ( ${translatedPath} ) `}
        />
    )
}
export default HeaderSearch