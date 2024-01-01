"use client";
import React, { KeyboardEventHandler } from "react";
import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => label;

type FormType = {
  inputValue: any;
  setInputValue: any;
  value?: any;
  setValue: any;
  placeholder: any;
};

const MultiSelectTextInput = ({
  inputValue,
  setInputValue,
  value,
  setValue,
  placeholder,
}: FormType) => {
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue && event.key === "Backspace") {
      event.preventDefault();
      return;
    }
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev: any) => [...prev , createOption(inputValue)]);
       
        setInputValue("");
        event.preventDefault();
    }
  };
  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => setValue(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default MultiSelectTextInput;
