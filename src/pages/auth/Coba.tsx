import React, { FC, useState } from "react";
import { CustomInput } from "../../components/input";
import "./Coba.css";

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
	<div className="container justify-content-center align-items-center">
        <div className="card card-compact w-96 bg-gray-200 shadow-xl mx-auto">
            <figure><img src="/images/logo.png" alt="Logo"  width="150" height="150" className="d-inline-block align-text-top me-0 mt-5"/></figure><br></br>
            <h4 className="font-bold text-center text-2xl text-menu-label mb-2 mt-2">Login</h4>
            <p className=" text-center font-normal mb-4">Sistem Akademik</p>
            <hr className="horizontal-line"/>
				<div className="mb-5 mr-4 ml-4 mt-8">
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
				<div className="mb-5 mr-4 ml-4">
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

				<div className="flex justify-content-center items-center mr-4 ml-4 mb-5">
					<button onClick={onSubmit} className=" btn btn-primary normal-case mx-auto w-full font-bold">LOGIN</button>
				</div>
        </div>
    </div>
	)
};

export default Register;