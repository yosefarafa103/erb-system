import BlockWrapper from '@/components/BlockWrapper'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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
                <section className="grid lg:grid-cols-4 grid-cols-2 gap-5">
                    {sections.map(({ title, cost }) => (
                        <Card className="rounded-xl border-purple-900/50 border bg-background shadow-sm hover:shadow-md transition">

                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl text-purple-500 font-bold">
                                    {title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <div className="text-2xl font-bold text-muted-foreground">
                                    {Number(cost).toLocaleString("ar-EG")}{" "}
                                    <span className="text-sm font-medium text-purple-500">
                                        جنيه
                                    </span>
                                </div>
                            </CardContent>

                            <CardFooter className="pt-2 text-xs text-muted-foreground justify-center">
                                آخر تحديث الآن
                            </CardFooter>

                        </Card>
                    ))}
                </section>
            </BlockWrapper>
            {isManager ? manager : null}
        </>
    )
}

export default layout
