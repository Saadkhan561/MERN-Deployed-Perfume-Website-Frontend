import Image from "next/image";
import React from "react";

const WebsiteLoader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="animate-logo-loader-animate">
        <Image
          src="/images/perfume-logo.svg"
          alt="logo"
          height={500}
          width={500}
        />
      </div>
    </div>
  );
};

export default WebsiteLoader;
