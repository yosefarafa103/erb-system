"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { chartData } from "./data"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#6e11b0",
    },
    mobile: {
        label: "Mobile",
        color: "oklab(0.71 0.12 -0.17 / 0.4)",
    },
} satisfies ChartConfig

export default function ChartExample() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>حسابات الايرادات والخسائر</CardTitle>
                <CardDescription>يناير - يونيو 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
