"use client";
import {
  BarChartComponent,
  BarChartHorizontalComponent,
} from "@/components/charts/bar";
import {
  LineChartComponent,
  LineChartMultipleComponent,
} from "@/components/charts/line";
import AnalysisCard from "@/components/sections/analysis-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getActiveTithers,
  getOfferings,
  getTithersWithRange,
  getTotalTithes,
} from "@/lib/analytics";
import { getDate } from "@/lib/functions";
import {
  Activity,
  CreditCard,
  DollarSign,
  PlusCircle,
  UserPlus,
  Users,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const TitheAnalysis = (props: Props) => {
  const [{ percentageChange, total }, setTithe] = useState<{
    total: number;
    percentageChange: number;
  }>(getTotalTithes([1000, 2000, 1200], [2000, 4440, 2000]));
  const [newTithers, setNewTithers] = useState(0);

  const [prevMonthTithers, setPrevNewTithers] = useState(0);
  const [percentageTithersChange, setTithersPercentageChange] = useState(0);
  const [totalOfferings, setTotalOfferings] = useState(0);
  const [activeTithers, setActiveTithers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const a = await getTithersWithRange(getDate(4), getDate(1));
      setNewTithers((await getTithersWithRange(getDate(1), getDate(0))).length);
      setPrevNewTithers(
        (await getTithersWithRange(getDate(2), getDate(1))).length
      );
      console.log(getDate(1), getDate(0));
      setTithersPercentageChange(
        ((newTithers - prevMonthTithers) / prevMonthTithers) * 100
      );
      console.log(prevMonthTithers, "prevMonthTithers");
      setTotalOfferings(
        (await getOfferings()).reduce((curr, acc) => curr + acc.amount, 0)
      );
      setActiveTithers((await getActiveTithers("monthly")).length);
      setIsLoading(false);
    })();
  }, []);
  return (
    <div className="min-h-screen px-6 py-8 flex flex-col gap-6">
      <div className="w-full flex items-center justify-end gap-3">
        <Link href={"/tithe/add"}>
          <Button size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Tithe
            </span>
          </Button>
        </Link>
        <Link href={"/tithe/add-offering"}>
          <Button size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Offertory
            </span>
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {isLoading ? (
          <Skeleton className="h-[125px] w-[full] rounded-xl" />
        ) : (
          <AnalysisCard
            title="Total Tithes"
            Icon={DollarSign}
            value={total}
            description={`${percentageChange}% from last month`}
          />
        )}

        {isLoading ? (
          <Skeleton className="h-[125px] w-[full] rounded-xl" />
        ) : (
          <AnalysisCard
            title="New Tithers"
            Icon={UserPlus}
            value={newTithers}
            description={`${
              !Number.isNaN(percentageTithersChange)
                ? `${percentageTithersChange}% from last month`
                : ""
            }`}
          />
        )}

        {isLoading ? (
          <Skeleton className="h-[125px] w-[full] rounded-xl" />
        ) : (
          <AnalysisCard
            title="Total Ofering"
            Icon={DollarSign}
            value={totalOfferings}
            description="since last year"
          />
        )}

        {isLoading ? (
          <Skeleton className="h-[125px] w-[full] rounded-xl" />
        ) : (
          <AnalysisCard
            title="Active Tithers"
            Icon={Activity}
            value={activeTithers}
            description="since last year"
          />
        )}
      </div>
      <div className="flex w-full">
        {isLoading ? (
          <Skeleton className="h-[250px] w-[100%] rounded-xl" />
        ) : (
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
        )}
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
