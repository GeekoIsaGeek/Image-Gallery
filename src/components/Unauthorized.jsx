import React from 'react';
import useAuthCtx from '../store/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const Unauthorized = () => {
	const { currentUser } = useAuthCtx();
	return currentUser ? <Navigate to='/gallery' replace /> : <Outlet />;
};

export default Unauthorized;
