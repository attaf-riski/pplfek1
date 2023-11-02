import React, { FC, InputHTMLAttributes } from "react";

interface CustomInputAttributes extends InputHTMLAttributes<HTMLInputElement> {
	name: string,
	label?: string | null,
	error?: string | null,
	required: boolean
}

const CustomInput: FC<CustomInputAttributes> = ({ name, label, error, required, ...rest }) => {
	return (
		<div>
			<label htmlFor={name} className={`text-sm text-slate-400 ${error ? 'text-error' : ''}`}>{label}</label>
			<input
				className={`input input-bordered input-primary w-full ${error ? 'input-error' : ''}`}
				name={name}
				required={required}
				{...rest}
			/>
			<span className=" text-sm text-red-500">{error}</span>
		</div>
	)
}

export default CustomInput;