import { read } from "fs";
import React, { FC, InputHTMLAttributes } from "react";

interface CustomInputAttributes extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string | null;
  error?: string | null;
  required: boolean;
}

const CustomInput: FC<CustomInputAttributes> = ({
  name,
  label,
  error,
  required,
  readOnly,
  ...rest
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className={`text-sm text-slate-400 ${error ? "text-error" : ""}`}
      >
        {label}
      </label>
      <input
        className={` text-black input input-bordered input-primary w-full ${
          error ? "input-error" : ""
        }
        ${readOnly ? " bg-gray-200 " : "bg-white"}
        
        `}
        name={name}
        required={required}
        readOnly={readOnly}
        {...rest}
      />
      <span className=" text-sm text-red-500">{error}</span>
    </div>
  );
};

export default CustomInput;
