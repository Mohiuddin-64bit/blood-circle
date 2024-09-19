"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MessageSquareText, MoreHorizontal, Phone } from "lucide-react";
import StatusBadge from "../StatusBadge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Donner = {
  id: string;
  name: string;
  age: number;
  phone: string;
  bloodGroup: string;
  location: string;
};

export const columns: ColumnDef<Donner>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <p className="text-14-medium">{row.original.name}</p>,
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => <p className="text-14-medium">{row.original.age}</p>,
  },
  {
    accessorKey: "bloodGroup",
    header: "Blood",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.bloodGroup}</p>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.location}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status="active" />
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 ">
        <div className="dot-border rounded-xl hover:bg-dark-200 transition-all">
          <Phone />
        </div>
        <div className="dot-border rounded-xl hover:bg-dark-200 transition-all">
          <MessageSquareText />
        </div>
      </div>
    ),
  },
];
