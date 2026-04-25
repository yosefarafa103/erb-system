"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type {
    PieSectorDataItem,
    PieSectorShapeProps,
} from "recharts/types/polar/Pie"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { desktopData } from "./data"

export const description = "An interactive pie chart"



const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Desktop",
        color: "hsl(270 80% 55%)",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(270 70% 65%)",
    },
    january: {
        label: "January",
        color: "hsl(270 80% 50%)",
    },
    february: {
        label: "February",
        color: "hsl(270 75% 55%)",
    },
    march: {
        label: "March",
        color: "hsl(270 70% 60%)",
    },
    april: {
        label: "April",
        color: "hsl(270 65% 65%)",
    },
    may: {
        label: "May",
        color: "hsl(270 60% 70%)",
    },
} satisfies ChartConfig

export default function ChartPieInteractive() {
    const id = "pie-interactive"
    const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month)
    const activeIndex = React.useMemo(
        () => desktopData.findIndex((item) => item.month === activeMonth),
        [activeMonth]
    )
    const months = React.useMemo(() => desktopData.map((item) => item.month), [])

    const renderPieShape = React.useCallback(
        ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
            if (index === activeIndex) {
                return (
                    <g>
                        <Sector {...props} outerRadius={outerRadius + 10} />
                        <Sector
                            {...props}
                            outerRadius={outerRadius + 25}
                            innerRadius={outerRadius + 12}
                        />
                    </g>
                )
            }

            return <Sector {...props} outerRadius={outerRadius} />
        },
        [activeIndex]
    )

    return (
        <Card data-chart={id} className="flex flex-col">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>المصروفات</CardTitle>
                    <CardDescription>المصروفات من شهر يناير الي يونيو 2025</CardDescription>
                </div>
                <Select value={activeMonth} onValueChange={setActiveMonth}>
                    <SelectTrigger
                        className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {months.map((key) => {
                            const config = chartConfig[key as keyof typeof chartConfig]
                            if (!config) {
                                return null
                            }
                            return (
                                <SelectItem
                                    key={key}
                                    value={key}
                                    className="rounded-lg [&_span]:flex"
                                >
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className="flex h-3 w-3 shrink-0 rounded-xs"
                                            style={{
                                                backgroundColor: `var(--color-${key})`,
                                            }}
                                        />
                                        {config?.label}
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={desktopData}
                            dataKey="desktop"
                            nameKey="month"
                            innerRadius={60}
                            strokeWidth={5}
                            shape={renderPieShape}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {desktopData[activeIndex].desktop.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Visitors
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
