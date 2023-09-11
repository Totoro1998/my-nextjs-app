"use client";

import { useState } from "react";
import { RadixSwitch } from "@/ui/radix-ui";

export default function Switch({ checked, onCheckedChange }) {
  const [state, setState] = useState(checked);

  function handleCheckedChange(checked) {
    setState(checked);
    onCheckedChange(checked);
  }
  return (
    <RadixSwitch.Root
      className="w-[60px] h-[30px] bg-gray-heavy rounded-full 
      relative cursor-pointer
      box-inner-shadow
      data-[state=checked]:bg-primary outline-none"
      id="airplane-mode"
      checked={state}
      onCheckedChange={handleCheckedChange}
    >
      <RadixSwitch.Thumb className="block w-[24px] h-[24px] bg-white rounded-full transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-[32px]" />
    </RadixSwitch.Root>
  );
}
