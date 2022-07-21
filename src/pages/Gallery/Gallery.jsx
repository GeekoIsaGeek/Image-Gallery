import React, { useState, useEffect } from 'react';
import styles from '../../styles/Gallery.module.css';
import { BiImageAdd } from 'react-icons/bi';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, auth, db } from '../../Firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import {FaTrash} from 'react-icons/fa'
import {MdExitToApp} from 'react-icons/md'

const Gallery = () => {
	const [images, setImages] = useState([]);
	const [selectedImgUrl, setselectedImgUrl] = useState(null);

	const currUser = auth.currentUser;

	const removeImage= ()=>{
		console.log(selectedImgUrl);
	    

	}

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
				tempArr.push({ url: doc.data().url });
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
				{images.map((obj, i) => {
					return (
						<li key={i}>
							<img
								src={obj.url}
								alt='gallery-item'
								onClick={(e) => setselectedImgUrl(e.target.src)}
							/>
						</li>
					);
				})}
			</ul>
			<div className={selectedImgUrl ? 'Overlay active' : 'Overlay'}>
				<MdExitToApp className={styles.Exit} onClick={() => setselectedImgUrl(null)} />
				{/* <FaTrash className={styles.Remove} onClick={removeImage}/> */}
				<img src={selectedImgUrl} alt='selected-img' />
			</div>
		</div>
	);
};

export default Gallery;
