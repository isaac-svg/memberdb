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
  const members = useLiveQuery(() => db.chmembers.toArray());
  const count = useLiveQuery(() => db.chmembers.count());

  const [data, setData] = useState<Member[] | undefined>([]);
  useEffect(() => {
    // setData(members);
    console.log(members, "members");
    console.log(data, "data");
    console.log(count, "count ");
    !(async () => {
      setData(await db.chmembers.toArray());
    })();
    console.log(data, "data");
  }, []);

  if (!data?.length) return "Empty";

  return (
    <>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        <TabsContent value="adult" className="">
          <DataTable columns={columns} data={data} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default MembersPage;
