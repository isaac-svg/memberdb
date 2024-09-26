import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";

type Props = {};

const MonthlyStat = (props: Props) => {
  return (
    <Card className="flex flex-col lg:max-w-md" x-chunk="charts-01-chunk-1">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
        <div>
          <CardDescription>Total Donations</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            8500
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              GHC
            </span>
          </CardTitle>
        </div>
        <div>
          {/* <CardDescription>New Members</CardDescription> */}
          {/* <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            15
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              members
            </span>
          </CardTitle> */}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center">
        <ChartContainer
          config={{
            donations: {
              label: "Donations",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="w-full"
        >
          <LineChart
            accessibilityLayer
            margin={{
              left: 14,
              right: 14,
              top: 10,
            }}
            data={[
              { date: "2024-01-01", donations: 1000 },
              { date: "2024-02-01", donations: 1500 },
              { date: "2024-03-01", donations: 1200 },
              { date: "2024-04-01", donations: 1800 },
              { date: "2024-05-01", donations: 2000 },
              { date: "2024-06-01", donations: 1700 },
              { date: "2024-07-01", donations: 2200 },
              { date: "2024-08-01", donations: 1600 },
              { date: "2024-09-01", donations: 1900 },
              { date: "2024-10-01", donations: 2000 },
              { date: "2024-11-01", donations: 2300 },
              { date: "2024-12-01", donations: 2500 },
            ]}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={0.5}
            />
            <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                });
              }}
            />
            <Line
              dataKey="donations"
              type="natural"
              fill="var(--color-donations)"
              stroke="var(--color-donations)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                fill: "var(--color-donations)",
                stroke: "var(--color-donations)",
                r: 4,
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyStat;
