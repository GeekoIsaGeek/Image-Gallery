import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Registration.module.css';
import useAuthCtx from '../store/AuthContext';
import profilePic from '../images/User-Icon.jpg';

const Registration = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const { signUp } = useAuthCtx();
	const [image, setImage] = useState(null);
	const [avatar, setAvatar] = useState(null);

	const imgHandler = (e) => {
		const selectedImage = e.target.files[0];
		selectedImage && setAvatar(selectedImage);

		const reader = new FileReader();
		reader.onload = (e) => {
			setImage(e.target.result);
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signUp(email, password, username, avatar);
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
				<div className={styles.UploadImage}>
					<img src={image || profilePic} className={styles.ProfilePic} alt='profile pic'></img>
					<input type='file' accept='.png, .jpg,.jpeg' onChange={(e) => imgHandler(e)} />
				</div>
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
