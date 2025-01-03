import Meta from "@/components/metaTags/meta";
import Login from "@/components/register/login";
import SignUp from "@/components/register/sigup";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import localFont from "next/font/local";

const myFont = localFont({
  src: "../../../public/fonts/JosefinSans-Regular.ttf",
});

const Register = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsLogin(router.query.login === "true");
    }
  }, [router.isReady, router.query]);

  const toggleLogin = () => {
    const updatedQuery = { ...router.query };

    if (isLogin) {
      delete updatedQuery.login;
    } else {
      updatedQuery.login = "true";
    }
    router.replace(
      { pathname: router.pathname, query: updatedQuery },
      undefined,
      { shallow: true }
    );
    setIsLogin(!isLogin);
  };

  return (
    <div className={`flex justify-center items-center h-screen font-sans ${myFont.className}`}>
      <Meta
        title={isLogin ? "Login - Perfume Shop" : "Register - Perfume Shop"}
        description="Create an account or log in to access the best perfumes and exclusive offers."
        keywords="perfume register, perfume login, sign in, sign up"
      />
      <ToastContainer
        position="top-center"
        transition={Bounce}
        closeOnClick={true}
        hideProgressBar={true}
      />
      {/* MAIN DIV FOR FULL SCREEN */}
      <div className="relative w-4/5 h-[640px] rounded-md p-4 shadow-2xl bg-slate-100 register_small_div:hidden">
        <div className="flex">
          {/* LOGIN DIV */}
          <Login />
          {/* SIGNUP DIV */}
          <SignUp />
        </div>
        <div
          className={
            isLogin
              ? "absolute top-0 left-0 h-full z-10 w-1/2 rounded-md bg-gray-900 text-white translate-x-full duration-500 flex justify-center items-center text-xl "
              : "absolute top-0 left-0 h-full z-10 w-1/2 rounded-md bg-gray-900 text-white translate-x-0 duration-500 flex justify-center items-center text-xl"
          }
        >
          {!isLogin ? (
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="/images/perfume-logo.svg"
                alt="Perfume logo"
                height={200}
                width={200}
              />
              <div
                onClick={toggleLogin}
                className="flex gap-2 flex-wrap cursor-pointer"
              >
                <div>Already have an account? Login</div>
                <Image
                  src="/images/white-right-arrow.png"
                  alt="arrow"
                  height={30}
                  width={30}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="/images/perfume-logo.svg"
                alt="Perfume logo"
                height={200}
                width={200}
              />
              <div onClick={toggleLogin} className="flex gap-2 cursor-pointer">
                <Image
                  className="rotate-180"
                  src="/images/white-right-arrow.png"
                  alt="arrow"
                  height={30}
                  width={30}
                />
                <div>Don&#39;t have an account? Sign Up</div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* MAIN DIV FOR SMALL SCREEN */}
      <div className="w-4/5 register_small_div:w-3/5 register_mini_div:w-4/5 h-[500px] rounded-md shadow-2xl bg-slate-100 register_full_div:hidden">
        {isLogin ? (
          /* LOGIN DIV */
          <div>
            <Login />
          </div>
        ) : (
          /* SIGNUP DIV */
          <div>
            <SignUp />
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
