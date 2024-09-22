"use client";

import { Person } from "@/lib/data";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Person>[] = [
  { accessorKey: "picture", header: "Picture" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "dob", header: "DoB" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "mobile", header: "Contact" },
  { accessorKey: "occupation", header: "Occupation" },
  { accessorKey: "ghanaCardID", header: "ghanaCardID" },
  { accessorKey: "residentialAddress", header: "Address" },
  { accessorKey: "maritalStatus", header: "Marital Status" },
  { accessorKey: "spouseName", header: "Spouse Name" },
  { accessorKey: "cell", header: "Cell" },
  { accessorKey: "contactPerson", header: "Contact Person" },
  { accessorKey: "Remarks", header: "Remarks" },
  { accessorKey: "numberOfChildren", header: "Number of Children" },
  {
    accessorKey: "numberOfOtherHouseholdMembers",
    header: "Other Household Members count",
  },
];
