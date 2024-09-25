"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

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
  {
    event: "Sunday Service",
    attendees: 320,
    fill: "var(--color-sunday-service)",
  },
  { event: "Bible Study", attendees: 150, fill: "var(--color-bible-study)" },
  { event: "Youth Meeting", attendees: 90, fill: "var(--color-youth-meeting)" },
  {
    event: "Prayer Meeting",
    attendees: 120,
    fill: "var(--color-prayer-meeting)",
  },
  { event: "Other Events", attendees: 60, fill: "var(--color-other-events)" },
];

const chartConfig = {
  attendees: {
    label: "Attendees",
  },
  "sunday-service": {
    label: "Sunday Service",
    color: "hsl(var(--chart-1))",
  },
  "bible-study": {
    label: "Bible Study",
    color: "hsl(var(--chart-2))",
  },
  "youth-meeting": {
    label: "Youth Meeting",
    color: "hsl(var(--chart-3))",
  },
  "prayer-meeting": {
    label: "Prayer Meeting",
    color: "hsl(var(--chart-4))",
  },
  "other-events": {
    label: "Other Events",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Events Attendance</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="event"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[
                  value
                    .toLowerCase()
                    .replace(/\s+/g, "-") as keyof typeof chartConfig
                ]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="attendees"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Attendance increased by 5.2% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total attendees for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

//                 chartConfig[value as keyof typeof chartConfig]?.label

const chartData2 = [
  { month: "January", attendance: 186 },
  { month: "February", attendance: 305 },
  { month: "March", attendance: 237 },
  { month: "April", attendance: 73 },
  { month: "May", attendance: 209 },
  { month: "June", attendance: 214 },
];

const chartConfig2 = {
  attendance: {
    label: "Attendance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarChartHorizontalComponent() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle> Sunday Service- Attendance</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig2}>
          <BarChart
            accessibilityLayer
            data={chartData2}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="attendance" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Shorten the month names
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="attendance"
              fill="var(--color-attendance)"
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Attendance increased by 5.2% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total attendance for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
