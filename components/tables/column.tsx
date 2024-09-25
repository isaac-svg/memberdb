"use client";

import { Person } from "@/lib/data";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Member } from "@/models/db";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<Member>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "picture",
    header: "Picture",
    cell: ({ row }) => (
      <Link href={`/member/?id=${row.original.id}`}>
        <img
          className="aspect-square rounded-md object-cover"
          src={row.original.picture ?? "/images/placeholder.svg"}
          alt={row.original.name}
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      </Link>
    ),
  },
  {
    accessorKey: "name",
    // header: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dob",
    // header: "DoB",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DoB
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "gender",
    // header: "Gender",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gender
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  { accessorKey: "mobile", header: "Contact" },
  { accessorKey: "occupation", header: "Occupation" },
  { accessorKey: "ghanaCardID", header: "ghanaCardID" },
  { accessorKey: "residentialAddress", header: "Address" },
  {
    accessorKey: "maritalStatus",
    // header: "Marital Status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Marital Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  { accessorKey: "spouseName", header: "Spouse Name" },
  { accessorKey: "cell", header: "Cell" },
  { accessorKey: "contactPerson", header: "Contact Person" },
  { accessorKey: "Remarks", header: "Remarks" },
  { accessorKey: "numberOfChildren", header: "Number of Children" },
  {
    accessorKey: "numberOfOtherHouseholdMembers",
    header: "Other Household Members count",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                member?.mobile && navigator.clipboard.writeText(member?.mobile)
              }
            >
              Copy mobile number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/member/?id=${member.id}`}>View Full Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>View Location</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
