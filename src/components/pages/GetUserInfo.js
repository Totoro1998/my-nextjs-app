"use client";

import useUserStore from "@/store/user";
import { useEffect } from "react";
import useAnalytics, { ta } from "@/hooks/useAnalytics";

export default function GetUserInfo() {
  const userInfo = useUserStore((state) => state.userInfo);
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);
  const analytics = useAnalytics();
  useEffect(() => {
    if (
      !userInfo ||
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.today_rest
    ) {
      fetchUserInfo().then((res) => {
        analytics("login");
        ta.login(res?.account_id);
      });
    }
  }, []);
  return null;
}
