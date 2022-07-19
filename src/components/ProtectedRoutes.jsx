import React from 'react';
import useAuthCtx from '../store/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
	const { currentUser } = useAuthCtx();
	return currentUser ? <Outlet /> : <Navigate to='/login' replace />;
};

export default Protected;
