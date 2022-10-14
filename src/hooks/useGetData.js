import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth } from '../Firebase-config';
import { db } from '../Firebase-config';

const useGetData = (images, setImages) => {
	const currUser = auth.currentUser;

	useEffect(() => {
		const getImages = async () => {
			const userImagesRef = await collection(db, `users/${currUser.displayName}-${currUser.uid}/images`);
			const docs = await getDocs(userImagesRef);
			const tempArr = [];

			docs.forEach((doc) => {
				tempArr.push({ url: doc.data().url, id: doc.id, name: doc.data().name });
			});
			setImages(tempArr);
		};
		getImages();
	}, [images, currUser.uid]);
};

export default useGetData;
