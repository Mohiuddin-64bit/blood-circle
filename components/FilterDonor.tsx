/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { DataTable } from "./table/DateTable";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const FilterDonor = ({ data, columns }: any) => {
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const filtered = data.filter(
      (donor: any) =>
        donor?.bloodGroup?.toLowerCase().includes(query) ||
        donor?.address?.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <div className="grid w-full max-w-md me-auto gap-1.5">
        <Label htmlFor="search" className="shad-input-label">
          Search Bar
        </Label>
        <Input
          className="shad-input"
          id="search"
          placeholder="Search Donor by Blood Group, Location"
          onChange={handleSearch}
        />
      </div>
      <DataTable columns={columns} data={filteredData} />
    </>
  );
};

export default FilterDonor;
