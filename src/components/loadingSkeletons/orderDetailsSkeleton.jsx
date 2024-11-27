import { Skeleton } from "../ui/skeleton";

const OrderDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 h-max">
      <div className="flex justify-between md:flex-row flex-col items-start gap-2 md:items-center">
        <div className="flex flex-col gap-1 w-1/2">
          <Skeleton className="h-4 bg-gray-200" />
          <Skeleton className="h-3 w-2/3 bg-gray-200" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-2">
        <div className="p-2 rounded-lg flex flex-col gap-2 w-full bg-gray-100">
          <Skeleton className="h-6 w-36 bg-gray-200" />
          <Skeleton className="h-4 w-32 bg-gray-200" />
          <Skeleton className="h-4 w-32 bg-gray-200" />
        </div>
        <div className="flex gap-2 lg:flex-col flex-row w-full">
          <div className="p-2 rounded-lg flex flex-col gap-2 w-full bg-gray-100">
            <Skeleton className="h-6 w-1/2 sm:w-36 bg-gray-200" />
            <Skeleton className="h-4 w-1/3 sm:w-32 bg-gray-200" />
            <Skeleton className="h-4 w-1/3 sm:w-32 bg-gray-200" />
          </div>{" "}
          <div className="p-2 rounded-lg flex flex-col gap-2 w-full bg-gray-100">
            <Skeleton className="h-6 w-1/2 bg-gray-200" />
            <Skeleton className="h-4 w-1/3 bg-gray-200" />
            <Skeleton className="h-4 w-1/3 bg-gray-200" />
          </div>
        </div>
      </div>
      <Skeleton className="h-6 bg-gray-200" />
      <div className="grid grid-cols-2 gap-2 w-full">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full bg-gray-200" />
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
