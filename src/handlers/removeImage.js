import { deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { auth } from '../Firebase-config';
import { storage, db } from '../Firebase-config';

const removeImage = async (selectedImg, setSelectedImg, images, setImages) => {
	const currUser = auth.currentUser;
	const { id, fileName } = selectedImg;

	try {
		await deleteDoc(doc(db, `users/${currUser.uid}/images/${id}`));
		const imageRef = ref(
			storage,
			`users/${currUser.displayName}-${currUser.uid}/gallery/${fileName}`
		);
		await deleteObject(imageRef);
		setSelectedImg(null);
		const filteredImages = images.filter((image) => image.name !== fileName && image);
		setImages([...filteredImages]);
	} catch (err) {
		console.log(err.message);
	}
};

export default removeImage;
