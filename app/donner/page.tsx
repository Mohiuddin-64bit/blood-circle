import Header from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DateTable";
import { getDonorStatusCounts, getRecentDonnerList } from "@/lib/actions/donar.action";
import React from "react";

const AllDonnerPage = async () => {
  const donner = await getRecentDonnerList();
  const { activeCount, inactiveCount, total } = await getDonorStatusCounts();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Header />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">All Donar 🩸</h1>
          <p className="text-dark-700">
            Here we can see all the Donar details.
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={total}
            label="Total Donner"
            description="Total number of donner in the system."
            icon={"/assets/icons/person.svg"}
          />
          <StatCard
            type="pending"
            label="Active Donner"
            count={activeCount}
            description="Donner who can donate blood now."
            icon={"/assets/icons/active.svg"}
          />
          <StatCard
            type="cancelled"
            label="Inactive Donner"
            count={inactiveCount}
            description="Donner who donated blood in last 4 months."
            icon={"/assets/icons/inactive.svg"}
          />
        </section>

        <DataTable columns={columns} data={donner.documents} />
      </main>
    </div>
  );
};

export default AllDonnerPage;
