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

	const removeImage = async () => {
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

	const handleSelect = async (e) => {
		const uploadedImg = e.target.files[0];
		const alreadyExists = uploadedImg && images.find((img) => img.name === uploadedImg.name);

		if (!alreadyExists) {
			const imageRef = ref(
				storage,
				`users/${currUser.displayName}-${currUser.uid}/gallery/${uploadedImg.name}`
			);
			await uploadBytes(imageRef, uploadedImg);
			const url = await getDownloadURL(imageRef);
			setImages([...images, { url, name: uploadedImg.name }]);

			// adding image url and name to the firestore db
			try {
				await addDoc(collection(db, 'users', `${currUser.uid}`, 'images'), {
					url,
					name: uploadedImg.name,
				});
			} catch (err) {
				console.log(err);
			}
		}
	};
	useEffect(() => {
		const getImages = async () => {
			const userImagesRef = await collection(db, `users/${currUser.uid}/images`);
			const docs = await getDocs(userImagesRef);
			const tempArr = [];

			docs.forEach((doc) => {
				tempArr.push({ url: doc.data().url, id: doc.id, name: doc.data().name });
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
									onClick={(e) => {
										setSelectedImg({ url: obj.url, id: obj.id, fileName: obj.name });
									}}
								/>
							</li>
						);
					})}
			</ul>
			<div className={selectedImg ? 'Overlay active' : 'Overlay'}>
				<MdExitToApp className={styles.Exit} onClick={() => setSelectedImg(null)} />
				<FaTrash className={styles.Remove} onClick={removeImage} />
				<img src={selectedImg && selectedImg.url} alt='selected-img' />
			</div>
		</div>
	);
};

export default Gallery;
