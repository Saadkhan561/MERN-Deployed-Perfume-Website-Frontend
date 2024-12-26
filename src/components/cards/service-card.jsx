import { Headset, PackageCheck, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";

const ServiceCard = () => {
  const tags = {
    item1: {
      icon: "refund",
      heading: "Easy returns",
      text: "Enjoy hassle-free returns within a week, as long as the item remains sealed.",
    },
    item2: {
      icon: "price",
      heading: "Best price",
      text: "Get the best prices in Pakistan, guaranteed to offer unbeatable value.",
    },
    item3: {
      icon: "shipping",
      heading: "Get free shipping",
      text: "With 4000 /Rs purchase",
    },
  };
  return (
    <div className="flex sm:flex-row flex-col items-center sm:justify-evenly gap-6 flex-wrap">
      {Object.entries(tags).map(([key, { icon, heading, text }]) => (
        <div
          className="flex flex-col items-center sm:w-[350px] w-4/5 rounded-lg shadow-2xl bg-white p-2 text-sm"
          key={key}
        >
          <div className="w-full flex justify-center">
            <Image src={`/images/${icon}.png`} height={60} width={60} />
          </div>
          <p className="text-xl">{heading}</p>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;
