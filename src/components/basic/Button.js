"use client";

import { Button as MButton } from "@/ui/material-tailwind";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Button = forwardRef(
  ({ children, disabled, onClick, className, ...props }, forwardedRef) => {
    return (
      <MButton
        ref={forwardedRef}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          `flex min-w-max items-center py-2 px-4 text-white normal-case font-medium rounded-full text-sm bg-primary
            disabled:pointer-events-auto
            cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`,
          className
        )}
        {...props}
      >
        {children}
      </MButton>
    );
  }
);
Button.displayName = "Button";

export default Button;
