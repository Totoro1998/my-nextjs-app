"use client";

import Image from "next/image";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import useUserStore from "@/store/user";
import useAnalytics from "@/hooks/useAnalytics";
import { useRouter } from "next/navigation";
import request from "@/lib/request";

export default function Header({ hiddenUserMenu = false, changeBg = false }) {
  const analytics = useAnalytics();
  const router = useRouter();
  const userInfo = useUserStore((state) => state.userInfo);
  const clearUserInfo = useUserStore((state) => state.clearUserInfo);
  function handleLogout() {
    analytics("logout");
    request
      .get({
        url: "/api/auth/logout",
      })
      .then(() => {
        clearUserInfo();
        router.push("/login");
      });
  }
  return (
    <header
      className={`sticky top-0 w-full h-16 flex items-center justify-between px-6 z-10 ${
        changeBg ? "bg-filter" : ""
      }`}
    >
      <div className="relative h-[45px] w-[169px] flex items-center">
        <Image
          alt="GuruSQL"
          src="/logo.svg"
          sizes="169px"
          fill
          style={{
            objectFit: "contain",
          }}
        ></Image>
      </div>
      {userInfo && !hiddenUserMenu ? (
        <div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <div className="flex items-center cursor-pointer">
                <Avatar.Root className="bg-blackA3 inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                  <Avatar.Image
                    className="h-full w-full rounded-[inherit] object-cover"
                    src={userInfo.picture}
                    alt={userInfo.name}
                  />
                  <Avatar.Fallback
                    className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                    delayMs={600}
                  >
                    CT
                  </Avatar.Fallback>
                </Avatar.Root>
                <span className="text-gray text-sm font-light mx-2 hidden md:block">
                  {userInfo.email}
                </span>
                <TriangleDownIcon />
              </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="w-[100px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                sideOffset={5}
              >
                <DropdownMenu.Item
                  onSelect={handleLogout}
                  className="group text-[12px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 cursor-pointer"
                >
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      ) : null}
    </header>
  );
}
