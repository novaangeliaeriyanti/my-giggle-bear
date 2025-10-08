"use client";

import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
};

const FormInput = ({ label, error, register, required, className, ...props }: FormInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={props.id} className="text-small">
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
      )}

      <input
        {...register}
        {...props}
        className={clsx(
          "border-b border-dashed border-outlined py-2 outline-none text-body w-full placeholder:text-outlined focus:border-hover transition-all",
          className
        )}
      />

      {error && <p className="text-tiny text-primary mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
