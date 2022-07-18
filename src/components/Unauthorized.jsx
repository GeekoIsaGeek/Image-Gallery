import React from 'react';
import useFirebaseCtx from '../store/FirebaseCtx';
import { Navigate, Outlet } from 'react-router-dom';

const Unauthorized = () => {
	const { user } = useFirebaseCtx();
	return user ? <Navigate to='/profile' replace /> : <Outlet />;
};

export default Unauthorized;
