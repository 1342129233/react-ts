import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd';
import css from "./index.module.css"

function Home() {
	const state = useSelector((state: any) => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({ type: 'TO_LOGIN', payload: { username: 123, password: 456 } })
	}, [])
	return (
		<div className="">
			你好！{ state.userName }
		</div>
	);
}

export default Home;
