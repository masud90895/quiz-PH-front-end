"use client";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  label?: string;
  name?: string;
  type?: string;
  customClass?: string;
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: any;
  value?: string;
  disabled?: boolean;
  defaultValue?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: any;
}

const InputField = ({
  label,
  name,
  type,
  customClass,
  placeholder,
  required,
  register,
  errors,
  value,
  disabled,
  defaultValue,
  onChange,
  validation,
}: InputFieldProps) => {
  return (
    <div className="w-full">
      {label && (
        <div className="flex gap-1 items-center mb-1">
          <label
            className={`${
              errors && name && errors[name]
                ? "my-1  inline-block text-xs font-medium uppercase text-rose-600"
                : "my-1 inline-block text-xs font-medium uppercase text-gray-700"
            }`}
          >
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        </div>
      )}
      {register ? (
        <input
          type={type ? type : "text"}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue ? defaultValue : null}
          /* onChange={onChange ? onChange : () => {}} */
          className={`${
            customClass
              ? customClass
              : `${
                  errors && name && errors[name]
                    ? "block w-full cursor-text appearance-none rounded-md border border-red-600 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-red-200 focus:text-red-600 focus:shadow"
                    : "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:text-gray-600 focus:shadow"
                }`
          }`}
          {...register(name ? name : "noName", {
            required: required ? true : false,
            ...validation,
          })}
        />
      ) : (
        <input
          type={type ? type : "text"}
          placeholder={placeholder}
          className={`${
            customClass
              ? customClass
              : `${
                  errors?.name
                    ? "block w-full cursor-text appearance-none rounded-md border border-red-600 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-red-200 focus:text-red-600 focus:shadow"
                    : "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:text-gray-600 focus:shadow"
                }`
          }`}
          name={name}
          value={value}
          disabled={disabled}
          defaultValue={defaultValue ? defaultValue : null}
          onChange={onChange ? onChange : () => {}}
          required={required ? true : false}
        />
      )}
      {errors && name && errors[name] && (
        <p className="text-rose-500 text-[12px]">{label} is required</p>
      )}
    </div>
  );
};

export default InputField;
