"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "clerkId",
    header: "Clerk ID",
    cell: ({ row }) => (
      <p className="text-center">{row.original.clerkId}</p>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <p className="text-center">{row.original.name}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p className="text-center">{row.original.email}</p>,
  },
];
