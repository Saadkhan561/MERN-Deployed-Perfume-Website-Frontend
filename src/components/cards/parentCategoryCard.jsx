import React from "react";
import CategoryCard from "./categoryCard";
import Link from "next/link";

const ParentCategoryCard = ({ data }) => {
  return (
    <div className="w-full p-4 flex flex-col items-center gap-4">
      <Link
        href={`/productsAll?id=${data?._id}`}
        className="text-center uppercase text-4xl mob_display:text-2xl hover:underline"
      >
        {data?.name}
      </Link>
      <div className="grid lg:grid-cols-2 lg:gap-8 gap-4 grid-cols-1">
        {data?.subCategories?.map((category, index) => (
          <CategoryCard
            key={category._id}
            id={category._id}
            name={category.name}
            parentCategory={data.name}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ParentCategoryCard;

//flex w-full justify-evenly flex-wrap
