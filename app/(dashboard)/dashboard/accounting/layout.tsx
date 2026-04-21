import BlockWrapper from '@/components/BlockWrapper'
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"

const sections = [{
    title: "الايرادات",
    cost: 1000000
},
{
    title: "المصروفات",
    cost: 4200000
},
{
    title: "صافي الربح",
    cost: 41220
},
{
    title: "الكاش المتاح",
    cost: 4110
},
]
const layout = ({ manager }: LayoutProps<"/dashboard/accounting">) => {
    const isManager = 1
    return (
        <>
            <BlockWrapper>
                <section className="grid grid-cols-4 gap-5">
                    {sections.map(({ title, cost }) => (
                        <Card>
                            <CardTitle className="font-semibold text-xl p-4 pt-0 text-purple-500 pb-3 border-b-2 border-b-purple-500"> {title} </CardTitle>
                            <CardContent>
                                <CardFooter className="justify-center font-bold text-2xl text-muted-foreground"> {Number(cost).toLocaleString("ar-EG")} جنيه </CardFooter>
                            </CardContent>
                        </Card>
                    ))}
                </section>
            </BlockWrapper>
            {isManager ? manager : null}
        </>
    )
}

export default layout
