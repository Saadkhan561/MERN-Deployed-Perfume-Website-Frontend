import React, { useEffect } from "react";
import Link from "next/link";
import useCartStore from "@/store/cart";
import Layout from "@/layout/layout";
import Image from "next/image";
import { useRouter } from "next/router";
import Meta from "@/components/metaTags/meta";

const Success = () => {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  const router = useRouter();
  const orderId = router.query.orderId;

  return (
    <div className="flex justify-center items-center w-full h-screen font-sans">
      <Meta
        title="Order Success - Perfume Shop"
        description="Thank you for your order! Your perfume will be delivered soon."
        keywords="order success, thank you, perfume purchase"
      />
      <div className="flex flex-col gap-2 items-center rounded-lg border-2 h-max p-8 shadow-2xl">
        <Image src="/images/success.png" alt="" height={80} width={80} />
        <div className="flex flex-col items-center gap-1">
          <p className="text-3xl font-semibold">
            Thank you for placing your order!
          </p>
          <p className="font-semibold text-gray-500">
            Your ORDER ID is #{orderId}.
          </p>
          <p className="font-semibold text-gray-500">
            You will receive your order in 5-7 working days.
          </p>
        </div>
        <button
          className="p-1 border-2 rounded-lg"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
