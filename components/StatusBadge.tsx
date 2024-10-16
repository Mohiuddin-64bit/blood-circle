import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "active",
        "bg-red-600": status === "inactive",
        "bg-gray-600": status === "unknown", // Add a class for 'unknown' status
      })}
    >
      <Image
        className="h-fit w-3"
        src={StatusIcon[status]}
        height={24}
        width={24}
        alt={status}
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-white": status === "active",
          "text-red-500": status === "inactive",
          "text-gray-500": status === "unknown", // Add a text color for 'unknown' status
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
