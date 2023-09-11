"use client";

import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { arrayToObject, isEmptyData } from "@/lib/utils";
import Tag from "./Tag";
import {
  XCircleIcon,
  MagnifyingGlassIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function Select({
  options,
  value,
  onChange,
  placeholder,
  multiple = true,
  label,
}) {
  const [selectedValue, setSelectedValue] = useState(value);
  const optionsMap = arrayToObject(options, "value");

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  function handleValueChange(value) {
    setSelectedValue(value);
    onChange(value);
  }
  function handleRemoveSelectedValue(event, value) {
    event.stopPropagation();
    const values = selectedValue.filter((item) => item !== value);
    handleValueChange(values);
  }

  return (
    <Listbox
      value={selectedValue}
      onChange={handleValueChange}
      multiple={multiple}
    >
      <Listbox.Button
        className="
      flex items-center justify-between w-full py-3 px-2.5 min-h-[54px] 
      text-left sm:text-sml cursor-pointer rounded-2xl bg-white
      border aria-expanded:border-primary aria-expanded:outline-none hover:bg-primary-selctedHover aria-expanded:bg-white
      shadow-[0_3px_6px_0_rgba(0,0,0,0.08)]"
      >
        <span
          className={`${
            isEmptyData(selectedValue) ? "text-gray-placeholder" : "gap-2"
          } flex-1 flex flex-wrap hover:text-white`}
        >
          {isEmptyData(selectedValue)
            ? placeholder
            : multiple
            ? selectedValue.map((value) => (
                <Tag
                  key={value}
                  variant="outlined"
                  className="text-primary cursor-pointer"
                >
                  <span>{optionsMap[value].text}</span>
                  <XCircleIcon
                    className="w-5 h-5"
                    onClick={(event) => handleRemoveSelectedValue(event, value)}
                  />
                </Tag>
              ))
            : selectedValue.text}
        </span>
        <span>
          <MagnifyingGlassIcon className="w-5 h-5 text-primary" />
        </span>
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options
          className="absolute mt-1 max-h-60 w-full py-1 px-1
        overflow-scroll hidden-scrollbar 
        rounded-xl bg-white text-base shadow-[0_4px_26px_0_rgba(0,0,0,0.3)] ring-1 
        ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              disabled={option.unavailable}
              className={`flex items-center justify-between 
              py-2 px-4
              cursor-pointer select-none  
              aria-selected:bg-primary-selcted
              hover:bg-primary-selcted`}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block flex-1 truncate text-gray-input ${
                      selected ? "font-medium" : "font-normal"
                    } ${option.unavailable ? "opacity-75" : ""}}`}
                  >
                    {option.text}
                  </span>
                  {selected ? (
                    <span className="inset-y-0 flex items-center pl-3 text-amber-600">
                      <CheckIcon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
