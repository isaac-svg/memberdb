"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  CalendarIcon,
  UserPlusIcon,
  DownloadIcon,
  SearchIcon,
  LucideProps,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WeeklyStat from "@/components/sections/weekly-stat";
import MonthlyStat from "@/components/sections/monthly-stat";
import ServiceStat from "@/components/sections/service-stat";

export default function Dashboard() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-muted/40 p-8 first-line:">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-muted-foreground mb-2">
            Welcome, Admin
          </h1>
          <p className="text-gray-600">
            {currentDate} | {currentTime}
          </p>
        </header>
        <div className="flex w-full  gap-3  justify-end my-4 border-b-background border-b-[1px] py-3 ">
          <Link href={"/register-member"}>
            <Button className="gap-2">
              Add Member <UserPlusIcon size={18} />
            </Button>
          </Link>
          <Link href={"/export-data"}>
            <Button className="gap-2">
              Export Data <DownloadIcon size={18} />
            </Button>
          </Link>
          <>
            <Button className="gap-2">
              Calender <CalendarIcon size={18} />
            </Button>
          </>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <WeeklyStat />
          <MonthlyStat />
          <ServiceStat />
        </div>
      </div>
    </div>
  );
}
