import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from 'firebase/auth';

import { auth, storage } from '../Firebase-config';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const AuthCtx = createContext();

export const AuthCtxProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [userName, setUsername] = useState(null);
	const [avatarUrl, setAvatarUrl] = useState(null);

	const signUp = async (email, password, username, avatar) => {
		await createUserWithEmailAndPassword(auth, email, password);
		setUsername(username);

		let url;
		if (avatar) {
			const imageRef = ref(storage, `users/${username}-${auth.currentUser.uid}/avatar`);
			await uploadBytes(imageRef, avatar);
			url = await getDownloadURL(imageRef);
			setAvatarUrl(url);
		} else url = null;

		await updateProfile(auth.currentUser, {
			displayName: username,
			photoURL: url,
		});
	};

	const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
	const logOut = () => signOut(auth);
	const updateUser = (obj) => updateProfile(auth.currentUser, obj);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentUser(user);
				setAvatarUrl(user.photoURL);
				setUsername(user.displayName);
			} else {
				setCurrentUser(null);
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthCtx.Provider
			value={{ signUp, login, logOut, currentUser, updateUser, userName, avatarUrl }}
		>
			{children}
		</AuthCtx.Provider>
	);
};

const useAuthCtx = () => {
	return useContext(AuthCtx);
};

export default useAuthCtx;
