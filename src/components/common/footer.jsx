import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import { Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <div className="duration-200 flex sm:justify-center justify-start mt-20 bg-black text-white border-t border-t-slate-200">
      <div className="p-12 text-lg w-full flex flex-col gap-8">
        <div className="flex lg:items-center gap-8 lg:flex-row flex-col">
          <Image
            src="/images/perfume-logo.svg"
            alt="Perfume logo"
            height={220}
            width={220}
          />
          <div className="flex justify-evenly flex-col sm:flex-row text-[#BB8C1C] font-semibold flex-wrap gap-4">
            <Link
              href="/"
              className="cursor-pointer hover:underline duration-200"
            >
              Home
            </Link>

            <ul className="w-[200px]">
              <li className="cursor-pointer hover:underline duration-200">
                Services
              </li>
              <li className="text-gray-500 text-sm font-normal flex gap-1">
                <span>-</span>
                <p>Easy hassle free returns</p>
              </li>
              <li className="text-gray-500 text-sm font-normal flex gap-1">
                <span>-</span>
                <p>Best price all over pakistan</p>
              </li>
              <li className="text-gray-500 text-sm font-norma flex gap-1">
                <span>-</span>
                <p>Get free shipping for upto 4000 /Rs purchase</p>
              </li>
            </ul>
            <ul className="w-[200px]">
              <li className="cursor-pointer hover:underline duration-200">
                About
              </li>
              <li className="text-gray-500 text-sm font-normal">
                The Perfumes, established in 2023, brings you premium fragrances
                from Ahmed Al Maghribi and other renowned brands, delivering
                luxury and elegance in every bottle.
              </li>
            </ul>
            <ul className="w-[200px]">
              <li className="cursor-pointer hover:underline duration-200">
                Contact
              </li>
              <li className="text-gray-500 text-sm font-normal">
                +92 331 2875066
              </li>
            </ul>
            {/* <p className="cursor-pointer hover:underline duration-200">
            Privacy Policy
          </p> */}
            <ul className="w-[200px]">
              <li className="cursor-pointer hover:underline duration-200">
                Social Media
              </li>
              <li className="flex gap-2 items-center h-max">
                <Image
                  className="border border-white rounded-full p-1 bg-white cursor-pointer hover:scale-110 duration-200"
                  src="/images/instagram.png"
                  alt=""
                  height={35}
                  width={35}
                  onClick={() =>
                    router.push(
                      "https://www.instagram.com/perfumes.pk.official?igsh=MXRsZ3hwMmhudW4zeg=="
                    )
                  }
                />
                <Image
                  className="border border-white rounded-full p-1 bg-white cursor-pointer hover:scale-110 duration-200"
                  src="/images/facebook.png"
                  alt=""
                  height={35}
                  width={35}
                  onClick={() =>
                    router.push(
                      "https://www.facebook.com/perfumes.pk.official?mibextid=ZbWKwL"
                    )
                  }
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center text-sm mt-4 text-[#BB8C1C]">
          The Perfumes &copy; 2023
        </div>
      </div>
    </div>
  );
};

export default Footer;
