import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFetchProductImages } from "@/hooks/query";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

const Card = ({ product, category }) => {
  const { data } = useFetchProductImages({
    category,
    productName: product.name,
  });

  const router = useRouter();
  const [stockMsg, setStockMsg] = useState(null);

  useEffect(() => {
    let isOutOfStock = true;

    Object.entries(product.options).forEach(([option, value]) => {
      if (value.quantityAvailable > 0) {
        isOutOfStock = false;
      }
    });

    if (isOutOfStock) {
      setStockMsg("Out of stock");
    } else {
      setStockMsg(null);
    }
  }, [product]);

  // const ImageWithFallback = ({ src, fallbackSrc, alt, ...props }) => {
  //   const [imgSrc, setImgSrc] = useState(src);
  //   const [isLoaded, setIsLoaded] = useState(false);

  //   return (
  //     <div className="relative">
  //       {/* Loader */}
  //       {!isLoaded && (
  //         <div className="h-full w-full flex justify-center items-center">
  //           <ClipLoader size={30} />
  //         </div>
  //       )}
  //       {/* Image */}
  //       <Image
  //         src={imgSrc}
  //         alt={alt}
  //         onLoad={() => setIsLoaded(true)}
  //         onError={() => setImgSrc(fallbackSrc)}
  //         {...props}
  //       />
  //     </div>
  //   );
  // };

  return (
    <>
      {/* CARD DIV */}
      <div
        onClick={() => router.push(`/products/${product?._id}`)}
        className="w-[220px] relative mob_display:w-[180px] mob_display_product:w-[220px] cursor-pointer hover:scale-105 duration-100 group hover:shadow-lg"
      >
        <div className="flex justify-center pb-10 h-[350px]">
          <Image
            className="group-hover:opacity-90 duration-200 border rounded-lg p-1"
            src={`data:image/jpeg;base64,${data && data[0]}`}
            alt="Luxury perfume bottle with a floral scent"
            height={900}
            width={1600}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            priority
          />
          {/* <ImageWithFallback
            src={`data:image/jpeg;base64,${data && data[0]}`}
            // fallbackSrc="/favicon.jpg"
            // alt="Luxury perfume bottle with a floral scent"
            height={900}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            width={1600}
          /> */}
        </div>
        <div className="p-2 flex flex-col gap-1">
          <p className="font-semibold text-lg">{product?.name}</p>
          {Object.entries(product?.options)
            .slice(0, 1)
            .map(([option, value]) => (
              <div
                key={option}
                className="flex text-gray-700 text-xs font-semibold justify-between"
              >
                {value.discount !== 0 ? (
                  <div className="flex gap-2">
                    <p className="line-through text-gray-500">
                      Rs. {value.price}
                    </p>
                    <p className="font-semibold">
                      Rs. {value.price - value.price * (value.discount / 100)}
                    </p>
                  </div>
                ) : (
                  <p>Rs. {value.price}</p>
                )}
                <p>({option} ml)</p>
              </div>
            ))}
          <p className="text-red-500 text-sm font-semibold">{stockMsg}</p>
          {Object.entries(product.options).map(([option, value]) =>
            value.discount !== 0 ? (
              <p
                key={option}
                className="absolute top-5 right-2 p-1 text-sm text-white bg-red-600 rounded-lg"
              >
                Sale
              </p>
            ) : null
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
