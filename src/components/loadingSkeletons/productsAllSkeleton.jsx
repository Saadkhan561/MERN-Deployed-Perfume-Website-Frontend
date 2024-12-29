import React from "react";
import { Skeleton } from "../ui/skeleton";

const AllProductsSkeleton = () => {
  return (
    <div className="w-11/12 p-4 flex flex-col gap-4">
      <div className="flex sm:items-center sm:flex-row sm:justify-between flex-col items-start">
        <Skeleton className="h-8 sm:w-1/5 w-40 rounded-md mb-4 sm:mb-0" />
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>
      <div className="flex flex-wrap gap-2">
        {[...Array(6)].map((_, i) => (
          <div className="w-[220px] relative flex flex-col gap-2 mob_display:w-[180px] mob_display_product:w-[220px]">
            <Skeleton className="flex justify-center pb-10 h-[300px]" />
            <Skeleton className="w-3/5 p-2" />
            <div className="flex justify-between items-center">
              <Skeleton className="p-2 w-[50px]" />
              <Skeleton className="p-2 w-[50px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsSkeleton;
