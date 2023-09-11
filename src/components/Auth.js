"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import cookies from "js-cookie";
import { IS_PROD } from "@/const/common";

export default function Auth({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const session = cookies.get("sessionid");
    const whiteHost = [
      "localhost",
      "127.0.0.1",
      process.env.NEXT_PUBLIC_LOCAL_HOST,
    ];
    if (
      IS_PROD &&
      !whiteHost.includes(window.location.hostname) &&
      !session &&
      pathname !== "/login"
    ) {
      window.location.href = `/login?next=${encodeURIComponent(
        window.location.href
      )}`;
    } else {
      setIsLogin(true);
    }
  }, [pathname, searchParams]);

  return isLogin ? children : null;
}
