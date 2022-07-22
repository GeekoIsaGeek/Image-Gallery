import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { storage, db } from '../Firebase-config';
import { auth } from '../Firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const saveImageToDb = async (event, images, setImages) => {
	const currUser = auth.currentUser;
	const uploadedImg = event.target.files[0];
	const alreadyExists = uploadedImg && images.find((img) => img.name === uploadedImg.name);

	if (!alreadyExists) {
		const imageRef = ref(
			storage,
			`users/${currUser.displayName}-${currUser.uid}/gallery/${uploadedImg.name}`
		);
		await uploadBytes(imageRef, uploadedImg);
		const url = await getDownloadURL(imageRef);
		setImages([...images, { url, name: uploadedImg.name }]);

		try {
			await addDoc(
				collection(db, 'users', `${currUser.displayName}-${currUser.uid}`, 'images'),
				{
					url,
					name: uploadedImg.name,
				}
			);
		} catch (err) {
			console.log(err);
		}
	}
};

export default saveImageToDb;
