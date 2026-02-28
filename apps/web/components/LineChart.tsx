"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { CpuMemChartData } from "@repo/types"


interface Props {
    title: string,
    description: string
    xAxisKey: string,
    data: CpuMemChartData["data"] | undefined,
    chartConfig: ChartConfig
}

export function TimeSeriesLineChart({ data, description, title, xAxisKey, chartConfig }: Props) {


    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-100 w-full">
                    <LineChart
                        accessibilityLayer
                        data={data}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={xAxisKey}
                            tickLine={true}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                const date = new Date(value * 1000);
                                return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                            }}
                        />
                        <YAxis unit={"%"} />
                        <ChartTooltip cursor={true} content={<ChartTooltipContent indicator="line"
                            labelFormatter={(value) => {
                                const date = new Date(Number(value) * 1000)
                                return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                            }}
                        />} />
                        {
                            Object.entries(chartConfig).map(([dataKey, config]) => (
                                <Line
                                    dataKey={dataKey}
                                    type="monotone"
                                    stroke={config["color"]}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            ))
                        }
                        <ChartLegend content={<ChartLegendContent />} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
