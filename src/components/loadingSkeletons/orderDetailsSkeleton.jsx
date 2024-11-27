import { Skeleton } from "../ui/skeleton";

const OrderDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 h-4/5">
      {/* Order Header */}
      <div className="flex justify-between md:flex-row flex-col items-start gap-2 md:items-center">
        <div>
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-6 w-40 bg-gray-300 mt-1" />
        </div>
        <div className="flex gap-4 items-center">
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <Skeleton className="h-6 w-32 bg-gray-300 rounded-lg" />
        </div>
      </div>

      {/* Delivery Details */}
      <div className="flex lg:flex-row flex-col gap-2">
        <div className="p-2 rounded-lg flex flex-col gap-2 bg-slate-100 w-full">
          <Skeleton className="h-6 w-40 bg-gray-300" />
          <Skeleton className="h-4 w-64 bg-gray-200 mt-1" />
          <Skeleton className="h-4 w-48 bg-gray-200 mt-1" />
        </div>
        <div className="flex gap-2 lg:flex-col flex-row w-full">
          <div className="bg-slate-100 rounded-lg p-2 w-full">
            <Skeleton className="h-5 w-5 bg-gray-300 mb-2" />
            <Skeleton className="h-4 w-40 bg-gray-200" />
            <Skeleton className="h-4 w-32 bg-gray-200 mt-1" />
          </div>
          <div className="bg-slate-100 rounded-lg p-2 w-full">
            <Skeleton className="h-5 w-5 bg-gray-300 mb-2" />
            <Skeleton className="h-4 w-40 bg-gray-200" />
            <Skeleton className="h-4 w-32 bg-gray-200 mt-1" />
          </div>
        </div>
      </div>

      {/* Cart Items Section */}
      <p className="text-lg font-semibold">Cart Items :</p>
      <div className="flex gap-2 md:flex-wrap md:flex-row flex-col bg-slate-100 p-2 h-[380px] sm:h-[400px] lg:h-[340px] rounded-lg overflow-y-auto">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 p-2 border rounded-lg w-full md:w-[calc(50%-1rem)] bg-gray-100"
          >
            <Skeleton className="h-16 w-full bg-gray-300 rounded-lg" />
            <Skeleton className="h-4 w-40 bg-gray-200" />
            <Skeleton className="h-4 w-32 bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
