import useUserStore from "@/store/user";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import WebsiteLoader from "../loadingSkeletons/websiteLoader";

const ProtectedWrapper = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { currentUser, isLoading, isHydrated } = useUserStore((state) => ({
      currentUser: state.currentUser,
      isLoading: state.isLoading,
      isHydrated: state._hasHydrated, // Zustand's internal hydration flag
    }));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      if (!isHydrated) return; // Wait for hydration to complete

      if (!currentUser) {
        if (router.pathname === "/admin") {
          router.push("/adminLogin");
        } else {
          router.push("/register?login=true");
        }
        return;
      }

      if (isLoading) return;
      const { role } = currentUser.user;

      if (router.pathname.startsWith("/admin") && role !== "admin") {
        router.push("/adminLogin");
      } else {
        setIsAuthenticated(true);
      }
    }, [currentUser, isLoading, isHydrated, router]);

    if (!isHydrated || isLoading) {
      return (
        <div>
          <WebsiteLoader />
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div>
          <WebsiteLoader />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  Wrapper.displayName = `ProtectedWrapper(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return Wrapper;
};

export const withProtectedWrapper = ProtectedWrapper;
