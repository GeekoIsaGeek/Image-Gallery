import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Registration.module.css';
import useFirebaseCtx from '../../store/FirebaseCtx';

const Registration = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const ctx = useFirebaseCtx();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await ctx.signUp(email, password);
			setUsername('');
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
					type='text'
					placeholder='Username'
					className={styles.Username}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
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
				{error && <p style={{ color: 'rgb(100 91 91)' }}>{error}</p>}
				<div className={styles.Buttons}>
					<Link to='/login' className={styles.Login}>
						Login to account
					</Link>
					<button type='submit' className={styles.Signup} onClick={handleSubmit}>
						Sign up
					</button>
				</div>
			</form>
		</div>
	);
};

export default Registration;
