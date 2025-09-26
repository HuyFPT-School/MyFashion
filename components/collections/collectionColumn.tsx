"use client";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/delete";
import Image from "next/image";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <p className="text-center">{row.original.title}</p>,
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p className="text-center">{row.original.products.length}</p>,
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
        />
      </p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete id={row.original._id} />,
  },
];
