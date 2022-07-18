import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import useFirebaseCtx from '../store/FirebaseCtx';
import User from '../components/User';

const Header = () => {
	const location = useLocation();
	const pathname = location.pathname.slice(1, location.pathname.length);
	const user = useFirebaseCtx().user;
	return (
		<div className='App-header'>
			<h3>{pathname || 'Home'}</h3>
			{!user ? (
				<Link className='Login-btn' to='/login'>
					Login
				</Link>
			) : (
				<User />
			)}
		</div>
	);
};

export default Header;
