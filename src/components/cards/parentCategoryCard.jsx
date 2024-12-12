import React from "react";
import CategoryCard from "./categoryCard";

const ParentCategoryCard = ({ data }) => {
  console.log(data);
  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <p className="text-center text-4xl mob_display:text-2xl">{data?.name}</p>
      <div className="flex w-full justify-around flex-wrap">
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
