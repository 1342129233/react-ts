import React, { useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import Navigation from '@/view/other/navigation';
import Login from '@/view/other/login/index';
import { getCookie } from '@/common/utils';

function App() {
	const token = getCookie('loginToken');
	const navigate = useNavigate();

	useEffect(() => {
		if (!getCookie('loginToken')) {
		  	navigate("/login", { replace: true });
		}
	}, [token]);

	return (
		<div>
			{
				!token ? <Login /> : <Navigation />
			}
		</div>
	)
}

export default App;