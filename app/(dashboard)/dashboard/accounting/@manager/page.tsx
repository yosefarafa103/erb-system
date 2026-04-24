import AddJournalEntryDialog from "@/app/(dashboard)/_components/AddJournalEntryDialog"
import AccountingTable from "@/app/(dashboard)/_components/tables/accounting/accountingTable/AccountingTable"
import DataTable from "@/app/(dashboard)/_components/tables/accounting/JournalEntries/DataTable"
import BlockWrapper from "@/components/BlockWrapper"
import Section from "@/components/Section"
// Fake Charts (Will be Dynamic)
import { ChartExample } from "@/app/(dashboard)/_components/charts/AccountingProfitCharts"
import { ChartAreaInteractive } from "@/app/(dashboard)/_components/charts/CashFlowCharts"
import { ChartPieInteractive } from "@/app/(dashboard)/_components/charts/ExpenseChart"
import { ChartLineDots } from "@/app/(dashboard)/_components/charts/RevenueCharts"
import AddInvoiceDialog from "@/app/(dashboard)/_components/AddInvoiceDialog"
import InvoicesTable from "@/app/(dashboard)/_components/tables/accounting/invoice/DataTable"

const page = () => {
    return (
        <>
            <BlockWrapper className="mt-3">
                <div className="sm:grid grid-cols-2 gap-3 flex flex-col">
                    <ChartExample />
                    <ChartAreaInteractive />
                    <ChartPieInteractive />
                    <ChartLineDots />
                </div>
                <Section className="mt-10">
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
                        <AddJournalEntryDialog />
                    </div>
                    <Section.Children>
                        <DataTable />
                    </Section.Children>
                </Section>
            </BlockWrapper>
            <BlockWrapper className="mt-3">
                <Section>
                    <div className="flex justify-between items-center gap-2">
                        <Section.Title title="الفواتير" />
                        <AddInvoiceDialog />
                    </div>
                    <Section.Children>
                        <InvoicesTable />
                    </Section.Children>
                </Section>
            </BlockWrapper>
        </>
    )
}

export default page
