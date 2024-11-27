import React from "react";
import { Skeleton } from "../ui/skeleton";

const AccountSkeleton = () => {
  return (
    <div className="border shadow-sm mt-4 text-sm border-slate-200 sm:p-4 p-2 rounded-lg flex justify-between items-center">
      <div className="flex justify-between items-center w-full">
        <Skeleton className="h-6 w-3/4 bg-gray-200 rounded-lg" />
        <Skeleton className="h-8 w-[100px] bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
};

export default AccountSkeleton;
