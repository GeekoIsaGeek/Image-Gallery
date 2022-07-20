import React, { useState, useEffect } from 'react';
import styles from '../../styles/Gallery.module.css';
import { BiImageAdd } from 'react-icons/bi';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, auth, db } from '../../Firebase-config';
import { AiOutlineFullscreenExit } from 'react-icons/ai';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Gallery = () => {
	const [images, setImages] = useState([]);
	const [selectedImg, setSelectedImg] = useState(null);

	const currUser = auth.currentUser;

	const handleSelect = async (e) => {
		const selectedImg = e.target.files[0];
		const imageRef = ref(
			storage,
			`users/${currUser.displayName}-${currUser.uid}/gallery/${selectedImg.name}`
		);
		await uploadBytes(imageRef, selectedImg);
		const url = await getDownloadURL(imageRef);
		setImages(images.concat(url));

		try {
			const imagesRef = await addDoc(collection(db, 'users', `${currUser.uid}`, 'images'), {
				url,
			});
			console.log(imagesRef);
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
				tempArr.push({ url: doc.data().url });
				console.log(tempArr);
			});
			setImages(tempArr);
		};
		getImages();
	}, []);

	return (
		<div className={styles.Wrapper}>
			<div className={styles.Upload}>
				<span>
					<BiImageAdd className={styles.addLogo} />
				</span>
				<input type='file' accept='.jpg,.jpeg,.png,.webp' onChange={handleSelect} />
			</div>
			<ul className={styles.Gallery}>
				{images.map((obj, i) => {
					return (
						<li key={i}>
							<img
								src={obj.url}
								alt='gallery-item'
								onClick={(e) => setSelectedImg(e.target.src)}
							/>
						</li>
					);
				})}
			</ul>
			<div className={selectedImg ? 'Overlay active' : 'Overlay'}>
				<AiOutlineFullscreenExit className={styles.Exit} onClick={() => setSelectedImg(null)} />
				<img src={selectedImg} alt='selected-img' />
			</div>
		</div>
	);
};

export default Gallery;
