import { useState, useEffect } from "react";
import { courierPrime } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function Textarea({
  id,
  name,
  rows = 5,
  placeholder,
  value,
  defaultValue,
  onChange,
  onFocus,
  className,
  ...props
}) {
  const [state, setState] = useState(value || defaultValue || "");

  useEffect(() => {
    if (value !== undefined) {
      setState(value);
    }
  }, [value]);

  function handleValueChange(e) {
    const value = e.target.value;
    setState(value);
    if (onChange) {
      onChange(value);
    }
  }

  return (
    <textarea
      rows={rows}
      name={name}
      id={id || name}
      value={state}
      onChange={handleValueChange}
      onFocus={onFocus}
      className={cn(
        `resize-none
      block min-h-[80px] w-full h-full py-4 px-6 hidden-scrollbar
      font-mono font-normal text-sm sm:text-base placeholder:text-gray-placeholder text-gray-input 
      rounded-xl
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary
      disabled:cursor-not-allowed disabled:opacity-50`,
        courierPrime.className,
        className
      )}
      placeholder={placeholder}
      {...props}
    />
  );
}
