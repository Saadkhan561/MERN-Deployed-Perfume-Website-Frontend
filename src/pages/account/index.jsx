import AddressForm from "@/components/forms/addressForm";
import AccountSkeleton from "@/components/loadingSkeletons/accountSkeleton";
import OrderDetail from "@/components/modals/orderDetailsModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useGetUserOrders } from "@/hooks/query";
import Layout from "@/layout/layout";
import useUserStore from "@/store/user";
import { Pencil } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Account = () => {
  const [limit, setLimit] = useState(5);
  const [addressForm, setAddressForm] = useState(false);
  const { currentUser } = useUserStore();

  const { data: orders, isLoading: isOrdersLoading } = useGetUserOrders(
    currentUser?.user?._id && {
      userId: currentUser?.user?._id,
      limit: limit,
    }
  );

  const router = useRouter();

  const clearQueryParam = () => {
    const updatedQuery = { ...router.query };
    delete updatedQuery.orderId;

    router.replace(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Layout>
      <div className="flex justify-center w-full">
        <div className=" w-full flex flex-col gap-10 h-full">
          <div className="w-full h-[250px] relative">
            <Image
              src="/images/route_bg.jpg"
              alt="route_bg"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-0 w-full h-full left-0">
              <div className="flex flex-col gap-2 h-full text-white items-center justify-center">
                <p className="text-5xl font-semibold">My account</p>
              </div>
            </div>
          </div>
          {/* <p className="text-5xl">My Account</p> */}
          <div className="flex justify-center">
            <div className="w-11/12 flex lg:flex-row flex-col-reverse lg:gap-0 gap-14">
              <div className="w-full">
                <div className="text-xl">My Order History</div>
                <div className="overflow-y-auto max-h-[430px] sm:p-4 p-2">
                  {isOrdersLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <AccountSkeleton key={index} />
                      ))
                    : orders?.orders?.map((order) => (
                        <div
                          className="border shadow-sm mt-4 border-slate-200  sm:p-4 p-2 rounded-lg flex flex-col gap-1"
                          key={order._id}
                        >
                          <p className="font-semibold">Order Id: {order._id}</p>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex gap-1">
                                <p>Date : </p>
                                <span className="font-normal">
                                  {moment(order.createdAt).format("MMM Do YY")}
                                </span>
                              </div>
                              <div className="flex gap-1 capitalize">
                                <p>Status : </p>
                                <span className="font-normal">
                                  {order.orderStatus}
                                </span>
                              </div>
                            </div>
                            <Dialog
                              onOpenChange={(isOpen) => {
                                if (!isOpen) {
                                  clearQueryParam();
                                }
                              }}
                            >
                              <DialogTrigger>
                                <button
                                  onClick={() =>
                                    router.push(
                                      `?orderId=${order._id}`,
                                      undefined,
                                      {
                                        shallow: true,
                                      }
                                    )
                                  }
                                  className="text-center bg-black text-white font-normal px-2 rounded-lg p-1"
                                >
                                  View Details
                                </button>
                              </DialogTrigger>
                              <OrderDetail clearQueryParam={clearQueryParam} />
                            </Dialog>
                          </div>
                        </div>
                      ))}
                </div>
                <div className="w-full text-center">
                  {orders?.load && (
                    <button
                      onClick={() => setLimit(limit + 5)}
                      className="w-max text-center rounded-lg p-1 border-2"
                    >
                      Load more...
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col items-start lg:items-end gap-2 md:ml-10 lg-0">
                <div className="flex flex-col gap-2">
                  <p className="text-3xl  mb-5">Account Details</p>
                  <p className="text-lg">
                    {currentUser?.user.first_name} {currentUser?.user.last_name}
                  </p>
                  {addressForm ? (
                    <AddressForm
                      setAddressForm={setAddressForm}
                      addressForm={addressForm}
                    />
                  ) : currentUser?.user.address ? (
                    <div>
                      <p>{currentUser.user.city}</p>
                      <div className="flex gap-2 items-center">
                        <p>Address: </p>
                        <p>{currentUser.user.address}</p>
                        <Pencil
                          onClick={() => setAddressForm(!addressForm)}
                          className="h-4 w-4 cursor-pointer"
                        />
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAddressForm(!addressForm)}
                      className="p-1 rounded-lg border-2 border-black text-center"
                    >
                      Add address
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
