import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React from "react";
import { useRouter } from "next/router";
import PaymentOption from "@/components/paymentOption";
import SideBar from "@/components/common/side-bar";
import Link from "next/link";
import { Bounce, ToastContainer } from "react-toastify";
import { useFetchAllCategories } from "@/hooks/query";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/store/cart";
import Image from "next/image";
import Whatsapp from "@/icons/whatsapp";

const Layout = ({ children }) => {
  const router = useRouter();

  const { data: categories } = useFetchAllCategories();

  const pathName = router.asPath.split("/");

  const { cart } = useCartStore();

  const sendMsg = () => {
    const url = "https://wa.me/923322966011?text=Hello"
    router.push(url)
  }
  return (
    <div className="w-full h-sreen relative overflow-x-hidden font-sans">
      <ToastContainer
        position="top-center"
        transition={Bounce}
        autoClose={1000}
        hideProgressBar={true}
      />
      <div className="fixed bottom-14 right-14 z-20 flex flex-col gap-2">
        {pathName.includes("checkout") || pathName.includes("cart") ? null : (
          <button
            onClick={() => router.push("/cart")}
            className="mob_display:block hidden p-2 bg-white rounded-full border-2"
          >
            <ShoppingCart
              size={30}
              color="black"
              className=""
            />
            <p className="absolute -top-4 -right-2 bg-black text-white p-1 text-sm rounded-lg">
              {Object.keys(cart).length}
            </p>
          </button>
        )}
        <button onClick={() => sendMsg()} className="p-2 rounded-full border-2 bg-white">
          <Whatsapp />
        </button>
      </div>
      <div
        className={
          Boolean(router.query.sideBar) || Boolean(router.query.payment)
            ? "flex flex-col min-h-screen relative opacity-25 duration-200"
            : "flex flex-col   min-h-screen relative duration-20"
        }
      >
        <div className="flex flex-col items-center  bg-white fixed top-0 left-0 z-30 w-full h-20">
          <div className="border-b border-slate-400 w-full flex justify-center">
            <Navbar />
          </div>
          <div className="flex justify-center bg-white w-full h-max p-4 ">
            <ul className="flex items-center gap-4 uppercase sm:text-base text-sm">
              <Link
                className="hover:border-b border-slate-500 duration-100"
                href="/"
              >
                Home
              </Link>
              <Link
                className="hover:border-b border-slate-500 duration-100"
                href="/categories"
              >
                Categories
              </Link>
              {categories?.map((category) => (
                <Link
                  key={category._id}
                  href={`/products?id=${category._id}`}
                  className="hover:border-b border-slate-500 duration-100"
                >
                  {category.name}
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-center mt-24">{children}</div>
        <Footer />
      </div>

      {/* DIVS THAT WILL BE DISPLAYING OVER LAYOUT */}
      {router.query.payment && (
        <div className="absolute top-0">
          <PaymentOption />
        </div>
      )}
      <SideBar />
    </div>
  );
};

export default Layout;
