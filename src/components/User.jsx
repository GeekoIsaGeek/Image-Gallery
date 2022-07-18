import React from 'react';
import useFirebaseCtx from '../store/FirebaseCtx';
import { useNavigate } from 'react-router-dom';

const User = () => {
	const { logOut, setUser } = useFirebaseCtx();
	const navigate = useNavigate();
	const handleSignout = async () => {
		try {
			await logOut();
			navigate('/login');
		} catch (error) {
			console.log(error.message);
		}
	};
	return <button onClick={handleSignout}>Sign Out</button>;
};

export default User;
