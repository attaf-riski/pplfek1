import React from "react";
import { Routes, Route } from "react-router-dom";

import { LandingPage, NotFoundPage } from "../pages";

import { Register, Login, Coba } from "../pages/auth";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={ <LandingPage/> } />
			<Route path="/auth/register" element={ <Register/> } />
			<Route path="/auth/login" element={<Login />} />
			<Route path="/auth/coba" element={<Coba />} />
			
			<Route path="/*" element={ <NotFoundPage/> } />
		</Routes>
	)
};

export default Router;