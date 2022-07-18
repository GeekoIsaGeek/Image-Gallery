import React from 'react';
import useFirebaseCtx from '../store/FirebaseCtx';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
	const { user } = useFirebaseCtx();
	return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default Protected;
