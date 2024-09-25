import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import {
  Bar,
  BarChart,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis,
} from "recharts";

type Props = {};

const WeeklyStat = (props: Props) => {
  return (
    <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>This Week</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          230{" "}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            attendees
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            attendance: {
              label: "Attendance",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4,
            }}
            data={[
              {
                date: "2024-09-18",
                attendees: 30,
              },
              {
                date: "2024-09-19",
                attendees: 45,
              },
              {
                date: "2024-09-20",
                attendees: 35,
              },
              {
                date: "2024-09-21",
                attendees: 50,
              },
              {
                date: "2024-09-22",
                attendees: 40,
              },
              {
                date: "2024-09-23",
                attendees: 25,
              },
              {
                date: "2024-09-24",
                attendees: 45,
              },
            ]}
          >
            <Bar
              dataKey="attendees"
              fill="var(--color-attendance)"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                });
              }}
            />
            <ChartTooltip
              defaultIndex={2}
              content={
                <ChartTooltipContent
                  hideIndicator
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
            <ReferenceLine
              y={40}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Average Attendance"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value="40"
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          Over the past 7 days, you have had{" "}
          <span className="font-medium text-foreground">230</span> attendees.
        </CardDescription>
        <CardDescription>
          You need <span className="font-medium text-foreground">70</span> more
          attendees to reach your goal.
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default WeeklyStat;
