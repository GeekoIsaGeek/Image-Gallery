import React, { useState, useEffect } from 'react';
import styles from '../../styles/Gallery.module.css';
import { BiImageAdd } from 'react-icons/bi';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, auth, db } from '../../Firebase-config';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { FaTrash } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';

const Gallery = () => {
	const [images, setImages] = useState([]);
	const [selectedImg, setSelectedImg] = useState(null);

	const currUser = auth.currentUser;

	// const removeImage = async () => {
	// 	const uId = selectedImg.id;
	// 	console.log(uId);
	// 	const imageRef = ref(storage, `users/${currUser.displayName}-${currUser.uid}/gallery/${uId}`);

	// 	try {
	// 		await deleteDoc(doc(db, `users/${currUser.uid}/images/${uId}`));
	// 		setSelectedImg(null);
	// 		await deleteObject(imageRef);
	// 		const filteredImages = images.filter((image) => image.id !== uId);
	// 		setImages(filteredImages);
	// 	} catch (err) {
	// 		console.log(err.message);
	// 	}
	// };

	const handleSelect = async (e) => {
		const selectedImgUrl = e.target.files[0];
		const imageRef = ref(
			storage,
			`users/${currUser.displayName}-${currUser.uid}/gallery/${selectedImgUrl.name}`
		);
		await uploadBytes(imageRef, selectedImgUrl);
		const url = await getDownloadURL(imageRef);
		setImages(images.concat({ url }));

		try {
			await addDoc(collection(db, 'users', `${currUser.uid}`, 'images'), { url });
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		const getImages = async () => {
			const userImagesRef = await collection(db, `users/${currUser.uid}/images`);
			const docs = await getDocs(userImagesRef);
			const tempArr = [];

			docs.forEach((doc) => {
				tempArr.push({ url: doc.data().url, id: doc.id });
			});
			setImages(tempArr);
		};
		getImages();
	}, [currUser.uid]);

	return (
		<div className={styles.Wrapper}>
			<div className={styles.Upload}>
				<span>
					<BiImageAdd className={styles.addLogo} />
				</span>
				<input type='file' accept='.jpg,.jpeg,.png,.webp' onChange={handleSelect} />
			</div>
			<ul className={styles.Gallery}>
				{images &&
					images.map((obj, i) => {
						return (
							<li key={i}>
								<img
									src={obj.url}
									alt='gallery-item'
									onClick={(e) => setSelectedImg({ url: obj.url, id: obj.id })}
								/>
							</li>
						);
					})}
			</ul>
			<div className={selectedImg ? 'Overlay active' : 'Overlay'}>
				<MdExitToApp className={styles.Exit} onClick={() => setSelectedImg(null)} />
				{/* <FaTrash className={styles.Remove} onClick={removeImage} /> */}
				<img src={selectedImg && selectedImg.url} alt='selected-img' />
			</div>
		</div>
	);
};

export default Gallery;
