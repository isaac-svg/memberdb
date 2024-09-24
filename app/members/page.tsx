"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import DataTable from "@/components/tables/user-table";
import { people } from "@/lib/data";
import { columns } from "@/components/tables/column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLiveQuery } from "dexie-react-hooks";
import { db, Member } from "@/models/db";
import { useRouter } from "next/navigation";

type Props = {
  // params: {id :string}
};
const getData = () => people;

const page = (prop: Props) => {
  const members = useLiveQuery(() => db.chmembers.toArray());
  const count = useLiveQuery(() => db.chmembers.count());

  const [data, setData] = useState<Member[] | undefined>([]);
  useEffect(() => {
    // setData(members);
    console.log(members, "members");
    console.log(data, "data");
    console.log(count, "count ");
    !(async () => {
      console.log(setData(await db.chmembers.toArray()), "PROMM");
    })();
  }, []);

  if (!data?.length) return "Empty";
  const {} = useRouter();

  const [member, setMember] = useState<Member | undefined>(undefined);
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
            <Button size="sm" variant="outline" className="h-7 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="adult" className="">
          <DataTable columns={columns} data={data} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default page;
