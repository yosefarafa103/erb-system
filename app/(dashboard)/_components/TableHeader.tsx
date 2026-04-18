import TableFilters from './ToolbarTable';

const TableHeader = () => {

    return (
        <section className='flex justify-between p-3'>
            <section className='flex flex-col w-full'>
                <h3 className="text-xl mb-2 sm:whitespace-nowrap"> حسابات الاعضاء  </h3>
            </section>
            <TableFilters />
        </section>
    )
}

export default TableHeader
