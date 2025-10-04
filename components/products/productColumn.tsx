"use client";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/delete";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/dashboard/products/${row.original._id}`}>
        <p className="text-center">{row.original.title}</p>
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <p className="text-center">{row.original.category}</p>,
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => (
      <p className="text-center">
        {row.original.collections
          .map((collection) => collection.title)
          .join(", ")}
      </p>
    ),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => (
      <p className="text-center">{row.original.price.toString()}</p>
    ),
  },
  {
    accessorKey: "expense",
    header: "Expense ($)",
    cell: ({ row }) => <p className="text-center">{row.original.expense}</p>,
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => (
      <p className="flex justify-center items-center">
        {row.original.media && row.original.media.length > 0 ? (
          <Image
            src={row.original.media[0]}
            alt={row.original.title}
            width={100}
            height={100}
            className="rounded-md object-cover text-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <span className="text-gray-400">No image</span>
        )}
      </p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];
