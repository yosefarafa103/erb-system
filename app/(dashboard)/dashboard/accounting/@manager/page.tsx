"use client"
import AddJournalEntryDialog from "@/app/(dashboard)/_components/AddJournalEntryDialog"
import AccountingTable from "@/app/(dashboard)/_components/tables/accounting/accountingTable/AccountingTable"
import DataTable from "@/app/(dashboard)/_components/tables/accounting/JournalEntries/DataTable"
import BlockWrapper from "@/components/BlockWrapper"
import Section from "@/components/Section"
// Fake Charts (Will be Dynamic);
import dynamic from "next/dynamic";

import { ChartCardSkeleton } from "@/app/(dashboard)/_components/charts/CardSkeleton"
const ChartExample = dynamic(() => import("@/app/(dashboard)/_components/charts/AccountingProfitCharts"), { ssr: false, loading: () => <ChartCardSkeleton /> });
const ChartAreaInteractive = dynamic(() => import("@/app/(dashboard)/_components/charts/CashFlowCharts"), { ssr: false, loading: () => <ChartCardSkeleton /> });
const ChartPieInteractive = dynamic(() => import("@/app/(dashboard)/_components/charts/ExpenseChart"), { ssr: false, loading: () => <ChartCardSkeleton /> });
const ChartLineDots = dynamic(() => import("@/app/(dashboard)/_components/charts/RevenueCharts"), { ssr: false, loading: () => <ChartCardSkeleton /> });
import AddInvoiceDialog from "@/app/(dashboard)/_components/AddInvoiceDialog"
import InvoicesTable from "@/app/(dashboard)/_components/tables/accounting/invoice/DataTable"
import PaymentsTable from "@/app/(dashboard)/_components/tables/accounting/payments/DataTable"
import ContactsTable from "@/app/(dashboard)/_components/tables/accounting/contact/DataTable"
import { Suspense } from "react"
import LedgerTable from "@/app/(dashboard)/_components/tables/accounting/generalLedger/DataTable"
import TableSkeleton from "@/components/TableSkeleton"
const page = () => {
    return (
        <>
            <BlockWrapper className="mt-3">
                <div className="sm:grid grid-cols-2 gap-3 flex flex-col">
                    <Suspense
                    >
                        <ChartExample />
                        <ChartAreaInteractive />
                        <ChartPieInteractive />
                        <ChartLineDots />
                    </Suspense>
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
            <BlockWrapper className="mt-3">
                <Section>
                    <div className="flex justify-between items-center gap-2">
                        <Section.Title title="المدفوعات" />
                    </div>
                    <Section.Children>
                        <PaymentsTable />
                    </Section.Children>
                </Section>
            </BlockWrapper>
            <BlockWrapper className="mt-3">
                <Section>
                    <div className="flex justify-between items-center gap-2">
                        <Section.Title title="العملاء والموردين" />
                    </div>
                    <Section.Children>
                        <ContactsTable />
                    </Section.Children>
                </Section>
            </BlockWrapper>
            <BlockWrapper className="mt-3">
                <Section>
                    <div className="flex justify-between items-center gap-2">
                        <Section.Title title="دفتر الأستاذ" />
                    </div>
                    <Section.Children>
                        <LedgerTable />
                    </Section.Children>
                </Section>
            </BlockWrapper>
        </>
    )
}

export default page
