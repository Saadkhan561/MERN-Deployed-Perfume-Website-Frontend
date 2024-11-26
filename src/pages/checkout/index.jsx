import { useRouter } from "next/router";
import { React, useState, useEffect } from "react";
import { usePlaceOrder, useSignupMutation } from "@/hooks/mutation";
import useCartStore from "@/store/cart";
import useUserStore from "@/store/user";

// FORM IMPORTS
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CartItemDetails from "@/components/cartComponents/cartItemDetails";
import Layout from "@/layout/layout";
import {
  ArrowLeft,
  ChevronLeft,
  House,
  Mail,
  MapPinHouse,
  Phone,
  User,
} from "lucide-react";
import { deliverySchema } from "@/schema/orderSchema";
import { MoonLoader } from "react-spinners";
import Meta from "@/components/metaTags/meta";
import Link from "next/link";

const Checkout = () => {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const { currentUser } = useUserStore();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const amount = Object.values(cart).reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
    setTotalAmount(amount);
  }, [cart]);

  // MUTATION TO CREATE USER ACCOUNT
  const { mutate: user, isPending: isUserPending } = useSignupMutation({
    onSuccess(data) {
      console.log(data);
      const resultArray = Object.entries(cart).flatMap(([itemKey, value]) => {
        return Object.entries(value.options).map(([optionKey, optionValue]) => {
          return {
            product: itemKey,
            quantity: optionValue.quantity,
            option: optionKey,
            price: optionValue.price,
          };
        });
      });
      const customer_id = data.user._id;
      const formValues = getValues();
      const newOrder = {
        customer: customer_id,
        products: resultArray,
        totalAmount: totalAmount,
        shippingAddress: { city: formValues.city, address: formValues.address },
      };
      placeOrder(newOrder);
    },
    onError(error) {
      console.log(error);
      toast.error(error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    },
  });

  const { mutate: placeOrder, isPending: isOrderPending } = usePlaceOrder({
    onSuccess(data) {
      reset();
      clearCart();
      setTimeout(() => {
        router.push(`/success?orderId=${data.order._id}`);
      }, 2000);
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    city: "",
    address: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    values: initialValues,
    resolver: yupResolver(deliverySchema),
  });

  const onSubmit = (data) => {
    if (currentUser) {
      const resultArray = Object.entries(cart).flatMap(([itemKey, value]) => {
        return Object.entries(value.options).map(([optionKey, optionValue]) => {
          return {
            product: itemKey,
            quantity: optionValue.quantity,
            option: optionKey,
            price: optionValue.price,
          };
        });
      });
      const customer_id = currentUser.user._id;
      const newOrder = {
        customer: customer_id,
        products: resultArray,
        totalAmount: totalAmount,
        shippingAddress: data,
      };
      placeOrder(newOrder);
    } else {
      const { city, address, ...updatedUser } = data;
      updatedUser["isGuest"] = true;
      user(updatedUser);
    }
  };

  return (
    <Layout>
      <Meta
        title="Checkout - Perfume Shop"
        description="Complete your purchase and enjoy your luxurious new perfume."
        keywords="perfume checkout, purchase, perfume shop"
      />
      <div className="flex justify-center items-center w-full h-full">
        {" "}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" rounded-lg p-8 h-full sm:w-11/12 w-full"
        >
          <Link href="/cart" className="flex gap-2 items-center font-semibold">
            <ArrowLeft size={15} />
            Back to cart
          </Link>

          <div className="grid sm:grid-cols-2 grid-rows-2 sm:gap-8 gap-20 sm:mt-6 mt-8">
            <div>
              <div className="text-3xl text-center mb-6 font-semibold">
                Delivery Details
              </div>
              <div
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-rows-2 gap-2"
              >
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      className="text-sm  register_mini_div:text-xs  text-slate-500"
                      htmlFor="first_name"
                    >
                      Enter first name
                    </label>
                    <div className="cart_input_field">
                      <input
                        className="w-full focus:outline-none"
                        type="text"
                        id="first_name"
                        placeholder="First name"
                        {...register("first_name")}
                      />
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    {errors.first_name && (
                      <p className="text-red-500 text-xs">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      className="text-sm  register_mini_div:text-xs  text-slate-500"
                      htmlFor="last_name"
                    >
                      Enter last name
                    </label>
                    <div className="cart_input_field">
                      <input
                        className="w-full focus:outline-none"
                        type="text"
                        id="last_name"
                        placeholder="Last name"
                        {...register("last_name")}
                      />
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    {errors.last_name && (
                      <p className="text-red-500 text-xs">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    className="text-sm register_mini_div:text-xs text-slate-500"
                    htmlFor="email"
                  >
                    Enter your email
                  </label>
                  <div className="cart_input_field">
                    <input
                      className="w-full focus:outline-none"
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      {...register("email")}
                    />
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm  register_mini_div:text-xs text-slate-500"
                    htmlFor="ph_no"
                  >
                    Enter Phone No.
                  </label>
                  <div className="cart_input_field">
                    <input
                      className="w-full focus:outline-none"
                      type="number"
                      id="ph_no"
                      placeholder="Enter phone no."
                      {...register("phone")}
                      onChange={(e) => e.preventDefault()}
                    />
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    className="text-sm register_mini_div:text-xs text-slate-500"
                    htmlFor="address"
                  >
                    Enter your address
                  </label>
                  <div className="cart_input_field">
                    <input
                      className="w-full focus:outline-none"
                      type="text"
                      placeholder="Enter address"
                      {...register("address")}
                    />
                    <MapPinHouse className="h-4 w-4 text-gray-400" />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-xs">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    className="text-sm register_mini_div:text-xs text-slate-500"
                    htmlFor="address"
                  >
                    Enter your city
                  </label>
                  <div className="cart_input_field">
                    <input
                      className="w-full focus:outline-none"
                      type="text"
                      placeholder="Enter address"
                      {...register("city")}
                    />
                    <House className="h-4 w-4 text-gray-400" />
                  </div>
                  {errors.city && (
                    <p className="text-red-500 text-xs">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 sm:justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-semibold">Item details</p>
                {Object.entries(cart).map(([key, value]) => (
                  <CartItemDetails key={key} value={value} />
                ))}
                <div className="mt-5 flex justify-end gap-2">
                  <p className="font-semibold">Total Amount :</p>
                  {totalAmount} Rs
                </div>
              </div>
              <div className="flex gap-2 sm:flex-row flex-col items-center w-full">
                <button
                  type="submit"
                  disabled={
                    isOrderPending ||
                    isUserPending ||
                    Object.keys(cart).length === 0
                  }
                  className={` bg-black text-white text-base w-full font-semibold duration-200 flex justify-center mob_display:text-sm p-1 ${
                    Object.keys(cart).length === 0
                      ? "opacity-50 "
                      : "hover:bg-gray-700  hover:cursor-pointer "
                  }`}
                >
                  {isOrderPending || isUserPending ? (
                    <MoonLoader size={15} color="white" />
                  ) : (
                    "Place Order"
                  )}
                </button>
                <button
                  onClick={() => router.push("/cart")}
                  type="button"
                  className=" bg-red-500 text-white text-base w-full font-semibold  hover:bg-red-600 hover:cursor-pointer duration-200 flex justify-center mob_display:text-sm p-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
