"use client";

import dayjs from "dayjs";
import ta from "thinkingdata-browser";
import { event } from "nextjs-google-analytics";
import useUserStore from "@/store/user";

const config = {
  appId: process.env.NEXT_PUBLIC_THINKING_DATA_SERVER_API_ID,
  serverUrl: process.env.NEXT_PUBLIC_THINKING_DATA_SERVER_URL,
  autoTrack: {
    pageShow: true, //开启页面展示事件，事件名ta_page_show
    pageHide: true, //开启页面隐藏事件，事件名ta_page_hide
  },
};
ta.init(config);
// 自动上传用户浏览页面的事件
ta.quick("autoTrack");

// googleAnalytics
function googleAnalytics(eventName, eventProperties) {
  event(`${eventName}`, eventProperties);
}

// thinkingdataAnalytics
function tdAnalytics(eventName, eventProperties) {
  ta.track(`${eventName}`, eventProperties);
}

export { ta, googleAnalytics, tdAnalytics };
export default function useAnalytics() {
  const userInfo = useUserStore((state) => state.userInfo);

  function analytics(eventName, eventProperties) {
    const commonProperties = {
      feature: document.title,
      operation_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      user_email: userInfo?.email,
    };
    googleAnalytics(eventName, { ...commonProperties, ...eventProperties });

    tdAnalytics(eventName, { ...commonProperties, ...eventProperties });
    ta.userSet({ userName: userInfo?.name });
  }
  return analytics;
}
