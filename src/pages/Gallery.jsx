import React, { useState } from 'react';
import styles from '../styles/Gallery.module.css';
import { BiImageAdd } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';
import useGetData from '../hooks/useGetData';
import saveImageToDb from '../handlers/saveImageToDb';
import removeImage from '../handlers/removeImage';

const Gallery = () => {
	const [images, setImages] = useState([]);
	const [selectedImg, setSelectedImg] = useState(null);

	useGetData(images, setImages);

	return (
		<div className={styles.Wrapper}>
			<div className={styles.Upload}>
				<span>
					<BiImageAdd className={styles.addLogo} />
				</span>
				<input type='file' accept='.jpg,.jpeg,.png,.webp' onChange={(e) => saveImageToDb(e, images, setImages)} />
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
				<FaTrash
					className={styles.Remove}
					onClick={() => removeImage(selectedImg, setSelectedImg, images, setImages)}
				/>
				<img src={selectedImg && selectedImg.url} alt='selected-img' />
			</div>
		</div>
	);
};

export default Gallery;
