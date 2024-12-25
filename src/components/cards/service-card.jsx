import { Headset, PackageCheck, ThumbsUp } from "lucide-react";
import React from "react";

const ServiceCard = () => {
  const tags = {
    item1: {
      icon: <ThumbsUp className="sm:h-16 sm:w-16 w-12 h-12" />,
      heading:"Quality products",
      text: "Our products are meticulously crafted to meet the highest standards of quality, providing you with reliable and exceptional performance.",
    },
    item2: {
      icon: <PackageCheck  size={70}/>,
      heading: "Fast delivery",
      text: "Experience lightning-fast delivery right to your doorstep, ensuring your order arrives promptly and efficiently.",
    },
    item3: {
      icon: <Headset size={70} />,
      heading: "24/7 customer support",
      text: "Our dedicated customer support team is available 24/7 to assist you with any questions or concerns, providing prompt and helpful solutions.",
    },
  };
  return (
    <div className="flex flex-wrap mob_display_product:flex-col mob_display:justify-center gap-14 w">
      {Object.entries(tags).map(([key, { icon,heading, text }]) => (
        <div
          className="flex flex-col gap-4 items-center sm:w-[350px] w-full h-[250px] rounded-lg shadow-2xl bg-white p-2 text-sm"
          key={key}
        >
          <div className="w-full flex justify-center">{icon}</div>
          <p className="text-xl">{heading}</p>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;
