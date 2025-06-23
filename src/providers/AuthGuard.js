"use client";
import Fetch from "@/utils/axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAccess, setIsAccess] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkAccess = async () => {
      try {
        const { status } = await Fetch.get("/auth/refresh");
        if (!isMounted) return;

        if (status > 201) {
          setIsAccess("no-access");
        } else {
          setIsAccess("access");
        }
      } catch (error) {
        if (isMounted) setIsAccess("no-access");
      }
    };

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isAccess === null) {
    return null;
  }

  if (isAccess === "no-access") {
    if (pathname !== "/auth") {
      router.replace("/auth");
      return null;
    }

    return children;
  }

  if (pathname === "/auth") {
    router.replace("/");
    return null;
  }

  return children;
};

export default AuthGuard;
