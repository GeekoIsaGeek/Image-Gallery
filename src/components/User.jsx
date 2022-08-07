import React, { useState } from 'react';
import Logout from './Logout';
import profilePic from '../images/User-Icon.jpg';
import styles from '../styles/User.module.css';
import { Link } from 'react-router-dom';
import useAuthCtx from '../store/AuthContext';

const User = () => {
	const [show, setShow] = useState(false);
	const { userName, avatarUrl } = useAuthCtx();

	return (
		<div className={styles.Wrapper}>
			<img
				src={avatarUrl || profilePic}
				className={styles.ProfilePic}
				alt='profile-pic'
				onMouseEnter={() => setShow(true)}
				onClick={() => setShow(!show)}
			></img>
			<div className={styles.User}>
				<h4 className={styles.Username}>{userName || 'user'}</h4>
				<ul className={!show ? 'Nav' : 'Nav active'} onMouseLeave={() => setShow(false)}>
					<li>
						<Link to='/gallery'>Gallery</Link>
					</li>
					<li>
						<Link to='/'>Feedback</Link>
					</li>
					<Logout />
				</ul>
			</div>
		</div>
	);
};

export default User;
