import BlockWrapper from "@/components/BlockWrapper"
import Section from "@/components/Section"
import AddInvoiceDialog from "../../_components/AddInvoiceDialog"
import InvoicesTable from "../../_components/tables/accounting/invoice/DataTable"
import { getAllInvoices, getTenentInvoices } from "../../_services/invoices.service"
import { getToken } from "../../_helpers/getToken"
import PaymentsTable from "../../_components/tables/accounting/payments/DataTable"

const page = async ({ searchParams }: PageProps<'/dashboard/sales'>) => {
    //! Shoud Be search param called tenant
    const tenentId: string = (await searchParams).tenant as string
    const invoices = await getTenentInvoices(tenentId);
    console.log(invoices);

    const token = (await getToken())
    return (
        <>
            { }
            <BlockWrapper className="mt-3">
                <Section>
                    <div className="flex justify-between items-center gap-2">
                        <Section.Title title="الفواتير" />
                        <AddInvoiceDialog token={token?.value!} />
                    </div>
                    <Section.Children>
                        <InvoicesTable data={invoices} />
                    </Section.Children>
                </Section>
            </BlockWrapper>
            {/* Payments */}
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
        </>
    )
}

export default page
