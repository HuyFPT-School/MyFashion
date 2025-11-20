"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => (
      <Link href={`/dashboard/products/${row.original.product._id}`}>
        <p className="text-center">{row.original.product.title}</p>
      </Link>
    ),
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => <p className="text-center">{row.original.color}</p>,
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => <p className="text-center">{row.original.size}</p>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <p className="text-center">{row.original.quantity}</p>,
  }
];
