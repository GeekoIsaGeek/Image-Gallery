import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import useFirebaseCtx from '../../store/FirebaseCtx';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const ctx = useFirebaseCtx();
	const { login, setUser } = ctx;
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await login(email, password);
			navigate('/gallery');
			setEmail('');
			setPassword('');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className={styles.Wrapper}>
			<form>
				<input
					type='email'
					placeholder='Email'
					className={styles.Email}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Password'
					className={styles.Password}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error !== null && <p style={{ color: 'rgb(100 91 91)' }}>{error}</p>}
				<div className={styles.Buttons}>
					<Link to='/registration' className={styles.Signup}>
						Create Account
					</Link>
					<button type='submit' className={styles.Login} onClick={handleSubmit}>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
