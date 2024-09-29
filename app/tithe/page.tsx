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
import Link from "next/link";
import React from "react";

type Props = {};

const TitheAnalysis = (props: Props) => {
  return (
    <div className="min-h-screen px-6 py-8 flex flex-col gap-6">
      <div className="w-full flex items-center justify-end gap-3">
        <Link href={"/tithe/add"}>
          <Button type="button" variant="link">
            Add Tithe for this month
          </Button>
        </Link>
        <Link href={"/tithe/add-offering"}>
          <Button variant="link">Add this week's offertory</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tithes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">New Tithers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+10</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Offering
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,543.78</div>
            <p className="text-xs text-muted-foreground">since last year</p>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Tithers
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">220</div>
            <p className="text-xs text-muted-foreground"> since last year</p>
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
          description="Tithes over the past three months"
          title="Tithes"
          averageMesage="Average monthly tithe"
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

export default TitheAnalysis;
