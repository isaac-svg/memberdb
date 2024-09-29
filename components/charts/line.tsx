"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  views: {
    label: "Total givings",
  },
  value: {
    label: "section",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type LineChartData = {
  date: string;
  value: number;
};
type LineChartProps = {
  title: string;
  description: string;
  data: LineChartData[];
  averageMesage: string;
};
export function LineChartComponent({
  data,
  description,
  title,
  averageMesage,
}: LineChartProps) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("value");

  const total = React.useMemo(
    () => ({
      attendance:
        data.reduce((acc, curr) => acc + curr.value, 0) / data.length - 1,
    }),
    []
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex">
          {["attendance"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {/* {chartConfig[chart].label} */}
                  {averageMesage}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const chartData2 = [
  { month: "January", male: 186, female: 80 },
  { month: "February", male: 305, female: 200 },
  { month: "March", male: 237, female: 120 },
  { month: "April", male: 73, female: 190 },
  { month: "May", male: 209, female: 130 },
  { month: "June", male: 214, female: 140 },
];

const chartConfig2 = {
  male: {
    label: "Male Attendance",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "Female Attendance",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LineChartMultipleComponent() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle> Attendance by Gender</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig2}>
          <LineChart
            accessibilityLayer
            data={chartData2}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)} // Shorten month names
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="male"
              type="monotone"
              stroke="var(--color-male)" // Replace with your color variable for male
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="female"
              type="monotone"
              stroke="var(--color-female)" // Replace with your color variable for female
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Attendance trending up by 5.2% this month{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total attendance for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
