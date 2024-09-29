"use client";
import {
  BarChartComponent,
  BarChartHorizontalComponent,
} from "@/components/charts/bar";
import {
  LineChartComponent,
  LineChartMultipleComponent,
} from "@/components/charts/line";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  CreditCard,
  DollarSign,
  UserPlus,
  Users,
} from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

type Props = {};

const AnalyticsPage = (props: Props) => {
  return (
    <div className="min-h-screen px-6 py-8 flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Attendance
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+8,320</div>
            <p className="text-xs text-muted-foreground">
              +15.4% from last month
            </p>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Members</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+150</div>
            <p className="text-xs text-muted-foreground">
              +25.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,543.78</div>
            <p className="text-xs text-muted-foreground">
              +10% from last month
            </p>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Members
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+320</div>
            <p className="text-xs text-muted-foreground">+45 since last hour</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex w-full">
        <LineChartComponent
          data={[
            { date: "2024-04-01", value: 222 },
            { date: "2024-04-02", value: 97 },
            { date: "2024-09-12", value: 300 },
          ]}
          title="Attendance analytics"
          description="Attendance per month for the last three mongths"
          averageMesage="Average monthly attendance"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <BarChartComponent />
        <LineChartMultipleComponent />
        <BarChartHorizontalComponent />
      </div>
    </div>
  );
};

export default AnalyticsPage;
