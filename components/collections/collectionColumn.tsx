"use client";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/delete";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/dashboard/collections/${row.original._id}`}>
        <p className="text-center">{row.original.title}</p>
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => (
      <p className="text-center">{row.original.products.length}</p>
    ),
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => (
      <p className="flex justify-center items-center">
        <Image
          src={row.original.image}
          alt={row.original.title}
          width={100}
          height={100}
          className="rounded-md object-cover text-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="collection" id={row.original._id} />,
  },
];
