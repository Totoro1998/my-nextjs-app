"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "@/components/basic/Button";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const navLinks = [
    {
      title: "Tables",
      link: "/tables",
      done: false,
    },
    {
      title: "Favorites",
      link: "/favorites",
      done: false,
    },
    {
      title: "SQL Generator",
      link: "/generator",
      done: true,
    },
    {
      title: "SQL Explainer",
      link: "/explainer",
      done: false,
    },
    {
      title: "SQL Trobleshooter",
      link: "/trobleshooter",
      done: false,
    },
    {
      title: "SQL Optimizer",
      link: "/optimizer",
      done: false,
    },
    {
      title: "SQL Formatter",
      link: "/formatter",
      done: false,
    },
  ];

  function handleClick() {}

  function getNavLinkButton(navLink) {
    let element = null;
    const { title, done, link } = navLink;
    element = (
      <div className="relative w-full" key={navLink.link}>
        <Button
          className={`w-full text-[12px] justify-center rounded-xl px-2 text-gray-nav shadow-[0_3px_6px_0_rgba(0,0,0,0.08)] ${
            done ? "bg-white" : "bg-primary-nav"
          } ${pathname === link ? "text-primary" : ""}`}
          onClick={handleClick}
        >
          {title}
        </Button>
        {!done ? (
          <span className="absolute right-[-10px] top-[-4px]">
            <Image
              src="/assets/icon/soon.svg"
              alt=""
              width={22}
              height={10}
            ></Image>
          </span>
        ) : null}
      </div>
    );
    return element;
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full w-[180px] content-wrapper px-[20px] py-[20px] space-y-8"
      )}
    >
      {navLinks.map((navLink) => {
        return getNavLinkButton(navLink);
      })}
    </div>
  );
}
