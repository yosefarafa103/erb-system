"use client"
import { Input } from '@/components/ui/input'
import { useCurretnTranslatedPath } from '../_hooks/useCurrentTranslatedPath';
import { useEffect, useState } from 'react';
import { useGlobalSearch } from '../_stores/useGlobalSearch';

const HeaderSearch = () => {
    const [value, setValue] = useState<string>('')
    const { translatedPath } = useCurretnTranslatedPath();
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