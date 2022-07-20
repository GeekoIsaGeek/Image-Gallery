import React, { useState, useEffect } from 'react';
import styles from '../../styles/Gallery.module.css';
import { BiImageAdd } from 'react-icons/bi';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../../Firebase-config';
import { RiFullscreenExitFill } from 'react-icons/ri';

const Gallery = () => {
	const [images, setImages] = useState([]);
	const [selectedImg, setSelectedImg] = useState(null);

	const currUser = auth.currentUser;

	const handleSelect = async (e) => {
		const selectedImg = e.target.files[0];
		const imageRef = ref(
			storage,
			`users/${currUser.displayName}-${currUser.uid}/${selectedImg.name}`
		);
		await uploadBytes(imageRef, selectedImg);
		const url = await getDownloadURL(imageRef);
		setImages(images.concat(url));
	};
	useEffect(() => {
		const pathRef = (storage, `${currUser.displayName}-${currUser.uid}`);
	}, []);

	return (
		<div className={styles.Wrapper}>
			<div className={styles.Upload}>
				<span>
					<BiImageAdd className={styles.addLogo} /> Upload
				</span>
				<input type='file' accept='.jpg,.jpeg,.png,.webp' onChange={handleSelect} />
			</div>
			<ul className={styles.Gallery}>
				{images.map((url) => {
					return (
						<li>
							<img
								src={url}
								alt='gallery-item'
								onClick={(e) => setSelectedImg(e.target.src)}
							/>
						</li>
					);
				})}
			</ul>
			<div className={selectedImg ? 'Overlay active' : 'Overlay'}>
				<RiFullscreenExitFill className={styles.Exit} onClick={() => setSelectedImg(null)} />
				<img src={selectedImg} alt='selected-img' />
			</div>
		</div>
	);
};

export default Gallery;
