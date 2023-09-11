import {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  Item,
  ItemIndicator,
  ItemText,
  Group,
  Viewport,
} from "@radix-ui/react-select";
import { CheckIcon } from "@radix-ui/react-icons";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

const SelectItem = forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Item
        className={cn(
          "text-[12px] cursor-pointer hover:bg-[#0051FF] hover:text-white leading-none  rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-gray data-[disabled]:pointer-events-none data-[highlighted]:outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <ItemText>{children}</ItemText>
        <ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </ItemIndicator>
      </Item>
    );
  }
);
SelectItem.displayName = "SelectItem";

export default function Select({ options, value, onChange, placeholder }) {
  const [selectedValue, setSelectedValue] = useState(value);
  return (
    <Root
      value={selectedValue}
      onValueChange={(e) => {
        setSelectedValue(e);
        onChange(e);
      }}
    >
      <Trigger
        className="inline-flex items-center border-0 justify-center px-[15px] text-[0.9rem] text-primary font-medium leading-none h-[35px] gap-[5px]  outline-none"
        aria-label="Food"
      >
        <Value className="font-medium text-primary" placeholder={placeholder} />
        <Icon>
          <ChevronDownIcon
            className="w-3 h-3 text-primary font-medium"
            strokeWidth={2.5}
          />
        </Icon>
      </Trigger>
      <Portal>
        <Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Viewport className="p-[5px]">
            <Group>
              {options.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  {option.text}
                </SelectItem>
              ))}
            </Group>
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
}
