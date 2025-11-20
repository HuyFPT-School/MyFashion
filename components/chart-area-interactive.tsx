"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ChartDataProps {
  dailyData: Array<{ name: string; sales: number }>;
  weeklyData: Array<{ name: string; sales: number }>;
  monthlyData: Array<{ name: string; sales: number }>;
}

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({
  dailyData,
  weeklyData,
  monthlyData,
}: ChartDataProps) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState<
    "daily" | "weekly" | "monthly"
  >("monthly");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("weekly");
    }
  }, [isMobile]);

  // Chọn data theo time range
  const chartData = React.useMemo(() => {
    switch (timeRange) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      default:
        return monthlyData;
    }
  }, [timeRange, dailyData, weeklyData, monthlyData]);

  // Tính tổng sales
  const totalSales = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.sales, 0);
  }, [chartData]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total revenue: ${totalSales.toLocaleString("de-DE")}
          </span>
          <span className="@[540px]/card:hidden">
            ${totalSales.toLocaleString("de-DE")}
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onValueChange={(value) => value && setTimeRange(value as any)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
            <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
            <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onValueChange={(value) => setTimeRange(value as any)}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Monthly" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="daily" className="rounded-lg">
                Daily
              </SelectItem>
              <SelectItem value="weekly" className="rounded-lg">
                Weekly
              </SelectItem>
              <SelectItem value="monthly" className="rounded-lg">
                Monthly
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                if (timeRange === "daily") {
                  return value.split(" ")[1] || value;
                }
                return value;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  formatter={(value) => [
                    `$${Number(value).toLocaleString("de-DE")}`,
                    "Sales",
                  ]}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="url(#fillSales)"
              stroke="var(--color-sales)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
