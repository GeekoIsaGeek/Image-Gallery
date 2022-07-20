import React, { useRef } from 'react';
import styles from '../../styles/Main.module.css';
import { Link } from 'react-router-dom';
import useAuthCtx from '../../store/AuthContext';
import emailjs from '@emailjs/browser';

const Main = () => {
	const { currentUser } = useAuthCtx();
	const textareaRef = useRef();

	const sendEmail = async (e) => {
		e.preventDefault();
		await emailjs.sendForm('service_32sterg', 'template_ufacz7h', e.target, 'k2HybejYeHJfMUwhu');
		e.target.reset();
	};

	if (currentUser) {
		return (
			<div className={styles.Wrapper}>
				<h1>Give me feedback 👻</h1>
				<form onSubmit={sendEmail}>
					<input
						type='text'
						name='user_name'
						defaultValue={currentUser.displayName}
						style={{ display: 'none' }}
					/>
					<input
						type='email'
						name='user_email'
						defaultValue={currentUser.email}
						style={{ display: 'none' }}
					/>
					<textarea name='message' ref={textareaRef} />
					<input type='submit' value='Send' />
				</form>
			</div>
		);
	} else
		return (
			<div className={styles.Wrapper}>
				<h1>Hey, I heard that you are looking for a platform to store your images</h1>
				<h1>
					and you know what? <span> I offer you my app for free</span>{' '}
				</h1>
				<h2>What are you waiting for? 🥱</h2>
				<Link to='/registration' className={styles.Signup}>
					Sign up
				</Link>
			</div>
		);
};

export default Main;
