"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, MessageSquareText, Phone } from "lucide-react";
import StatusBadge from "../StatusBadge";
import { calculateAge, calculateStatus } from "@/lib/utils";
import Link from "next/link";

export const columns: ColumnDef<RegisterDonnerParams>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <p className="text-14-medium">{`${row.original.firstName} ${row.original.lastName}`}</p>
    ),
  },
  {
    accessorKey: "birthDate",
    header: "Age",
    cell: ({ row }) => (
      <p className="text-14-medium">
        {calculateAge(row.original.birthDate)} years
      </p>
    ),
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
    cell: ({ row }) => <p className="text-14-medium">{row.original.address}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { lastDonationDate, gender } = row.original;
      const status = lastDonationDate
        ? calculateStatus(lastDonationDate, gender)
        : "active";
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 ">
        <Link
          href={`/profile/${row.original.$id}`}
          className="dot-border cursor-pointer rounded-xl hover:bg-dark-200 transition-all"
        >
          <Eye />
        </Link>
        <a href={`tel:${row.original.phone}`}>
          <div className="dot-border cursor-pointer rounded-xl hover:bg-dark-200 transition-all">
            <Phone />
          </div>
        </a>
        <a href={`sms:${row.original.phone}`}>
          <div className="dot-border cursor-pointer rounded-xl hover:bg-dark-200 transition-all">
            <MessageSquareText />
          </div>
        </a>
      </div>
    ),
  },
];
