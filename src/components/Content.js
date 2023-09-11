"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useRef, useEffect, useState } from "react";
import { debounce } from "lodash-es";

export default function Content({ children }) {
  const scrollableDivRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const debouncedHandleScroll = debounce(() => {
    const scrollY = scrollableDivRef.current.scrollTop;
    setScrollY(scrollY);
  }, 0);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;

    // 添加滚动事件监听器
    scrollableDiv.addEventListener("scroll", debouncedHandleScroll);

    // 在组件卸载时移除监听器，以防止内存泄漏
    return () => {
      scrollableDiv.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  return (
    <div className="full-bg bg-[url('/background.svg')] ">
      <Header changeBg={scrollY > 32} />
      <main>
        <div className="flex flex-row w-full">
          <div className="sticky left-0 top-0 bottom-0 py-[32px] pl-[24px]">
            <NavBar />
          </div>
          <div
            className="h-[calc(100vh-64px)] flex-1 hidden-scrollbar overflow-y-overlay"
            ref={scrollableDivRef}
          >
            <div className="content min-100vh-bg-blur pt-[32px]">
              {children}
            </div>
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
