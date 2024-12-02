import { useFetchProductImages } from "@/hooks/query";
import useCartStore from "@/store/cart";
import Link from "next/link";
import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import Image from "next/image";

const CartItem = ({ itemKey, itemValue }) => {
  const { data: productImage } = useFetchProductImages({
    category: itemValue?.categoryDetails.name,
    productName: itemValue?.name,
  });

  const { incrementQuantity, decrementQuantity, deleteItem } = useCartStore();

  return (
    <div
      key={itemKey}
      className=" flex flex-col w-full border border-slate-300 rounded-lg p-2 hover:border-slate-400 hover:shadow-sm transition duration-200"
    >
      <div className="flex justify-between p-2 duration-200 cursor-pointer">
        <div className="flex gap-2">
          <div className="w-[100px] h-[100px]">
            <Image
              className="aspect-square object-contain"
              src={`data:image/jpeg;base64,${productImage && productImage[0]}`}
              alt={`Product Image`}
              height={100}
              width={100}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={`/products/${itemKey}`}
              className=" text-lg hover:underline"
            >
              {itemValue.name}
            </Link>
            <div className="flex flex-col gap-2 text-gray-600 text-sm">
              <div className="flex flex-col gap-1">
                {Object.entries(itemValue.options).map(
                  ([optionKey, optionValue]) => (
                    <div
                      key={optionKey}
                      className="flex gap-2 items-center text-xs"
                    >
                      <p>
                        {optionKey}ml x {optionValue.quantity}
                      </p>
                      <div className="border border-slate-300 rounded-md p-1 flex z-20">
                        <Minus
                          onClick={() => decrementQuantity(optionKey, itemKey)}
                          className="h-5 w-5 cursor-pointer hover:bg-slate-200 duration-200 "
                        />
                        <Plus
                          onClick={() => incrementQuantity(optionKey, itemKey)}
                          className="h-5 w-5 cursor-pointer hover:bg-slate-200 duration-200 "
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="font-semibold pr-8 mob_display:text-xs mob_display:pr-0">
                <p>Total quantity: {itemValue.totalQuantity}</p>
              </div>
            </div>
            <div className="flex items-center gap-2"></div>
          </div>
        </div>
        <Trash
          onClick={() => deleteItem(itemValue._id)}
          color="gray"
          size={20}
        />
      </div>
    </div>
  );
};

export default CartItem;
