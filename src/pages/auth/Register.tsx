import React, { FC, useState } from "react";
import { CustomInput } from "../../components/input";

interface DataRegister {
	name?: string | null,
	email?: string | null,
	password?: string | null,
	confirmPassword?: string | null,
}

const Register: FC = () => {
	const [data, setData] = useState<DataRegister>({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const [errData, setErrData] = useState<DataRegister>({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});


	/* ------------------------------ OnChange Data ----------------------------- */
	const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const { name, value } = e.target;

		setData({
			...data,
			[name]: value
		});
	};
	/* ------------------------------ End OnChange ------------------------------ */

	/* -------------------------------- OnSubmit -------------------------------- */
	const onSubmit = () => {
		console.log(data);
	};
	/* ------------------------------ End OnSubmit ------------------------------ */

	return (
		<div className=" w-full">
			<p className=" text-center text-2xl text-menu-label mb-8">Registration</p>
			<div className=" container">
				<div className="mb-5">
					<CustomInput
						name="name"
						label="Fullname"
						required={true}
						type="text"
						value={data.name ?? ''}
						error={errData.name}
						onChange={onChange}
					/>
				</div>
				<div className="mb-5">
					<CustomInput
						name="email"
						label="Email"
						required={true}
						type="email"
						value={data.email ?? ''}
						error={errData.email}
						onChange={onChange}
					/>
				</div>
				<div className="mb-5">
					<CustomInput
						name="password"
						label="Password"
						required={true}
						type="password"
						value={data.password ?? ''}
						error={errData.password}
						onChange={onChange}
					/>
				</div>
				<div className="mb-5">
					<CustomInput
						name="confirmPassword"
						label="Confirm Password"
						required={true}
						type="password"
						value={data.confirmPassword ?? ''}
						error={errData.confirmPassword}
						onChange={onChange}
					/>
				</div>

				<div className="flex justify-between items-center">
					<p className="">Have account ? <a href="/auth/login" className=" text-secondary-50">Login</a></p>
					<button onClick={onSubmit} className=" btn btn-primary normal-case">Sign Up</button>
				</div>
			</div>
		</div>
	)
};

export default Register;