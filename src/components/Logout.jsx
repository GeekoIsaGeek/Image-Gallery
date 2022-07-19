import React from 'react';
import useAuthCtx from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
	const { logOut } = useAuthCtx();
	const navigate = useNavigate();
	const handleSignout = async () => {
		try {
			await logOut();
			navigate('/login');
		} catch (error) {
			console.log(error.message);
		}
	};
	return <li onClick={handleSignout}>Logout</li>;
};

export default Logout;
