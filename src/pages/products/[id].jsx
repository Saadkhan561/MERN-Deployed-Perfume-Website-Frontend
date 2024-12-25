import Layout from "@/layout/layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Card from "@/components/cards/product-card";
import {
  useFetchProductById,
  useFetchAllProducts,
  useFetchProductImages,
} from "@/hooks/query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useCartStore from "@/store/cart";

// FOR SLIDERS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Minus, Plus } from "lucide-react";
import ProductDetailsSkeleton from "@/components/loadingSkeletons/productDetailsSkeleton";
import Meta from "@/components/metaTags/meta";

const ProductDetails = () => {
  const [counter, setCounter] = useState(1);
  const [skip, setSkip] = useState(0);
  const [amount, setAmount] = useState(null);
  const [incMsg, setIncMsg] = useState(null);
  const router = useRouter();

  const id = router.query.id;
  const { data: product, isLoading: isProductLoading } =
    useFetchProductById(id);

  useEffect(() => {
    if (product) {
      setAmount(Object.keys(product?.options)[0]);
    }
  }, [product]);

  const categoryId = product?.category;
  const { data: products, isLoading: isProductsLoading } = useFetchAllProducts(
    categoryId
      ? {
          categoryId: categoryId,
          skip: skip,
        }
      : null
  );
  const { data: productImages } = useFetchProductImages({
    category: product?.categoryDetails.name,
    parentCategory: product?.categoryDetails?.parentCategoryDetails?.name,
    productName: product?.name,
  });

  const { addItem, cart } = useCartStore();

  const incrementCounter = () => {
    if (!getValues().amount) {
      setError("amount", { message: "Amount is required" });
      return;
    }

    if (product?.options[amount].quantityAvailable === counter) {
      return counter;
    } else if (
      (Object.keys(cart).length &&
        cart[id] &&
        cart[id].options[amount] &&
        cart[id]?.options[amount].quantity ===
          product?.options[amount].quantityAvailable) ||
      (Object.keys(cart).length &&
        cart[id] &&
        cart[id].options[amount] &&
        counter ===
          cart[id]?.options[amount].quantityAvailable -
            cart[id]?.options[amount].quantity)
    ) {
      setIncMsg("You have already added all available items in your cart");
    } else {
      setError("amount", { message: "" });
      setIncMsg(null);
      setCounter(counter + 1);
    }
  };
  const decrementCounter = () => {
    if (counter === 1) {
      return counter;
    } else {
      setCounter(counter - 1);
    }
  };


  const initialValues = {
    amount: null,
  };

  const productSchema = yup.object({
    amount: yup.string().required("Amount is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
  } = useForm({
    values: initialValues,
    resolver: yupResolver(productSchema),
  });
  const onSubmit = (data) => {
    const val = cart[id]?.options[amount];
    if (
      counter > val?.quantityAvailable - val?.quantity ||
      counter === val?.quantityAvailable
    ) {
      setIncMsg("You have exceeded the stock limit");
    } else {
      addItem(
        {
          ...product,
          quantity: counter,
          amount: parseInt(data.amount),
        },
        product._id
      );
      setIncMsg(null);
    }
  };

  // FOR SLIDER
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: false,
    prevArrow: false,
  };

  return (
    <Layout>
      <Meta
        title={`${product?.name} - Perfume Shop`}
        description={`Discover ${product?.name} - ${product?.description}`}
        keywords={`${product?.categoryDetails.name}, perfume`}
        // image={product.image}
        // url={`https://yourwebsite.com/products/${query.id}`}
      />
      {isProductLoading ? (
        <ProductDetailsSkeleton />
      ) : (
        <div className="w-11/12 mob_display:w-full flex flex-col gap-28 h-full">
          <div className="flex flex-col mt-8 duration-200">
            {/* DETAILS DIV */}
            <div className="flex items-center gap-4 mob_display:flex-col mob_display_product:gap-6">
              <div className="w-full">
                <div className="flex justify-center  mob_display:pt-0 w-full">
                  {productImages?.length === 1 ? (
                    <Image
                      className="aspect-square object-contain"
                      src={`data:image/jpeg;base64,${productImages}`}
                      alt={`Product Image 1`}
                      height={400}
                      width={400}
                    />
                  ) : (
                    <Slider
                      className="w-[400px] h-[400px] mob_display:h-[250px] mob_display:w-[250px]"
                      {...settings}
                    >
                      {productImages?.map((base64Image, index) => (
                        <Image
                          key={index}
                          className="aspect-square object-contain"
                          src={`data:image/jpeg;base64,${base64Image}`}
                          alt={`Product Image ${index + 1}`}
                          height={400}
                          width={400}
                        />
                      ))}
                    </Slider>
                  )}
                </div>
              </div>
              {/* PRODUCT DETAILS DIV */}
              {product && product.options[amount] && (
                <div className="flex flex-col gap-3 w-full mob_display:w-11/12">
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="text-3xl mob_display:text-xl">
                        {product.name}
                      </p>
                      {product.options[amount].discount !== 0 && (
                        <p className="text-red-500 font-semibold">
                          {product.options[amount].discount} % Off
                        </p>
                      )}
                    </div>
                    <div className="text-lg  text-slate-600 mob_display:text-base flex flex-col">
                      {product.options[amount].discount !== 0 ? (
                        <div className="flex gap-2 items-center">
                          <div className="flex gap-1 font-semibold">
                            <p>
                              {product.options[amount].price -
                                (product.options[amount].price *
                                  product.options[amount].discount) /
                                  100}
                            </p>
                            <p className="test-md">/Rs</p>
                          </div>
                          <div className="flex gap-1 line-through text-gray-500 text-sm">
                            <p>{product.options[amount].price}</p>
                            <p className="test-md">/Rs</p>
                          </div>{" "}
                        </div>
                      ) : (
                        <div className="flex gap-1 font-semibold">
                          <p>{product.options[amount].price}</p>
                          <p className="test-md">/Rs</p>
                        </div>
                      )}
                      <div className="text-sm">(For {amount}ml)</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xl mob_display:text-base">Description</p>
                    <p className="text-sm">{product.description}</p>
                  </div>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="flex flex-col gap-2">
                      <p className="mob_display:text-sm">Amout available</p>
                      <div className="flex gap-2 mob_display:text-sm">
                        {Object.entries(product.options).map(([key]) => (
                          <div key={key} className="flex justify-center">
                            <input
                              type="radio"
                              id={`option${key}`}
                              name="amount"
                              className="hidden peer"
                              value={key}
                              onClick={(e) => {
                                setAmount(e.target.value);
                                setCounter(1);
                              }}
                              {...register("amount")}
                            />
                            <label
                              className="text-black peer-checked:bg-black text-center pb-6 pt-1 rounded-md duration-200 peer-checked:text-white border border-black cursor-pointer w-[70px] h-[20px]"
                              htmlFor={`option${key}`}
                            >
                              {key}ml
                            </label>
                          </div>
                        ))}
                      </div>
                      {errors.amount && (
                        <p className="text-xs text-red-500">
                          {errors.amount.message}
                        </p>
                      )}
                    </div>
                    {product.options[amount].quantityAvailable === 0 ? (
                      <p className="text-red-500">Out of stock</p>
                    ) : (
                      <div>
                        <div className="text-gray-500 font-semibold mb-2">
                          Quantity
                        </div>
                        <div className="w-fit flex gap-4 p-1 pl-2 pr-2 border border-slate-300 items-center">
                          <button type="button">
                            <Minus
                              onClick={decrementCounter}
                              size={30}
                              color="black"
                              className="p-1 cursor-pointer"
                            />
                          </button>
                          <div className="text-lg">{counter}</div>
                          <button type="button">
                            {" "}
                            <Plus
                              onClick={incrementCounter}
                              size={30}
                              color="black"
                              className="p-1 cursor-pointer"
                            />
                          </button>
                        </div>
                        {incMsg && (
                          <p className="text-red-500 text-sm">{incMsg}</p>
                        )}
                        <div className="text-xs text-gray-500 font-semibold mt-2">
                          <p>
                            {" "}
                            Available :
                            {product.options[amount].quantityAvailable}
                          </p>
                        </div>
                      </div>
                    )}
                    <button
                      type="submit"
                      className={`bg-black text-white w-11/12 text-lg duration-200 flex justify-center mob_display:text-sm p-2 ${
                        product.options[amount].quantityAvailable === 0
                          ? "opacity-50"
                          : "hover:bg-gray-700 hover:cursor-pointer"
                      }`}
                      disabled={product.options[amount].quantityAvailable === 0}
                    >
                      Add to cart
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
          {/* RECOMMENDATIONS DIV */}
          <div className="w-11/12 flex flex-col">
            <div className="text-3xl mob_display_product:text-center">
              More Recommendations
            </div>
            <div className="flex gap-5 flex-wrap p-4 mt-8 mob_display_product:flex-col mob_display_product:items-center">
              {isProductsLoading ? (
                <div>Loading...</div>
              ) : (
                products?.products[0].products?.map((item) => (
                  <div key={item._id}>
                    <Card
                      id={item._id}
                      product={item}
                      category={item.categoryDetails.name}
                      parentCategory={
                        item.categoryDetails.parentCategoryDetails.name
                      }
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;
