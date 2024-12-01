import Image from "next/image";
import React from "react";
import { categoryImages } from "../../../categoryImages";
import { useRouter } from "next/navigation";

const CategoryCard = ({ name, index, id }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/products?id=${id}`)}
      className="sm:w-[600px] w-[400px] rounded-lg flex flex-col gap-4 items-center p-4 hover:scale-105 cursor-pointer duration-500 group"
    >
      <Image
        className="aspect-square group-hover:opacity-90 duration-200"
        src={`/images/${categoryImages[index]}.jpg`}
        alt={`Collection of luxury ${name}`}
        width={1600}
        height={900}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
