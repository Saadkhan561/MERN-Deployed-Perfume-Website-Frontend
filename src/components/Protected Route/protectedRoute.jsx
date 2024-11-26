import useUserStore from "@/store/user";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProtectedWrapper = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { currentUser, isLoading } = useUserStore();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      
      if (!currentUser) {
        if (router.pathname === "/admin") {
          router.push("/adminLogin");
        } else {
          router.push("/register?login=true");
        }
        return;
      }
      
      if (isLoading) ;
      const { role } = currentUser.user;

      if (router.pathname.startsWith("/admin") && role !== "admin") {
        router.push("/adminLogin");
      } else {
        setIsAuthenticated(true);
      }
    }, [currentUser, isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <div>Redirecting...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  Wrapper.displayName = `ProtectedWrapper(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return Wrapper;
};

export const withProtectedWrapper = ProtectedWrapper;
