import React, { FC, InputHTMLAttributes } from "react";

interface CustomTextAreaAttributes
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string | null;
  error?: string | null;
  required: boolean;
  maxLength?: number;
  value?: string;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomTextArea: FC<CustomTextAreaAttributes> = ({
  name,
  label,
  error,
  value,
  required,
  maxLength,
  rows,
  onChange: onchange,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className={`text-sm text-slate-400 ${error ? "text-error" : ""}`}
      >
        {label}
      </label>
      <textarea
        className={`bg-white text-black input input-bordered input-primary w-full ${
          error ? "input-error" : ""
        }`}
        name={name}
        required={required}
        maxLength={maxLength}
        rows={rows}
        onChange={onchange}
        value={value}
      ></textarea>
      <span className=" text-sm text-red-500">{error}</span>
    </div>
  );
};

export default CustomTextArea;
