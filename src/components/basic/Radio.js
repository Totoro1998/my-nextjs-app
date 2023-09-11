import { useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

export default function Radio({ value, defaultValue, onChange, options }) {
  const [radioValue, setRadioValue] = useState(value || defaultValue);

  useEffect(() => {
    setRadioValue(value);
  }, [value]);

  function handleChange(value) {
    console.log(value);
    setRadioValue(value);
    onChange(value);
  }

  return (
    <RadioGroup.Root
      className="flex flex-row gap-2.5"
      defaultValue={defaultValue}
      aria-label="View density"
      value={radioValue}
      onValueChange={handleChange}
    >
      {options.map((option) => {
        return (
          <div key={option.value} className="flex items-center font-medium">
            <RadioGroup.Item
              className="border-2 border-gray-radio w-[25px] h-[25px] peer aria-checked:border-primary rounded-full cursor-pointer"
              value={option.value}
              id={option.value}
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] data-[state=checked]:after:bg-primary" />
            </RadioGroup.Item>
            <label
              className="text-gray text-[15px] leading-none pl-[15px]"
              htmlFor={option.value}
            >
              {option.text}
            </label>
          </div>
        );
      })}
    </RadioGroup.Root>
  );
}
