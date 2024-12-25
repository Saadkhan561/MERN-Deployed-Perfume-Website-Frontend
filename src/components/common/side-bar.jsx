import useUserStore from "@/store/user";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  useFetchAllCategories,
  useFetchAllParentCategories,
} from "@/hooks/query";

const SideBar = () => {
  const router = useRouter();
  const sideBar = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const { currentUser, deleteUserInfo } = useUserStore();
  const first_name = currentUser?.user.first_name;
  const last_name = currentUser?.user.last_name;

  const { data: categories, isLoading: isCategoriesLoading } =
    useFetchAllCategories();

  const { data: parentCategories } = useFetchAllParentCategories();

  return (
    <div>
      {/* SIDE BAR DIV */}
      <div
        className={
          Boolean(router.query.sideBar)
            ? "fixed top-0 right-0 duration-300 h-screen bg-white w-[250px] z-20 shadow-2xl"
            : "fixed top-0 -right-full duration-200 h-screen bg-white w-[250px] z-20 shadow-2xl"
        }
      >
        <ul className="p-2">
          <li className="flex justify-end p-2">
            {" "}
            <ArrowRight
              onClick={() => sideBar("sideBar")}
              className="h-4 w-4 cursor-pointer"
            />
          </li>
          <li className="flex justify-between items-center p-2 pb-4">
            <div
              className={
                currentUser !== null
                  ? "p-2 rounded-full bg-slate-800 text-white text-xs"
                  : ""
              }
            >
              {currentUser !== null
                ? `${first_name?.split("")[0]}${last_name?.split("")[0]}`
                : null}
            </div>
            {currentUser === null ? (
              <div className="text-sm font-semibold cursor-pointer flex gap-1">
                <Link className="hover:underline" href={"/register?login=true"}>
                  LogIn
                </Link>
                /
                <Link className="hover:underline" href={"/register"}>
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div className="font-semibold text-sm">{`${currentUser?.user.first_name} ${currentUser?.user.last_name} `}</div>
              </div>
            )}
          </li>
          {currentUser?.user && (
            <li
              onClick={() => router.push("/account")}
              className="p-2 cursor-pointer hover:underline"
            >
              My Account
            </li>
          )}
          <hr />
          <li
            onClick={() => router.push("/")}
            className="p-2 mt-4 cursor-pointer hover:underline"
          >
            Home
          </li>
          <Accordion type="single" collapsible className="p-2 cursor-pointer">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:underline">
                Categories
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {parentCategories?.map((category, index) => (
                    <li key={category._id} className="pt-2 capitalize">
                      <Accordion type="single" collapsible>
                        <AccordionItem value={category._id}>
                          <AccordionTrigger className="hover:underline">
                            <Link href={`/productsAll?id=${category._id}`}>
                              {category.name}
                            </Link>
                          </AccordionTrigger>
                          <AccordionContent>
                            {category.subCategories?.map(
                              (sub_category, index) => (
                                <AccordionItem className="hover:underline pt-2">
                                  <Link
                                    href={`/products?id=${sub_category._id}`}
                                    key={index}
                                  >
                                    {sub_category.name}
                                  </Link>
                                </AccordionItem>
                              )
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* <li
            onClick={() => router.push("/cart")}
            className="p-2 rounded-lg cursor-pointer hover:bg-slate-800 duration-200 hover:text-white"
          >
            Cart
          </li> */}
          {currentUser && (
            <li
              onClick={deleteUserInfo}
              className="p-2 rounded-lg cursor-pointer text-red-500 hover:bg-red-500 hover:text-white duration-200"
            >
              Logout
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
