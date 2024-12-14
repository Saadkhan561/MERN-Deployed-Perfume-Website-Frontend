import Image from "next/image";
import React from "react";
import { categoryImages } from "../../../categoryImages";
import { useRouter } from "next/navigation";
import { useFetchCategoryImages } from "@/hooks/query";

const CategoryCard = ({ name, parentCategory, id }) => {
  const { data } = useFetchCategoryImages({
    category: name,
    parentCategory
  });

  const router = useRouter();
  console.log(parentCategory)
  return (
    <div
      onClick={() => router.push(`/products?id=${id}`)}
      className="sm:w-[600px] w-[400px] rounded-lg flex flex-col gap-4 items-center p-4 hover:scale-105 cursor-pointer duration-500 group"
    >
      {/* <Image
        className="aspect-square group-hover:opacity-90 duration-200"
        src={`/images/${categoryImages[index]}.jpg`}
        alt={`Collection of luxury ${name}`}
        width={1600}
        height={900}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        priority
      /> */}
      <Image
        className="group-hover:opacity-90 duration-200 p-1"
        src={`data:image/jpeg;base64,${data && data[0]}`}
        alt="Luxury perfume bottle with a floral scent"
        height={900}
        width={1600}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        priority
      />
      <p className="text-2xl uppercase">{name}</p>
      <p className="text-gray-500 text-sm text-center">
        Discover the essence of luxury with our exclusive range of perfumes.
        Crafted from the finest ingredients, each fragrance tells a unique
        story, leaving a lasting impression. Find your perfect scent and elevate
        every moment.
      </p>
      <button className="border-b text-sm border-black p-1  text-gray-500">
        Shop now
      </button>
    </div>
  );
};

export default CategoryCard;
