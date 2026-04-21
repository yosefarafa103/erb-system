import AccountingTable from "@/app/(dashboard)/_components/tables/accounting/accountingTable/AccountingTable"
import DataTable from "@/app/(dashboard)/_components/tables/accounting/JournalEntries/DataTable"
import BlockWrapper from "@/components/BlockWrapper"
import Section from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const page = () => {
    return (
        <>
            <BlockWrapper className="mt-3">
                <Section>
                    <Section.Title title="نظرة عامة (المدير)" />
                    <Section.Children>
                        <AccountingTable />
                    </Section.Children>
                </Section>
            </BlockWrapper>

            <BlockWrapper className="mt-3">
                <Section>
                    <div className="flex justify-between">
                        <Section.Title title="القيود اليومية" />
                        <Button variant="purple"> اضف قيد جديد <Plus />  </Button>
                    </div>
                    <Section.Children>
                        <DataTable />
                    </Section.Children>
                </Section>
            </BlockWrapper>
        </>
    )
}

export default page
