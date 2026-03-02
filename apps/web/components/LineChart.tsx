"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"


interface LineChartProps<CData> {
    title: string,
    description: string
    xAxisKey: string,
    data: CData[] | undefined,
    chartConfig: ChartConfig
}

export function TimeSeriesLineChart<CData>({ data, description, title, xAxisKey, chartConfig }: LineChartProps<CData>) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 0,
                            right: 0,
                        }}
                    >
                        <CartesianGrid vertical={true} />
                        <XAxis
                            dataKey={xAxisKey}
                            tickLine={true}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                const date = new Date(Number(value) * 1000);
                                return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
                            }}
                        />
                        <YAxis unit={"%"} />
                        <ChartTooltip cursor={true} content={<ChartTooltipContent indicator="line"
                            labelFormatter={(value) => {
                                const date = new Date(Number(value) * 1000)
                                return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
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
