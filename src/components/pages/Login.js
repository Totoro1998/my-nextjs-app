"use client";

import Image from "next/image";
import Button from "@/components/basic/Button";
import styles from "./Login.module.scss";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import useUserStore from "@/store/user";
export default function LoginPage() {
  const searchParams = useSearchParams();
  const clearUserInfo = useUserStore((state) => state.clearUserInfo);
  clearUserInfo();
  function handleSignIn(type) {
    const typeUrlMap = {
      google: "login_by_google",
    };
    const nextUrl = searchParams.get("next") || "/";
    // const params = {
    //   home_url: decodeURIComponent(nextUrl),
    // };
    // request.get({
    //   url: `/api/auth/${typeUrlMap[type]}`,
    //   params,
    // });
    window.location.href = `/api/auth/${
      typeUrlMap[type]
    }?home_url=${encodeURIComponent(nextUrl)}`;
  }
  return (
    <div className="w-full flex flex-col items-center justify-center xs:px-4">
      <div
        className={cn(
          "p-4 space-y-6 md:px-24 md:pt-[90px] md:pb-[48px] md:w-[690px]",
          styles["login-card"]
        )}
      >
        <div className="text-primary font-bold text-4xl">Login</div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label className="text-gray font-light text-lg">Email</label>
            <input
              type="email"
              required
              placeholder="username@gmail.com"
              className={cn(
                "w-full mt-2 px-3 py-2 input-color bg-transparent outline-none border focus:border-primary placeholder:text-sm placeholder:font-light placeholder:placeholder-color",
                styles["input-card"]
              )}
            />
          </div>
          <div>
            <label className="text-gray font-light text-lg">Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              className={cn(
                "w-full mt-2 px-3 py-2 input-color bg-transparent outline-none border focus:border-primary placeholder:text-sm placeholder:font-light placeholder:placeholder-color",
                styles["input-card"]
              )}
            />
          </div>
          <div className="text-right">
            <a className="text-gray font-light text-xs cursor-pointer">
              Forgot password?
            </a>
          </div>
          <button className="w-full px-4 py-2 text-white font-bold bg-primary rounded-lg hover:opacity-80">
            Sign in
          </button>
        </form>

        <div className="text-center text-gray px-2 font-light">
          or continue with
        </div>
        {/* <div className="grid grid-cols-3 gap-x-3">
          <button
            className="flex items-center justify-center w-[100px] md:w-[150px] h-[36px] md:h-[50px] border rounded-lg"
            onClick={() => handleSignIn("google")}
          >
            <Image
              src="/assets/icon/google-logo.svg"
              alt="google"
              width="24"
              height="24"
            />
          </button>
          <button className="flex items-center justify-center w-[100px] md:w-[150px] h-[36px] md:h-[50px] border rounded-lg">
            <Image
              src="/assets/icon/facebook-logo.svg"
              alt="facebook"
              width="24"
              height="24"
            />
          </button>
          <button className="flex items-center justify-center w-[100px] md:w-[150px] h-[36px] md:h-[50px] border rounded-lg">
            <Image
              src="/assets/icon/apple-logo.svg"
              alt="apple"
              width="24"
              height="24"
            />
          </button>
        </div> */}
        <div>
          <Button
            className="flex items-center justify-center w-full h-[40px] rounded-lg bg-white hover:opacity-80"
            onClick={() => handleSignIn("google")}
            ripple={true}
          >
            <Image
              src="/assets/icon/google-logo.svg"
              alt="google"
              width="24"
              height="24"
            />
          </Button>
        </div>
        <div className="w-full flex text-center justify-center items-center flex-wrap flex-col md:flex-row text-gray text-sm gap-x-3">
          <span className="w-max font-light">Don’t have an account yet? </span>
          <span className="w-max font-semibold cursor-pointer">
            Register for free
          </span>
        </div>
      </div>
    </div>
  );
}
