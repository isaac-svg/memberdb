"use client";
import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { File, ListFilter, PlusCircle } from "lucide-react";
import DataTable from "@/components/tables/user-table";
import { columns } from "@/components/tables/column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLiveQuery } from "dexie-react-hooks";
import { db, Member } from "@/models/db";
import { exportTableAsCSV } from "@/lib/functions";
import Link from "next/link";

type Props = {};

const MembersPage = (prop: Props) => {
  const [data, setData] = useState<Member[] | undefined>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      const members = await db.chmembers.toArray();
      setData(members);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        {/* You can use any spinner/loading component or text here */}
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!data?.length) return "Empty";

  return (
    <div className="scroll-triger">
      <Tabs defaultValue="adult" className="p-6">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="adult">Adult</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="Leaders" className="hidden sm:flex">
              Leaders
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button
              onClick={() => exportTableAsCSV(data)}
              size="sm"
              variant="outline"
              className="h-7 gap-1"
            >
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Link href={"/register-member"}>
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Member
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value="adult" className="mt-8 ">
          <DataTable columns={columns} data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MembersPage;
