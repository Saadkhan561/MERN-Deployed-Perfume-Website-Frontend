import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout";
import useCartStore from "@/store/cart";
import { useRouter } from "next/router";
import CartItem from "@/components/cartComponents/cartItems";
import CartItemDetails from "@/components/cartComponents/cartItemDetails";
import Link from "next/link";
import Image from "next/image";
import Meta from "@/components/metaTags/meta";

const Cart = () => {
  const [isClient, setIsClient] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const { cart } = useCartStore();
  const cartLength = Object.keys(cart).length;

  const router = useRouter();


  useEffect(() => {
    const amount = Object.values(cart).reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
    setTotalAmount(amount);
    setIsClient(true);
  }, [cart]);

  if (!isClient) {
    return null;
  }

  return (
    <Layout>
      <Meta
        title="Your Cart - Perfume Shop"
        description="View the items in your cart and proceed to checkout to complete your purchase."
        keywords="perfume cart, shopping cart, perfume checkout"
      />
      <div className="flex flex-col items-center w-full">
        <div className="w-full h-[250px] relative">
          <Image
            src="/images/route_bg.jpg"
            alt="route_bg"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute top-0 w-full h-full left-0">
            <div className="flex flex-col gap-2 h-full text-white items-center justify-center">
              <p className="text-5xl font-semibold">My Cart</p>
              <div className="flex items-center gap-2">
                <Link className="hover:underliner" href="/">
                  Home
                </Link>
                <p>&gt;</p>
                <Link className="hover:underliner" href="/categories">
                  Categories
                </Link>
                <p>&gt;</p>
                <Link className="hover:underliner" href="/products">
                  Products
                </Link>
                <p>&gt;</p> Cart
              </div>
            </div>
          </div>
        </div>
        <div className="flex cart:flex-col w-11/12 h-screen mob_display:mt-10">
          <div className="p-4 cart:p-1 overflow-y-auto w-full cart:pb-10">
            <div className="flex flex-col gap-2 p-2">
              <div className="text-3xl p-1">Your Cart Items</div>
              {cartLength === 0 ? (
                <div className="flex flex-col gap-2">
                  <p className="text-lg">Your cart is empty</p>
                  <Link
                    className="p-1 text-sm font-semibold border-2 rounded-lg w-max"
                    href="/categories"
                  >
                    Back to shopping
                  </Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                  {Object.entries(cart).map(([itemKey, itemValue]) => (
                    <CartItem
                      key={itemKey}
                      itemKey={itemKey}
                      itemValue={itemValue}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="border-l cart:border-l-0 cart:border-t  border-slate-200 pt-14 p-4 cart:w-full w-4/5 cart:p-1 cart:pt-4">
            <div className="p-2 border border-slate-300  mt-4 rounded-lg">
              <div className="overflow-y-auto p-2">
                {Object.entries(cart).map(([key, value]) => (
                  <CartItemDetails key={key} value={value} />
                ))}
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <p className="font-semibold">Total Amount :</p>
                {totalAmount} Rs
              </div>
              {cartLength ? (
                <div className="w-full flex justify-end mt-5">
                  {" "}
                  <button
                    onClick={() => router.push("/checkout")}
                    className=" bg-black text-white text-base w-[200px] hover:bg-gray-700 hover:cursor-pointer duration-200 flex justify-center mob_display:text-sm p-1"
                  >
                    Proceed to checkout
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
