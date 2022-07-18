import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../Firebase-config';

const FirebaseCtx = createContext();

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
	const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
	const logOut = ()=> signOut(auth);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null)
			}
		});
		return ()=> unsubscribe();
	}, []);

	return (
		<FirebaseCtx.Provider value={{ signUp,login, logOut, user,setUser }}>
			{children}
		</FirebaseCtx.Provider>
	);
};

const useFirebaseCtx = () => {
	return useContext(FirebaseCtx);
};

export default useFirebaseCtx

