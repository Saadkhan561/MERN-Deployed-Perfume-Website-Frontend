import { useFetchProductImages } from "@/hooks/query";
import Image from "next/image";
import React from "react";

const OrderItemCard = ({ product, productName, category }) => {
  const { data: productImages } = useFetchProductImages({
    category: category,
    productName: productName,
    parentCategory: product.parent_category_name,
  });

  return (
    <div className="p-2 rounded-lg border md:w-[250px] lg:w-[300px] w-full bg-white flex h-max gap-2 shadow-md">
      <div className="flex justify-center h-[100px] lg:h-[130px] xl:h-[150px] w-[100px] lg:w-[130px] xl:w-[150px]">
        <Image
          className="group-hover:opacity-90 duration-200 p-1"
          src={`data:image/jpeg;base64,${productImages && productImages[0]}`}
          alt={`Product Image`}
          height={900}
          width={1600}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <div>
        <p className="font-semibold text-sm md:text-lg">{product.name}</p>
        <p className="text-gray-500 text-xs md:text-sm"> Rs. {product.price}</p>
        <p className="text-gray-500 text-sm">({product.option} ml)</p>
      </div>
    </div>
  );
};

export default OrderItemCard;
