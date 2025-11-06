"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => (
      <Link href={`/dashboard/orders/${row.original._id}`}>
        <p className="text-center">{row.original._id}</p>
      </Link>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <p className="text-center">{row.original.customer}</p>,
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p className="text-center">{row.original.products}</p>,
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => <p className="text-center">{row.original.totalAmount}</p>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => <p className="text-center">{row.original.createdAt}</p>,
  },
];
