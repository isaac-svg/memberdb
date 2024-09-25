import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { ChartContainer } from "../ui/chart";
import { Separator } from "../ui/separator";

type Props = {};

const ServiceStat = (props: Props) => {
  return (
    <Card className="max-w-xs" x-chunk="charts-01-chunk-4">
      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer
          config={{
            attendance: {
              label: "Attendance",
              color: "hsl(var(--chart-1))",
            },
            services: {
              label: "Services Held",
              color: "hsl(var(--chart-2))",
            },
            volunteers: {
              label: "Volunteers Engaged",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[140px] w-full"
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={[
              {
                activity: "attendance",
                value: (150 / 200) * 100,
                label: "150/200",
                fill: "var(--color-attendance)",
              },
              {
                activity: "services",
                value: (12 / 20) * 100,
                label: "12/20",
                fill: "var(--color-services)",
              },
              {
                activity: "volunteers",
                value: (30 / 50) * 100,
                label: "30/50",
                fill: "var(--color-volunteers)",
              },
            ]}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Attendance</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              150
              <span className="text-sm font-normal text-muted-foreground">
                people
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Services Held</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              12
              <span className="text-sm font-normal text-muted-foreground">
                services
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          {/* <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Volunteers</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              30
              <span className="text-sm font-normal text-muted-foreground">
                volunteers
              </span>
            </div>
          </div> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceStat;
