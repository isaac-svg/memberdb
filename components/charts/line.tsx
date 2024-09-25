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

const chartData = [
  { date: "2024-04-01", attendance: 222, mobile: 150 },
  { date: "2024-04-02", attendance: 97, mobile: 180 },
  { date: "2024-04-03", attendance: 167, mobile: 120 },
  { date: "2024-04-04", attendance: 242, mobile: 260 },
  { date: "2024-04-05", attendance: 373, mobile: 290 },
  { date: "2024-04-06", attendance: 301, mobile: 340 },
  { date: "2024-04-07", attendance: 245, mobile: 180 },
  { date: "2024-04-08", attendance: 409, mobile: 320 },
  { date: "2024-04-09", attendance: 59, mobile: 110 },
  { date: "2024-04-10", attendance: 261, mobile: 190 },
  { date: "2024-04-11", attendance: 327, mobile: 350 },
  { date: "2024-04-12", attendance: 292, mobile: 210 },
  { date: "2024-04-13", attendance: 342, mobile: 380 },
  { date: "2024-04-14", attendance: 137, mobile: 220 },
  { date: "2024-04-15", attendance: 120, mobile: 170 },
  { date: "2024-04-16", attendance: 138, mobile: 190 },
  { date: "2024-04-17", attendance: 446, mobile: 360 },
  { date: "2024-04-18", attendance: 364, mobile: 410 },
  { date: "2024-04-19", attendance: 243, mobile: 180 },
  { date: "2024-04-20", attendance: 89, mobile: 150 },
  { date: "2024-04-21", attendance: 137, mobile: 200 },
  { date: "2024-04-22", attendance: 224, mobile: 170 },
  { date: "2024-04-23", attendance: 138, mobile: 230 },
  { date: "2024-04-24", attendance: 387, mobile: 290 },
  { date: "2024-04-25", attendance: 215, mobile: 250 },
  { date: "2024-04-26", attendance: 75, mobile: 130 },
  { date: "2024-04-27", attendance: 383, mobile: 420 },
  { date: "2024-04-28", attendance: 122, mobile: 180 },
  { date: "2024-04-29", attendance: 315, mobile: 240 },
  { date: "2024-04-30", attendance: 454, mobile: 380 },
  { date: "2024-05-01", attendance: 165, mobile: 220 },
  { date: "2024-05-02", attendance: 293, mobile: 310 },
  { date: "2024-05-03", attendance: 247, mobile: 190 },
  { date: "2024-05-04", attendance: 385, mobile: 420 },
  { date: "2024-05-05", attendance: 481, mobile: 390 },
  { date: "2024-05-06", attendance: 498, mobile: 520 },
  { date: "2024-05-07", attendance: 388, mobile: 300 },
  { date: "2024-05-08", attendance: 149, mobile: 210 },
  { date: "2024-05-09", attendance: 227, mobile: 180 },
  { date: "2024-05-10", attendance: 293, mobile: 330 },
  { date: "2024-05-11", attendance: 335, mobile: 270 },
  { date: "2024-05-12", attendance: 197, mobile: 240 },
  { date: "2024-05-13", attendance: 197, mobile: 160 },
  { date: "2024-05-14", attendance: 448, mobile: 490 },
  { date: "2024-05-15", attendance: 473, mobile: 380 },
  { date: "2024-05-16", attendance: 338, mobile: 400 },
  { date: "2024-05-17", attendance: 499, mobile: 420 },
  { date: "2024-05-18", attendance: 315, mobile: 350 },
  { date: "2024-05-19", attendance: 235, mobile: 180 },
  { date: "2024-05-20", attendance: 177, mobile: 230 },
  { date: "2024-05-21", attendance: 82, mobile: 140 },
  { date: "2024-05-22", attendance: 81, mobile: 120 },
  { date: "2024-05-23", attendance: 252, mobile: 290 },
  { date: "2024-05-24", attendance: 294, mobile: 220 },
  { date: "2024-05-25", attendance: 201, mobile: 250 },
  { date: "2024-05-26", attendance: 213, mobile: 170 },
  { date: "2024-05-27", attendance: 420, mobile: 460 },
  { date: "2024-05-28", attendance: 233, mobile: 190 },
  { date: "2024-05-29", attendance: 78, mobile: 130 },
  { date: "2024-05-30", attendance: 340, mobile: 280 },
  { date: "2024-05-31", attendance: 178, mobile: 230 },
  { date: "2024-06-01", attendance: 178, mobile: 200 },
  { date: "2024-06-02", attendance: 470, mobile: 410 },
  { date: "2024-06-03", attendance: 103, mobile: 160 },
  { date: "2024-06-04", attendance: 439, mobile: 380 },
  { date: "2024-06-05", attendance: 88, mobile: 140 },
  { date: "2024-06-06", attendance: 294, mobile: 250 },
  { date: "2024-06-07", attendance: 323, mobile: 370 },
  { date: "2024-06-08", attendance: 385, mobile: 320 },
  { date: "2024-06-09", attendance: 438, mobile: 480 },
  { date: "2024-06-10", attendance: 155, mobile: 200 },
  { date: "2024-06-11", attendance: 92, mobile: 150 },
  { date: "2024-06-12", attendance: 492, mobile: 420 },
  { date: "2024-06-13", attendance: 81, mobile: 130 },
  { date: "2024-06-14", attendance: 426, mobile: 380 },
  { date: "2024-06-15", attendance: 307, mobile: 350 },
  { date: "2024-06-16", attendance: 371, mobile: 310 },
  { date: "2024-06-17", attendance: 475, mobile: 520 },
  { date: "2024-06-18", attendance: 107, mobile: 170 },
  { date: "2024-06-19", attendance: 341, mobile: 290 },
  { date: "2024-06-20", attendance: 408, mobile: 450 },
  { date: "2024-06-21", attendance: 169, mobile: 210 },
  { date: "2024-06-22", attendance: 317, mobile: 270 },
  { date: "2024-06-23", attendance: 480, mobile: 530 },
  { date: "2024-06-24", attendance: 132, mobile: 180 },
  { date: "2024-06-25", attendance: 141, mobile: 190 },
  { date: "2024-06-26", attendance: 434, mobile: 380 },
  { date: "2024-06-27", attendance: 448, mobile: 490 },
  { date: "2024-06-28", attendance: 149, mobile: 200 },
  { date: "2024-06-29", attendance: 103, mobile: 160 },
  { date: "2024-06-30", attendance: 446, mobile: 400 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  attendance: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LineChartComponent() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("attendance");

  const total = React.useMemo(
    () => ({
      attendance: chartData.reduce((acc, curr) => acc + curr.attendance, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Overall Attendance</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
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
                  Average
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
            data={chartData}
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
